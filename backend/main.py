from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import io
import logging
import torch
import torch.nn as nn
from torchvision import models, transforms

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

class PredictionResult(BaseModel):
    filename: str
    integrity_hash: str
    prediction: str
    confidence: float
    recommendation: str

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
        input_tensor = transform(image).unsqueeze(0).to(device) # Add batch dimension

        # 3. Inference
        with torch.no_grad():
            outputs = model(input_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            top_prob, top_idx = probabilities.max(1)
            
            score = top_prob.item()
            label_idx = top_idx.item()
            label = CLASS_NAMES[label_idx]

        # 4. Recommendation
        recommendation = get_recommendation(label)

        return PredictionResult(
            filename=file.filename,
            integrity_hash=file_hash,
            prediction=label,
            confidence=score,
            recommendation=recommendation
        )

    except Exception as e:
        logger.error(f"Error processing image: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    # Trigger reload
