import os
from flask import Flask, request, jsonify
from flask_cors import CORS

from config import ALLOWED_EXTENSIONS, UPLOAD_FOLDER
from predict import predict_image
from auth import auth_bp
from database import init_db

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp, url_prefix="/auth")

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
init_db()


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/")
def home():
    return jsonify({"message": "Derma Care backend is running."})


@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file part in request."}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file."}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type. Please upload png, jpg, or jpeg."}), 400

    try:
        result = predict_image(file)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)