# 🚀 AI Powered Resume Builder

![Project Banner](https://via.placeholder.com/1200x400?text=AI+Resume+Builder+Preview)

<div align="center">

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google%20bard&logoColor=white)

</div>

## 📋 Overview

**AI Resume Builder** is a full-stack web application designed to revolutionize how job seekers create their resumes. Built with the **MERN Stack**, it features a real-time editor and integrates **Generative AI (Google Gemini)** to assist users in writing professional summaries and enhancing job descriptions.

The application solves the "writer's block" problem by using AI to rewrite content to be more compelling, professional, and ATS-friendly with a single click.

## ✨ Key Features

- **🤖 AI-Powered Enhancement:** Uses Google Gemini 1.5 Flash to automatically rewrite and improve professional summaries and experience descriptions.
- **📄 Smart Resume Parsing:** Users can upload an existing PDF, and the app extracts the data to populate the builder automatically.
- **👁️ Real-Time Live Preview:** See changes instantly as you edit the resume.
- **🔐 Secure Authentication:** Robust user management using **JWT (JSON Web Tokens)** and HTTP-only cookies/headers.
- **🖼️ Profile Image Handling:** Seamless image uploads and optimization via **ImageKit**.
- **🎨 Customization:** Support for multiple templates, accent colors, and drag-and-drop reordering.
- **mj Export to PDF:** Generates high-quality, print-ready PDF resumes.

## 🛠️ Tech Stack

### **Frontend (Client)**
* **Framework:** React.js (Vite)
* **State Management:** Redux Toolkit
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **HTTP Client:** Axios (with Interceptors)
* **Notifications:** React Hot Toast
* **Icons:** Lucide React

### **Backend (Server)**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose ODM)
* **AI Integration:** OpenAI SDK (configured for Google Gemini API compatibility)
* **Storage:** ImageKit (Cloud storage for user avatars)
* **File Parsing:** PDF-to-Text libraries

## ⚙️ Environment Variables

To run this project locally, you need to configure the environment variables.
Create a `.env` file in the `server` directory and add the following:

```env
# Server Configuration
PORT=3000

# Database Connection
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_super_secret_key_for_jwt

# AI Configuration (Google Gemini via OpenAI SDK)
# Note: We use the OpenAI compatibility layer provided by Google
OPENAI_API_KEY=your_google_gemini_api_key
OPENAI_BASE_URL="[https://generativelanguage.googleapis.com/v1beta/openai/](https://generativelanguage.googleapis.com/v1beta/openai/)"
OPENAI_MODEL="gemini-1.5-flash"

# Image Storage (ImageKit)
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
