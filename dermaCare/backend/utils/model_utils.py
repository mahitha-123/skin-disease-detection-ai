import os
import tensorflow as tf


def load_trained_model(model_path):
    if not os.path.exists(model_path):
        raise FileNotFoundError(
            f"Model not found at {model_path}. Train the model first using train.py"
        )

    return tf.keras.models.load_model(model_path)