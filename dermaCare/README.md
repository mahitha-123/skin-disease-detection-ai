# Skin Disease Classification System

A full-stack deep learning project for classifying skin diseases from dermatology images.

## Overview
This project includes:
- **TensorFlow CNN model** for image classification
- **Flask REST API** for serving predictions
- **React.js frontend** for image upload and real-time results
- Training pipeline with augmentation, dropout, and batch normalization

## Supported Classes
The project is preconfigured for 7 skin disease classes:
1. Actinic keratoses
2. Basal cell carcinoma
3. Benign keratosis-like lesions
4. Dermatofibroma
5. Melanocytic nevi
6. Vascular lesions
7. Melanoma

> Note: This zip contains the **complete project source code**, but it does **not** include a real dermatology dataset or trained production weights. You must train the model on your dataset (for example, HAM10000 or your own labeled dermatology dataset) before deployment.

## Project Structure

```text
skin-disease-cnn-full-project/
│
├── backend/
│   ├── app.py
│   ├── train.py
│   ├── predict.py
│   ├── config.py
│   ├── requirements.txt
│   ├── utils/
│   │   ├── preprocessing.py
│   │   └── model_utils.py
│   └── models/
│       └── .gitkeep
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── .env.example
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── App.css
│       └── api.js
│
├── dataset_placeholder/
│   └── README.md
│
└── README.md
```

## Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows
pip install -r requirements.txt
```

## Dataset Format
Organize your dataset like this:

```text
data/
├── train/
│   ├── actinic_keratoses/
│   ├── basal_cell_carcinoma/
│   ├── benign_keratosis/
│   ├── dermatofibroma/
│   ├── melanocytic_nevi/
│   ├── vascular_lesions/
│   └── melanoma/
│
└── val/
    ├── actinic_keratoses/
    ├── basal_cell_carcinoma/
    ├── benign_keratosis/
    ├── dermatofibroma/
    ├── melanocytic_nevi/
    ├── vascular_lesions/
    └── melanoma/
```

## Train the Model

```bash
cd backend
python train.py
```

This will:
- Load images from `../data/train` and `../data/val`
- Apply augmentation
- Train a CNN model
- Save the best model to `backend/models/skin_disease_model.keras`

## Run Flask API

```bash
cd backend
python app.py
```

Default API URL:
- `http://127.0.0.1:5000`

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Default frontend URL:
- `http://localhost:5173`

## API Endpoints

### Health Check
```http
GET /health
```

### Predict
```http
POST /predict
Content-Type: multipart/form-data
Body: image=<file>
```

### Sample Response
```json
{
  "predicted_class": "melanoma",
  "confidence": 0.9412,
  "all_probabilities": {
    "actinic_keratoses": 0.0102,
    "basal_cell_carcinoma": 0.0091,
    "benign_keratosis": 0.0083,
    "dermatofibroma": 0.0042,
    "melanocytic_nevi": 0.0110,
    "vascular_lesions": 0.0160,
    "melanoma": 0.9412
  }
}
```

## Tech Stack
- Python
- TensorFlow / Keras
- CNN
- Flask
- Flask-CORS
- React.js
- Axios
- Vite

## Important Note
This project is for **educational and portfolio purposes** only and should **not** be used as a medical diagnosis tool.
