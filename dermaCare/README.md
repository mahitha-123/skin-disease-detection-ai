# Skin Disease Classification System

A full-stack deep learning web application for classifying skin diseases from dermatology images using a TensorFlow CNN model, a Flask REST API, and a React frontend.

---

# Overview

This project includes:

• TensorFlow/Keras CNN model for skin disease image classification  
• Flask REST API for serving predictions  
• React.js frontend for image upload and real-time prediction results  
• Training pipeline with augmentation, dropout, and batch normalization  

---

# Supported Classes

This project is configured for 7 skin disease classes:

1. Actinic keratoses  
2. Basal cell carcinoma  
3. Benign keratosis-like lesions  
4. Dermatofibroma  
5. Melanocytic nevi  
6. Vascular lesions  
7. Melanoma  

⚠️ Note: This repository contains the project source code but **does not include a dermatology dataset or trained model weights**.  
You must train the model using a dataset such as **HAM10000**.

---

# Project Structure

```bash
skin-disease-cnn-full-project/

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

---

# Backend Setup

Go to backend folder:

```bash
cd backend
```

Create virtual environment:

### Windows
```bash
python -m venv venv
venv\Scripts\activate
```

### Mac / Linux
```bash
python -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

# Dataset Format

Organize your dataset like this:

```bash
data/

├── train/
│   ├── actinic_keratoses/
│   ├── basal_cell_carcinoma/
│   ├── benign_keratosis/
│   ├── dermatofibroma/
│   ├── melanocytic_nevi/
│   ├── vascular_lesions/
│   └── melanoma/

└── val/
    ├── actinic_keratoses/
    ├── basal_cell_carcinoma/
    ├── benign_keratosis/
    ├── dermatofibroma/
    ├── melanocytic_nevi/
    ├── vascular_lesions/
    └── melanoma/
```

---

# Train the Model

Run:

```bash
cd backend
python train.py
```

This will:

• Load images from `../data/train` and `../data/val`  
• Apply data augmentation  
• Train the CNN model  
• Save the model to:

```bash
backend/models/skin_disease_model.keras
```

---

# Run Flask API

Start backend server:

```bash
cd backend
python app.py
```

Backend runs at:

```
http://127.0.0.1:5000
```

---

# Frontend Setup

Go to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# API Endpoints

### Health Check

```
GET /health
```

### Predict

```
POST /predict
```

Content-Type:

```
multipart/form-data
```

Body:

```
image=<file>
```

---

# Sample Response

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

---

# Tech Stack

Python  
TensorFlow / Keras  
CNN  
Flask  
Flask-CORS  
React.js  
Axios  
Vite  

---

# Future Improvements

• Add user authentication system  
• Save prediction history in database  
• Deploy frontend and backend to cloud  
• Improve CNN model accuracy  
• Add disease description and treatment suggestions  

---

# Important Note

This project is intended for **educational and portfolio purposes only**.  

It should **not be used for medical diagnosis** or as a replacement for professional medical advice.

---

# Author


Mahitha Basivireddy

