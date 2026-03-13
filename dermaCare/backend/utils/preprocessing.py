from PIL import Image
import numpy as np
from config import IMAGE_SIZE


def preprocess_image(file_stream):
    """Load uploaded image, resize, normalize, and add batch dimension."""
    image = Image.open(file_stream).convert("RGB")
    image = image.resize(IMAGE_SIZE)
    image_array = np.array(image, dtype=np.float32) / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    return image_array
