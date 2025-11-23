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
    "Apple___Apple_scab": "Rake and destroy fallen leaves to reduce overwintering spores. Prune trees to open the canopy and improve air circulation.",
    "Apple___Black_rot": "Remove and destroy mummified fruit and dead wood from the tree and ground. Prune out infected cankers.",
    "Apple___Cedar_apple_rust": "Remove nearby eastern red cedar or juniper trees if possible, as they host the fungus. Prune out galls from cedars.",
    "Apple___healthy": "Your apple tree looks healthy! Maintain a regular watering schedule and mulch around the base to retain moisture.",
    "Blueberry___healthy": "Blueberry plant is healthy. Ensure soil is acidic (pH 4.5-5.5) and well-drained. Mulch with pine needles.",
    "Cherry_(including_sour)___Powdery_mildew": "Prune to improve sunlight penetration and air flow. Avoid overhead watering to keep foliage dry.",
    "Cherry_(including_sour)___healthy": "Cherry tree is healthy. Monitor for pests and ensure adequate water during dry spells.",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": "Rotate crops annually. Plow under crop residue after harvest to reduce fungus survival.",
    "Corn_(maize)___Common_rust_": "Plant resistant varieties. Early planting can help avoid the worst infection periods.",
    "Corn_(maize)___Northern_Leaf_Blight": "Rotate with non-host crops. Manage crop residue by tillage to reduce initial inoculum.",
    "Corn_(maize)___healthy": "Corn is healthy. Ensure consistent nitrogen fertilization and weed control.",
    "Grape___Black_rot": "Remove all mummified berries from the vine and ground during dormant pruning. Ensure good air circulation.",
    "Grape___Esca_(Black_Measles)": "Mark infected vines and prune them last to avoid spreading disease. Sterilize pruning shears between cuts.",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "Manage canopy to reduce humidity. Remove and burn infected leaves and shoots.",
    "Grape___healthy": "Grapevine is healthy. Maintain a balanced pruning schedule to ensure light penetration.",
    "Orange___Haunglongbing_(Citrus_greening)": "Remove and destroy infected trees immediately to prevent spread. Control psyllid vectors using biological controls if possible.",
    "Peach___Bacterial_spot": "Avoid planting in low-lying areas with poor air circulation. Maintain plant vigor with proper fertilization.",
    "Peach___healthy": "Peach tree is healthy. Thin fruit to ensure good size and quality.",
    "Pepper,_bell___Bacterial_spot": "Use disease-free seeds. Rotate crops every 2-3 years. Avoid working in the field when plants are wet.",
    "Pepper,_bell___healthy": "Bell pepper is healthy. Stake plants to keep fruit off the ground and prevent rot.",
    "Potato___Early_blight": "Rotate crops with non-solanaceous plants. Mulch to prevent soil splash onto lower leaves.",
    "Potato___Late_blight": "Destroy all infected tubers and plants immediately. Avoid overhead irrigation. Plant certified disease-free seed potatoes.",
    "Potato___healthy": "Potato plant is healthy. Hill soil around the base to protect tubers from sunlight.",
    "Raspberry___healthy": "Raspberry bush is healthy. Prune out old canes after fruiting to encourage new growth.",
    "Soybean___healthy": "Soybean plant is healthy. Practice crop rotation and ensure adequate soil potassium levels.",
    "Squash___Powdery_mildew": "Plant in full sun. Space plants to ensure good air circulation. Remove infected leaves carefully.",
    "Strawberry___Leaf_scorch": "Remove and destroy infected leaves. Improve air circulation by spacing plants properly.",
    "Strawberry___healthy": "Strawberry plant is healthy. Renovate beds after harvest to maintain vigor.",
    "Tomato___Bacterial_spot": "Use drip irrigation to keep foliage dry. Rotate crops. Remove and destroy infected plant debris.",
    "Tomato___Early_blight": "Stake or cage plants to keep leaves off the ground. Mulch to prevent soil splash. Remove lower infected leaves.",
    "Tomato___Late_blight": "Remove and destroy infected plants immediately (do not compost). improving air circulation can help reduce spread.",
    "Tomato___Leaf_Mold": "Increase spacing between plants. Improve ventilation if growing in a greenhouse or tunnel.",
    "Tomato___Septoria_leaf_spot": "Remove lower leaves as fruit sets to improve air flow. Mulch to prevent soil splash. Rotate crops.",
    "Tomato___Spider_mites_Two-spotted_spider_mite": "Spray plants with a strong stream of water to dislodge mites. Introduce predatory mites as biological control.",
    "Tomato___Target_Spot": "Remove and destroy infected plant parts. Improve air circulation within the canopy.",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "Use reflective mulches to repel whiteflies. Remove and destroy infected plants immediately.",
    "Tomato___Tomato_mosaic_virus": "Wash hands and tools thoroughly with milk or soap before handling plants. Remove infected plants.",
    "Tomato___healthy": "Tomato plant is healthy. Consistent watering prevents blossom end rot."
}

def get_recommendation(label: str) -> str:
    """Returns a recommendation based on the disease label."""
    return RECOMMENDATIONS.get(label, "No specific recommendation available. Consult an agricultural expert.")
