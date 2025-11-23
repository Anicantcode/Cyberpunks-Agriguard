from transformers import pipeline
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Trying the 'linkanjarad' prefix which is common for this dataset/model
MODEL_ID = "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification"

try:
    logger.info(f"Attempting to load model: {MODEL_ID}")
    classifier = pipeline("image-classification", model=MODEL_ID)
    logger.info("SUCCESS: Model loaded.")
except Exception as e:
    logger.error(f"FAILURE: {e}")
