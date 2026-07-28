# 🩺 AI-Based Intelligent System for Skin Disease Detection and Healthcare Recommendation

## 📌 Project Overview

The **AI-Based Intelligent System for Skin Disease Detection and Healthcare Recommendation** is a web application that uses **Artificial Intelligence (CNN)** to identify skin diseases from uploaded images. The system predicts the skin disease, recommends suitable hospitals for further consultation, and allows users to submit feedback about the prediction.

This project is developed using the **MERN Stack**, **TensorFlow/Keras**, and **React + Tailwind CSS**.

---

# 🚀 Features

- Upload skin disease images
- AI-powered disease prediction
- Detects multiple skin diseases
- Hospital recommendation based on prediction
- User feedback system
- Responsive UI using Tailwind CSS
- REST API architecture
- MongoDB database for feedback storage

---

# 🧠 Diseases Supported

- Acne
- Basal Cell Carcinoma
- Melanoma
- Rosacea

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Tailwind CSS
- React Router DOM
- Axios
- Vite

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- Axios
- Dotenv

## AI / Machine Learning

- Python
- TensorFlow
- Keras
- OpenCV
- Pillow
- NumPy
- Scikit-Learn
- Flask

---

# 📂 Project Structure

```
skin-disease-detection
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── uploads
│   ├── hospitals.js
│   ├── server.js
│   └── .env
│
└── ai-model
    ├── dataset
    ├── data
    │   ├── train
    │   ├── val
    │   └── test
    ├── data_cleaning.py
    ├── split_dataset.py
    ├── train_model.py
    ├── predict_api.py
    └── skin_disease_model.h5
```

---

# 📊 Dataset

Dataset Source:

Kaggle Skin Disease Dataset

Dataset Classes

- Acne
- Basal Cell Carcinoma
- Melanoma
- Rosacea

---

# ⚙️ Machine Learning Workflow

## 1. Data Collection

- Download dataset from Kaggle
- Organize images by disease folders

---

## 2. Data Cleaning

- Remove corrupted images
- Remove unreadable files

Run

```bash
python data_cleaning.py
```

---

## 3. Dataset Splitting

Split dataset into

- 70% Training
- 20% Validation
- 10% Testing

Run

```bash
python split_dataset.py
```

---

## 4. CNN Architecture

The model contains

- Convolution Layers
- ReLU Activation
- Batch Normalization
- MaxPooling
- Dropout
- Dense Layer
- Softmax Output Layer

---

## 5. Model Compilation

Optimizer

```
Adam
```

Loss Function

```
Categorical Crossentropy
```

Metrics

```
Accuracy
```

---

## 6. Model Training

Run

```bash
python train_model.py
```

The model is trained on the training dataset and validated using the validation dataset.

---

## 7. Model Evaluation

Evaluate the trained model using the testing dataset.

Outputs

- Training Accuracy
- Validation Accuracy
- Testing Accuracy

---

## 8. Save Model

The trained model is saved as

```
skin_disease_model.h5
```

---

# 🌐 Backend Workflow

The backend performs

- Receive image from frontend
- Upload image using Multer
- Send image to Python API
- Receive prediction
- Recommend hospitals
- Store feedback in MongoDB

---

# 🖥️ Frontend Workflow

1. User uploads image
2. Image sent to backend
3. Backend sends image to AI model
4. AI predicts disease
5. Backend returns result
6. Display disease and hospitals
7. User submits feedback

---

# 🏥 Hospital Recommendation

Each detected disease is mapped to hospitals.

Example

| Disease | Recommended Hospital |
|----------|----------------------|
| Acne | Apollo Hospital |
| Melanoma | Tata Memorial Hospital |
| Basal Cell Carcinoma | AIIMS |
| Rosacea | Fortis Hospital |

---

# 🗄️ Database

MongoDB stores

- User Feedback
- Date
- Timestamp

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/skin-disease-detection.git
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Backend

```bash
cd backend

npm install

node server.js
```

---

## AI Model

Install Python libraries

```bash
pip install tensorflow flask pillow numpy matplotlib opencv-python split-folders scikit-learn
```

Run

```bash
python predict_api.py
```

---

# ▶️ Running Complete Project

Open three terminals.

### Terminal 1

```bash
cd ai-model

python predict_api.py
```

### Terminal 2

```bash
cd backend

node server.js
```

### Terminal 3

```bash
cd frontend

npm run dev
```

---

# 📡 API Endpoints

## Predict Disease

```
POST /api/predict
```

Request

```
Image File
```

Response

```json
{
  "disease": "Melanoma",
  "hospitals": [
    "Tata Memorial Hospital",
    "AIIMS"
  ]
}
```

---

## Feedback

```
POST /api/feedback
```

Request

```json
{
    "message":"Excellent Prediction"
}
```

Response

```json
{
    "message":"Feedback Saved Successfully"
}
```

---

# 📈 Future Enhancements

- More skin disease classes
- Doctor appointment booking
- Authentication (JWT)
- Medical report generation (PDF)
- Confidence score display
- Disease precautions and treatment suggestions
- Cloud deployment
- Mobile application
- Multilingual support

---

# 📚 Learning Outcomes

- MERN Stack Development
- REST API Development
- CNN Image Classification
- Batch Normalization
- Adam Optimizer
- TensorFlow & Keras
- MongoDB Integration
- React & Tailwind CSS
- AI Model Deployment
- Python Flask API Integration

---

# 👩‍💻 Author

**Vaishnavi Kailas Bhandare**

Bachelor of Engineering (Artificial Intelligence & Data Science)

GitHub: https://github.com/VBhandare1972

---

# 📄 License

This project is developed for educational and academic purposes.

© 2026 Vaishnavi Kailas Bhandare. All Rights Reserved.