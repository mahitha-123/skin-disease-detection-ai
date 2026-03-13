import numpy as np
from config import MODEL_PATH, CLASS_NAMES
from utils.model_utils import load_trained_model
from utils.preprocessing import preprocess_image

model = load_trained_model(MODEL_PATH)

def predict_image(file_stream):
    image_array = preprocess_image(file_stream)
    probabilities = model.predict(image_array, verbose=0)[0]
    predicted_index = int(np.argmax(probabilities))

    result = {
        "predicted_class": CLASS_NAMES[predicted_index],
        "confidence": float(probabilities[predicted_index]),
        "all_probabilities": {
            CLASS_NAMES[i]: float(probabilities[i]) for i in range(len(CLASS_NAMES))
        },
    }
    return result