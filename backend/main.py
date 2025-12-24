from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import io
import logging
import torch
import torch.nn as nn
from torchvision import models, transforms
import numpy as np
import cv2
import base64

torch.set_num_threads(1)
torch.set_num_interop_threads(1)
try:
    from .utils import calculate_sha256, get_recommendation
except ImportError:
    try:
        from utils import calculate_sha256, get_recommendation
    except ImportError:
        from backend.utils import calculate_sha256, get_recommendation

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Agriguard API", description="Plant Disease Detection API")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for MVP
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import os

# =============================================================
# MODEL SETUP (EfficientNetV2-S)
# =============================================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "plant_disease_model.pth")
CLASS_NAMES = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy',
    'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
    'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy',
    'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy',
    'Raspberry___healthy',
    'Soybean___healthy',
    'Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch', 'Strawberry___healthy',
    'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites_Two-spotted_spider_mite', 'Tomato___Target_Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
]

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
logger.info(f"Using device: {device}")

try:
    logger.info(f"Loading model from {MODEL_PATH}...")
    
    # Instantiate Architecture
    model = models.efficientnet_v2_s(weights=None)
    # Adjust Classifier Head
    model.classifier[1] = nn.Linear(model.classifier[1].in_features, len(CLASS_NAMES))
    
    # Load Weights
    model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
    model.to(device)
    model.eval()
    
    logger.info("✅ Custom Model loaded successfully.")
except Exception as e:
    logger.error(f"❌ Failed to load model: {e}")
    with open("backend_error.log", "w") as f:
        f.write(str(e))
    model = None

# Preprocessing Transform
transform = transforms.Compose([
    transforms.Resize((160, 160)),
    transforms.ToTensor()
])

# Grad-CAM Implementation
class GradCAM:
    def __init__(self, model, target_layer):
        self.model = model
        self.target_layer = target_layer
        self.gradients = None
        self.activations = None
        
        self.target_layer.register_forward_hook(self.save_activation)
        self.target_layer.register_full_backward_hook(self.save_gradient)

    def save_activation(self, module, input, output):
        self.activations = output

    def save_gradient(self, module, grad_input, grad_output):
        self.gradients = grad_output[0]

    def generate_heatmap(self, input_tensor, class_idx):
        # Zero grads
        self.model.zero_grad()
        
        # Forward pass
        output = self.model(input_tensor)
        
        # Backward pass
        target = output[0][class_idx]
        target.backward()
        
        # Pool gradients
        pooled_gradients = torch.mean(self.gradients, dim=[0, 2, 3])
        
        # Weight activations
        activations = self.activations.detach().cpu().numpy()[0]
        for i in range(activations.shape[0]):
            activations[i, :, :] *= pooled_gradients[i].item()
            
        # Average heatmap
        heatmap = np.mean(activations, axis=0)
        heatmap = np.maximum(heatmap, 0) # ReLU
        
        # Normalize
        if np.max(heatmap) != 0:
            heatmap /= np.max(heatmap)
            
        return heatmap

def segment_leaf(image_np):
    """
    Segments the leaf from the background using HSV color space.
    Returns a binary mask (0 or 1) where 1 is the leaf.
    """
    # Convert to HSV
    hsv = cv2.cvtColor(image_np, cv2.COLOR_RGB2HSV)
    
    # Define range for greens (healthy)
    lower_green = np.array([25, 40, 40])
    upper_green = np.array([90, 255, 255])
    mask_green = cv2.inRange(hsv, lower_green, upper_green)
    
    # Define range for browns/yellows (diseased)
    lower_brown = np.array([10, 40, 40])
    upper_brown = np.array([25, 255, 255])
    mask_brown = cv2.inRange(hsv, lower_brown, upper_brown)
    
    # Combine masks
    mask = cv2.bitwise_or(mask_green, mask_brown)
    
    # Morphological operations to close holes and remove noise
    kernel = np.ones((5,5), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
    
    # Normalize to 0-1
    return mask // 255

def calculate_severity(heatmap, leaf_mask, threshold=0.5):
    """
    Estimate severity based on the percentage of the LEAF area 
    that has activation above the threshold.
    """
    # Resize leaf mask to match heatmap if needed (though heatmap is usually resized to img)
    if leaf_mask.shape != heatmap.shape:
        leaf_mask = cv2.resize(leaf_mask, (heatmap.shape[1], heatmap.shape[0]), interpolation=cv2.INTER_NEAREST)
    
    # Binarize heatmap
    disease_mask = (heatmap > threshold).astype(np.float32)
    
    # Intersect disease with leaf (ignore background activations)
    valid_disease = disease_mask * leaf_mask
    
    leaf_area = np.sum(leaf_mask)
    disease_area = np.sum(valid_disease)
    
    if leaf_area == 0:
        return 0.0
        
    severity_score = disease_area / leaf_area
    return float(min(severity_score, 1.0)) # Cap at 100%

def overlay_heatmap(image_bytes, heatmap, leaf_mask=None):
    # Convert bytes to numpy array
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # Resize heatmap to image size
    heatmap = cv2.resize(heatmap, (img.shape[1], img.shape[0]))
    
    # Convert to RGB heatmap
    heatmap = np.uint8(255 * heatmap)
    heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
    
    # Apply leaf mask to heatmap if provided (optional, makes it look cleaner)
    if leaf_mask is not None:
        leaf_mask_resized = cv2.resize(leaf_mask, (img.shape[1], img.shape[0]), interpolation=cv2.INTER_NEAREST)
        # Expand dims for broadcasting
        leaf_mask_3ch = np.stack([leaf_mask_resized]*3, axis=-1)
        heatmap = heatmap * leaf_mask_3ch
    
    # Overlay
    superimposed_img = heatmap * 0.4 + img
    superimposed_img = np.clip(superimposed_img, 0, 255).astype(np.uint8)
    
    # Encode back to base64
    _, buffer = cv2.imencode('.jpg', superimposed_img)
    img_str = base64.b64encode(buffer).decode('utf-8')
    return img_str


class PredictionResult(BaseModel):
    filename: str
    integrity_hash: str
    prediction: str
    confidence: float
    recommendation: str
    heatmap_b64: str = None
    severity: float = None


@app.get("/")
async def root():
    return {"message": "Agriguard API is running (Custom Model)"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model_loaded": model is not None, "device": str(device)}

@app.post("/predict", response_model=PredictionResult)
async def predict(file: UploadFile = File(...)):
    if not model:
        raise HTTPException(status_code=503, detail="Model not loaded")

    try:
        # Read file content
        contents = await file.read()
        
        # 1. Integrity Check
        file_hash = calculate_sha256(contents)
        logger.info(f"File hash: {file_hash}")

        # 2. Load & Preprocess Image
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        # Keep original numpy for segmentation
        image_np = np.array(image)
        
        input_tensor = transform(image).unsqueeze(0).to(device) # Add batch dimension

        # 3. Inference
        with torch.no_grad():
            outputs = model(input_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            top_prob, top_idx = probabilities.max(1)
            
            score = top_prob.item()
            label_idx = top_idx.item()
            label = CLASS_NAMES[label_idx]

        # 4. Grad-CAM & Severity
        heatmap_b64 = None
        severity = 0.0
        
        try:
            # Initialize GradCAM with the last feature layer
            # EfficientNetV2-S features are in model.features
            target_layer = model.features[-1] 
            grad_cam = GradCAM(model, target_layer)
            
            # Generate Heatmap
            heatmap = grad_cam.generate_heatmap(input_tensor, label_idx)
            
            # Segment Leaf
            leaf_mask = segment_leaf(image_np)
            
            # Calculate Severity (Relative to Leaf Area)
            severity = calculate_severity(heatmap, leaf_mask)
            
            # Create Overlay
            heatmap_b64 = overlay_heatmap(contents, heatmap, leaf_mask)
            
        except Exception as e:
            logger.error(f"Grad-CAM/Severity failed: {e}")
            # Don't fail the whole request if XAI fails

        # 5. Recommendation
        recommendation = get_recommendation(label)

        return PredictionResult(
            filename=file.filename,
            integrity_hash=file_hash,
            prediction=label,
            confidence=score,
            recommendation=recommendation,
            heatmap_b64=heatmap_b64,
            severity=severity
        )


    except Exception as e:
        logger.error(f"Error processing image: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    # Trigger reload
