import torch
from torchvision import models

model = models.efficientnet_v2_s()
print(model.features)
print("-" * 20)
print(model.features[-1])
