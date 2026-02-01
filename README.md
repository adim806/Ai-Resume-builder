# 🚀 AI Powered Resume Builder

[Landing Page]<img width="2551" height="1264" alt="צילום מסך 2026-01-16 141619" src="https://github.com/user-attachments/assets/cfcc605b-8fa6-4d8d-b8d8-1e6195f9171f" />


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

<p align="center">
  <table>
    <tr>
      <td>
        <img src="https://github.com/user-attachments/assets/154973a2-eaed-4c7f-a71d-6a4df0476cdd" height="300px" alt="Screenshot 1" />
      </td>
      <td>
        <img src="https://github.com/user-attachments/assets/07c4c1d8-93e2-4d11-88fe-2f39641de843" height="300px" alt="Screenshot 2" />
      </td>
    </tr>
  </table>
</p>

## ⚙️ Environment Variables

To run this project locally, you need to configure the environment variables.
Create a `.env` file in the `server` directory and add the following:


### 1. Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd InterviewPrepAI

# Install Backend
cd backend
npm install

# Install Frontend
cd ../frontend/interview-prep-ai
npm install

# npm run server (backend)
# npm run dev (frontend)  
