import sys
import os

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from backend.main import app, model, device
    print("Backend imported successfully.")
    if model is not None:
        print(f"Model loaded on {device}")
    else:
        print("Model failed to load.")
        sys.exit(1)
except Exception as e:
    print(f"Failed to import backend: {e}")
    sys.exit(1)
