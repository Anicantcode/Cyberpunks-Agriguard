import hashlib
from typing import Dict

def calculate_sha256(file_content: bytes) -> str:
    """Calculates the SHA256 hash of the file content."""
    sha256_hash = hashlib.sha256()
    sha256_hash.update(file_content)
    return sha256_hash.hexdigest()

# Mapping of model labels to agricultural recommendations
# Based on the 38 classes of PlantVillage
RECOMMENDATIONS: Dict[str, str] =  {
    "Apple___Apple_scab":
        "Remove and destroy fallen leaves regularly to reduce fungus survival. "
        "Prune branches to increase sunlight and dry the canopy faster. "
        "Water at the base instead of overhead to keep foliage dry.",

    "Apple___Black_rot":
        "Collect and dispose of dried fruits and dead twigs around the tree. "
        "Trim infected areas during the dormant season. "
        "Maintain wide spacing between trees to improve airflow.",

    "Apple___Cedar_apple_rust":
        "Avoid planting apple trees near cedar or juniper trees, which act as fungal hosts. "
        "Remove visible galls from nearby cedars if possible. "
        "Improve sunlight exposure to reduce humidity within the canopy.",

    "Apple___healthy":
        "Your apple tree looks healthy! Maintain deep watering during dry spells and apply mulch around the base "
        "to conserve moisture. Follow a yearly pruning routine to maintain good airflow and structure.",

    "Blueberry___healthy":
        "Blueberry plants look healthy. Keep the soil slightly acidic and consistently moist but not waterlogged. "
        "Mulch using pine needles or sawdust to retain moisture and suppress weeds.",

    "Cherry_(including_sour)___Powdery_mildew":
        "Prune branches to allow sunlight deep into the canopy and reduce shading. "
        "Avoid overhead irrigation that wets foliage. "
        "Ensure trees are spaced adequately to prevent moisture buildup between them.",

    "Cherry_(including_sour)___healthy":
        "Cherry tree is healthy. Provide consistent watering, especially during flowering and fruiting. "
        "Prune to prevent overcrowding in the canopy and remove any weak or crossing branches.",

    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot":
        "Rotate crops each year and avoid planting corn repeatedly in the same field. "
        "Remove or incorporate previous crop residue after harvest to reduce fungus survival. "
        "Increase row spacing or use narrow rows with good airflow to help leaves dry faster.",

    "Corn_(maize)___Common_rust_":
        "Choose rust-tolerant or resistant corn varieties when available. "
        "Consider early sowing so plants avoid the peak infection period. "
        "Avoid overly dense planting to improve air circulation in the crop canopy.",

    "Corn_(maize)___Northern_Leaf_Blight":
        "Rotate with non-corn crops to break the disease cycle. "
        "Bury or compost corn debris after harvest instead of leaving it on the surface. "
        "Ensure planting density allows good airflow and faster drying of leaves.",

    "Corn_(maize)___healthy":
        "Corn appears healthy. Maintain balanced nutrients, especially nitrogen, using compost or organic manure. "
        "Keep fields weed-free so corn plants get maximum light, water, and nutrients.",

    "Grape___Black_rot":
        "Remove old, shriveled berries from vines and the ground during and after the season. "
        "Prune vines to open the canopy and allow sunlight to reach inner leaves and fruit. "
        "Train vines properly on trellises to improve ventilation.",

    "Grape___Esca_(Black_Measles)":
        "Mark vines that show symptoms and prune them last to avoid spreading the issue. "
        "Sterilize pruning tools between cuts or between vines. "
        "Avoid excessive wounding of trunks and large branches during vineyard operations.",

    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)":
        "Remove affected leaves and shoots from the vineyard and dispose of them away from plants. "
        "Open the canopy by selective leaf removal around bunches to reduce humidity. "
        "Avoid overhead irrigation that keeps foliage wet for long periods.",

    "Grape___healthy":
        "Grapevine looks healthy. Maintain a regular pruning schedule to balance growth and fruit load. "
        "Train vines correctly on supports so that light reaches the canopy evenly.",

    "Orange___Haunglongbing_(Citrus_greening)":
        "Remove and dispose of severely affected trees to reduce the risk to surrounding citrus trees. "
        "Keep the orchard weed-free and monitor for insect vectors using traps and visual checks. "
        "Avoid moving plant material from unknown or infested areas into the orchard.",

    "Peach___Bacterial_spot":
        "Avoid planting peaches in low-lying or poorly ventilated areas where humidity is high. "
        "Maintain tree vigor with proper irrigation, mulching, and balanced nutrition. "
        "Remove heavily damaged twigs and leaves during pruning.",

    "Peach___healthy":
        "Peach tree is healthy. Thin fruits when they are small to improve fruit size and quality. "
        "Maintain an open-center canopy structure to let sunlight reach all parts of the tree.",

    "Pepper,_bell___Bacterial_spot":
        "Use seeds or seedlings from reliable, disease-free sources. "
        "Avoid field work like pruning or staking when plants are wet. "
        "Rotate peppers with non-solanaceous crops every 2–3 years.",

    "Pepper,_bell___healthy":
        "Bell pepper plants are healthy. Stake or cage them so fruits stay off the soil surface. "
        "Water consistently at the base of the plant and keep the area free of competing weeds.",

    "Potato___Early_blight":
        "Apply mulch around plants to reduce soil splash onto lower leaves. "
        "Avoid planting potatoes in the same field too often; rotate with cereals or legumes. "
        "Remove older leaves that are close to or touching the soil when possible.",

    "Potato___Late_blight":
        "Remove and destroy seriously affected plants promptly to protect nearby plants. "
        "Ensure plants are spaced to allow air movement and quicker drying after rain or irrigation. "
        "Avoid watering late in the day so foliage does not stay wet overnight.",

    "Potato___healthy":
        "Potato plants look healthy. Hill soil up around stems to protect tubers from sunlight and greening. "
        "Irrigate regularly but avoid waterlogging to support uniform tuber development.",

    "Raspberry___healthy":
        "Raspberry bush is healthy. After fruiting, remove old canes to encourage new, productive canes. "
        "Maintain proper spacing between rows and canes to ensure airflow and easier harvesting.",

    "Soybean___healthy":
        "Soybean plants are healthy. Follow a crop rotation plan that includes non-legume crops. "
        "Maintain adequate soil potassium and phosphorus levels for strong root and pod development.",

    "Squash___Powdery_mildew":
        "Grow squash where it receives full sunlight for most of the day. "
        "Avoid overcrowding by giving each plant enough space for leaves to dry quickly. "
        "Carefully remove heavily infected leaves and discard them away from the field.",

    "Strawberry___Leaf_scorch":
        "Remove dry, scorched leaves and dispose of them away from the bed. "
        "Space plants properly so air can move among them and dry leaves quickly. "
        "Water at soil level early in the morning instead of wetting the foliage.",

    "Strawberry___healthy":
        "Strawberry plants appear healthy. Renovate beds after harvesting by removing old leaves and thinning plants. "
        "Apply straw or organic mulch to conserve moisture and reduce weed growth.",

    "Tomato___Bacterial_spot":
        "Use drip or furrow irrigation to keep leaves as dry as possible. "
        "Rotate tomatoes with non-solanaceous crops and avoid planting them repeatedly in the same soil. "
        "Remove plant debris at the end of the season and avoid handling plants when they are wet.",

    "Tomato___Early_blight":
        "Prune or remove lower leaves that touch the soil, especially as the plant grows taller. "
        "Mulch around the base to minimize soil splashing onto foliage. "
        "Support plants using stakes or cages to keep foliage and fruit off the ground.",

    "Tomato___Late_blight":
        "Promptly remove and dispose of severely affected plants away from the field. "
        "Space plants to improve airflow and reduce humidity around the foliage. "
        "Avoid late-evening overhead irrigation so leaves do not remain wet overnight.",

    "Tomato___Leaf_Mold":
        "Increase spacing between plants and improve ventilation, especially in protected structures like greenhouses. "
        "Water the soil directly rather than spraying water onto leaves. "
        "Remove and destroy leaves that show strong symptoms.",

    "Tomato___Septoria_leaf_spot":
        "Remove older, lower leaves once fruit begins to set to improve air movement. "
        "Use mulch to prevent water from splashing soil onto the leaves. "
        "Rotate tomatoes to a different area of the field each season.",

    "Tomato___Spider_mites_Two-spotted_spider_mite":
        "Occasionally spray plants with a strong stream of water to dislodge mites from the underside of leaves. "
        "Encourage natural predators such as ladybird beetles and predatory mites if available. "
        "Avoid creating very dusty conditions around the plants.",

    "Tomato___Target_Spot":
        "Remove and dispose of leaves and stems showing strong spotting to reduce spread. "
        "Ensure good spacing between plants to reduce humidity and leaf wetness duration. "
        "Irrigate at the base rather than overhead whenever possible.",

    "Tomato___Tomato_Yellow_Leaf_Curl_Virus":
        "Remove and discard infected plants as early as possible to reduce virus spread. "
        "Use reflective or light-colored mulches to discourage whiteflies from landing on plants. "
        "Avoid planting tomatoes immediately next to fields already known to have heavy whitefly presence.",

    "Tomato___Tomato_mosaic_virus":
        "Wash hands and tools thoroughly with soap before handling healthy plants, especially after touching infected ones. "
        "Remove infected plants and dispose of them away from growing areas. "
        "Avoid using tobacco products near plants, as the virus can be carried that way.",

    "Tomato___healthy":
        "Tomato plants are healthy! Maintain consistent watering to avoid stress, and try not to let the soil dry out completely between waterings. "
        "Regularly prune excess foliage to maintain good airflow and support steady fruit production."
}

def get_recommendation(label: str) -> str:
    """Returns a recommendation based on the disease label."""
    return RECOMMENDATIONS.get(label, "No specific recommendation available. Consult an agricultural expert.")
