# Cyberpunks Agriguard

Cyberpunks Agriguard is an AI-powered early plant disease triage system developed during a hackathon by a team of four members.  
The project focuses on helping farmers and agricultural stakeholders identify potential plant diseases at an early stage using image-based analysis and machine learning techniques.

The motivation behind this project is to reduce crop loss by providing fast, accessible, and reliable disease detection support, especially for farmers who may not have immediate access to agricultural experts.

---

## Problem Statement
Plant diseases are a major cause of crop loss and reduced agricultural productivity.  
Traditional disease identification methods are time-consuming and often require expert knowledge, which may not always be available in rural areas.

This project aims to provide a simple and effective solution by allowing users to upload an image of a plant leaf and receive an initial assessment of possible diseases using AI models.

---

## Solution Overview
Cyberpunks Agriguard uses a machine learning-based approach to analyze plant leaf images and classify them into different disease categories.

The system is designed as a full-stack application with:
- A user-friendly frontend for image upload
- A backend service to handle requests and model inference
- A trained deep learning model for plant disease classification

This approach enables quick decision-making and acts as an early warning system rather than a final diagnosis tool.

---

## Technologies Used
- **Python** for backend and machine learning logic  
- **Deep Learning (CNN)** for image classification  
- **Flask / FastAPI** for backend API (if applicable)  
- **React / HTML / CSS / JavaScript** for frontend (if applicable)  
- **PlantVillage Dataset** for model training  
- **Git & GitHub** for version control and collaboration  

---

## Project Structure

Cyberpunks-Agriguard/
├── backend/          # Backend API and model logic
├── frontend/         # Frontend user interface
├── notebooks/        # Model training and experimentation notebooks
├── requirements.txt  # Project dependencies
└── README.md         # Project documentation

---
---

## How It Works
1. The user uploads an image of a plant leaf through the frontend.
2. The image is sent to the backend server.
3. The trained AI model processes the image.
4. The system predicts the most likely disease category.
5. The result is displayed to the user as an early diagnostic suggestion.

---

## Impact & Use Cases
- Early detection of plant diseases  
- Reduced dependency on agricultural experts  
- Support for farmers in remote areas  
- Educational tool for learning about plant diseases  
- Scalable solution for smart agriculture systems  

---

## Team Members
* Rahul Bramhankar
* Pawan Bhandari
* Aniket Thorat
* Soham Thakor

---

## Future Scope
- Support for more crop types and diseases  
- Mobile application integration  
- Multilingual support for rural accessibility  
- Cloud deployment for real-time usage  
- Integration with IoT-based farm monitoring systems  

---

## Note
This project is intended as an early disease triage system and not a replacement for professional agricultural diagnosis.