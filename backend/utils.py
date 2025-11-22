import hashlib
from typing import Dict

def calculate_sha256(file_content: bytes) -> str:
    """Calculates the SHA256 hash of the file content."""
    sha256_hash = hashlib.sha256()
    sha256_hash.update(file_content)
    return sha256_hash.hexdigest()

# Mapping of model labels to agricultural recommendations
# Based on the 38 classes of PlantVillage
RECOMMENDATIONS: Dict[str, str] = {
    "Apple___Apple_scab": "Prune infected branches. Apply fungicides like Captan or Myclobutanil.",
    "Apple___Black_rot": "Remove mummified fruit and dead wood. Use fungicides early in the season.",
    "Apple___Cedar_apple_rust": "Remove nearby juniper/cedar trees. Apply fungicides like Mancozeb.",
    "Apple___healthy": "Your apple tree looks healthy! Maintain regular watering and fertilization.",
    "Blueberry___healthy": "Blueberry plant is healthy. Ensure acidic soil (pH 4.5-5.5).",
    "Cherry_(including_sour)___Powdery_mildew": "Prune for air circulation. Apply sulfur or potassium bicarbonate.",
    "Cherry_(including_sour)___healthy": "Cherry tree is healthy. Watch for pests like aphids.",
    "Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot": "Use resistant hybrids. Rotate crops. Apply fungicides if severe.",
    "Corn_(maize)___Common_rust_": "Plant resistant varieties. Fungicides are rarely needed unless severe.",
    "Corn_(maize)___Northern_Leaf_Blight": "Use resistant hybrids. Manage residue. Apply fungicides if needed.",
    "Corn_(maize)___healthy": "Corn is healthy. Monitor for pests like corn borer.",
    "Grape___Black_rot": "Remove mummified berries. Apply fungicides from bud break to fruit set.",
    "Grape___Esca_(Black_Measles)": "Prune out infected wood. No effective chemical cure; prevention is key.",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "Apply fungicides. Improve air circulation.",
    "Grape___healthy": "Grapevine is healthy. Maintain proper pruning.",
    "Orange___Haunglongbing_(Citrus_greening)": "Remove infected trees immediately. Control psyllid vectors. No cure.",
    "Peach___Bacterial_spot": "Plant resistant varieties. Use copper sprays early in the season.",
    "Peach___healthy": "Peach tree is healthy. Watch for borers.",
    "Pepper,_bell___Bacterial_spot": "Use copper sprays. Remove infected plants. Rotate crops.",
    "Pepper,_bell___healthy": "Bell pepper is healthy. Water consistently.",
    "Potato___Early_blight": "Apply fungicides like Chlorothalonil. Rotate crops.",
    "Potato___Late_blight": "Destroy infected plants. Apply fungicides. Avoid overhead irrigation.",
    "Potato___healthy": "Potato plant is healthy. Hill soil around base.",
    "Raspberry___healthy": "Raspberry bush is healthy. Prune old canes.",
    "Soybean___healthy": "Soybean plant is healthy. Monitor for aphids.",
    "Squash___Powdery_mildew": "Apply neem oil or sulfur. Improve air circulation.",
    "Strawberry___Leaf_scorch": "Remove infected leaves. Apply fungicides if severe.",
    "Strawberry___healthy": "Strawberry plant is healthy. Mulch to keep fruit off soil.",
    "Tomato___Bacterial_spot": "Use copper sprays. Avoid overhead watering. Remove infected plants.",
    "Tomato___Early_blight": "Mulch soil. Apply fungicides. Remove lower leaves.",
    "Tomato___Late_blight": "Remove infected plants immediately. Apply fungicides preventatively.",
    "Tomato___Leaf_Mold": "Improve ventilation (greenhouse). Apply fungicides.",
    "Tomato___Septoria_leaf_spot": "Remove lower leaves. Apply fungicides. Rotate crops.",
    "Tomato___Spider_mites_Two-spotted_spider_mite": "Use insecticidal soap or neem oil. Increase humidity.",
    "Tomato___Target_Spot": "Apply fungicides. Improve air circulation.",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "Control whiteflies. Remove infected plants. Use resistant varieties.",
    "Tomato___Tomato_mosaic_virus": "Remove infected plants. Wash hands/tools (tobacco users). No cure.",
    "Tomato___healthy": "Tomato plant is healthy. Stake or cage for support."
}

def get_recommendation(label: str) -> str:
    """Returns a recommendation based on the disease label."""
    return RECOMMENDATIONS.get(label, "No specific recommendation available. Consult an agricultural expert.")
