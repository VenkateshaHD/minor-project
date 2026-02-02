# AI-Powered Educational Recommendation System

A comprehensive AI-based learning platform that provides personalized educational content recommendations using machine learning and Google's Gemini AI.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
  - [Option 1: Docker Setup (Recommended)](#option-1-docker-setup-recommended)
  - [Option 2: Manual Setup](#option-2-manual-setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This project is an educational recommendation system that leverages AI and machine learning to provide personalized learning content recommendations. It consists of a FastAPI backend with MongoDB database and a React-based frontend interface.

## ✨ Features

- **AI-Powered Recommendations**: Uses Google Gemini AI for intelligent content suggestions
- **Machine Learning**: Scikit-learn based recommendation engine
- **YouTube Integration**: Fetches educational videos via YouTube Data API
- **Web Content Search**: Google Custom Search integration for articles
- **User Authentication**: Secure user management with bcrypt
- **Modern UI**: React-based responsive user interface
- **RESTful API**: FastAPI backend with automatic documentation

## 🛠 Tech Stack

### Backend
- **Framework**: FastAPI 0.115.0
- **Server**: Uvicorn 0.30.1
- **Database**: MongoDB
- **ML Libraries**: 
  - scikit-learn 1.4.2
  - NumPy 1.26.4
- **AI**: Google Generative AI (Gemini) 0.8.6
- **Web Scraping**: BeautifulSoup4, Requests
- **Authentication**: Passlib with bcrypt

### Frontend
- **Framework**: React 19.2.3
- **Routing**: React Router DOM 7.11.0
- **HTTP Client**: Axios 1.13.2
- **Notifications**: React Toastify 11.0.5
- **Build Tool**: React Scripts 5.0.1

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

### For Docker Setup (Recommended):
- **Docker**: [Download Docker](https://www.docker.com/products/docker-desktop/)
- **Docker Compose**: Usually included with Docker Desktop

### For Manual Setup:
- **Python**: 3.9 or higher - [Download Python](https://www.python.org/downloads/)
- **Node.js**: 18.x or higher - [Download Node.js](https://nodejs.org/)
- **MongoDB**: 4.x or higher - [Download MongoDB](https://www.mongodb.com/try/download/community)
- **Git**: [Download Git](https://git-scm.com/downloads)

### API Keys Required:
- **YouTube Data API Key**: [Get from Google Cloud Console](https://console.cloud.google.com/)
- **Google AI API Key** (for Gemini): [Get from Google AI Studio](https://makersuite.google.com/app/apikey)
- **Google Custom Search Engine ID** (Optional): [Create CSE](https://programmablesearchengine.google.com/)

## 🚀 Installation & Setup

### Option 1: Docker Setup (Recommended)

#### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd minor_project
```

#### Step 2: Configure Environment Variables
Navigate to the backend directory and create a `.env` file:

```bash
cd AI-Edu-recomend/backend
cp .env.example .env
```

Edit the `.env` file with your API keys:
```env
# ---- Mongo ----
MONGO_URL=mongodb://mongodb:27017
MONGO_DB=learning_ranker

# ---- YouTube Data API v3 ----
YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY

# ---- Optional: Google Custom Search (for web articles) ----
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
GOOGLE_CSE_ID=YOUR_CUSTOM_SEARCH_ENGINE_ID
```

#### Step 3: Build and Run with Docker Compose
```bash
cd ..  # Go back to AI-Edu-recomend directory
docker compose up --build
```

The backend will be available at `http://localhost:8000`

#### Step 4: Setup and Run Frontend
Open a new terminal:

```bash
cd AI-new-ui/learning-ui
npm install
npm start
```

The frontend will be available at `http://localhost:3000`

---

### Option 2: Manual Setup

#### Backend Setup

##### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd minor_project
```

##### Step 2: Create Python Virtual Environment
```bash
cd AI-Edu-recomend/backend
python -m venv venv
```

##### Step 3: Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

##### Step 4: Install Python Dependencies
```bash
pip install -r requirements.txt
```

##### Step 5: Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
# ---- Mongo ----
MONGO_URL=mongodb://localhost:27017
MONGO_DB=learning_ranker

# ---- YouTube Data API v3 ----
YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY

# ---- Optional: Google Custom Search ----
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
GOOGLE_CSE_ID=YOUR_CUSTOM_SEARCH_ENGINE_ID
```

##### Step 6: Start MongoDB
Ensure MongoDB is running on your system:

**Windows (as service):**
```bash
net start MongoDB
```

**Mac/Linux:**
```bash
sudo systemctl start mongod
```

Or run MongoDB in a separate terminal:
```bash
mongod
```

##### Step 7: Run the Backend
```bash
cd app
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at `http://localhost:8000`

#### Frontend Setup

##### Step 1: Navigate to Frontend Directory
```bash
cd ../../../AI-new-ui/learning-ui
```

##### Step 2: Install Dependencies
```bash
npm install
```

##### Step 3: Run the Frontend
```bash
npm start
```

Frontend will be available at `http://localhost:3000`

## 🔧 Environment Configuration

### Backend Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGO_URL` | MongoDB connection URL | Yes | `mongodb://localhost:27017` |
| `MONGO_DB` | Database name | Yes | `learning_ranker` |
| `YOUTUBE_API_KEY` | YouTube Data API v3 key | Yes | - |
| `GOOGLE_API_KEY` | Google API key for custom search | No | - |
| `GOOGLE_CSE_ID` | Custom Search Engine ID | No | - |

### Getting API Keys

#### YouTube Data API Key:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "YouTube Data API v3"
4. Create credentials (API Key)
5. Copy the API key to your `.env` file

#### Google Gemini API Key:
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key"
4. Copy the key to your `.env` file

#### Google Custom Search Engine (Optional):
1. Visit [Programmable Search Engine](https://programmablesearchengine.google.com/)
2. Create a new search engine
3. Get the Search Engine ID
4. Use the same Google API key from above

## 🎮 Running the Application

### Using Docker

**Start all services:**
```bash
cd AI-Edu-recomend
docker compose up
```

**Rebuild and restart (after code changes):**
```bash
docker compose up --build --force-recreate
```

**Stop all services:**
```bash
docker compose down
```

**View logs:**
```bash
docker compose logs -f
```

### Manual Setup

**Start Backend:**
```bash
cd AI-Edu-recomend/backend/app
uvicorn main:app --reload
```

**Start Frontend (in new terminal):**
```bash
cd AI-new-ui/learning-ui
npm start
```

**Access the Application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Alternative API Docs: http://localhost:8000/redoc

## 📁 Project Structure

```
minor_project/
├── AI-Edu-recomend/           # Backend application
│   ├── backend/
│   │   ├── app/
│   │   │   ├── core/          # Core configurations
│   │   │   ├── db/            # Database connections
│   │   │   ├── models/        # Data models
│   │   │   ├── routers/       # API endpoints
│   │   │   ├── services/      # Business logic
│   │   │   ├── utils/         # Utility functions
│   │   │   └── main.py        # FastAPI application entry
│   │   ├── .env               # Environment variables
│   │   ├── .env.example       # Environment template
│   │   ├── Dockerfile         # Docker configuration
│   │   └── requirements.txt   # Python dependencies
│   └── docker-compose.yml     # Docker Compose config
│
├── AI-new-ui/                 # Frontend application
│   └── learning-ui/
│       ├── public/            # Static files
│       ├── src/               # React source code
│       ├── package.json       # Node dependencies
│       └── README.md          # React app README
│
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## 📚 API Documentation

Once the backend is running, you can access the interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

These interfaces allow you to:
- View all available endpoints
- Test API calls directly
- See request/response schemas
- Understand authentication requirements

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error**: `Address already in use`

**Solution**:
```bash
# Find process using the port (e.g., 8000)
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:8000 | xargs kill -9
```

#### 2. MongoDB Connection Failed

**Error**: `Connection refused` or `Cannot connect to MongoDB`

**Solution**:
- Ensure MongoDB is running: `mongod`
- Check if MongoDB service is active
- Verify `MONGO_URL` in `.env` file
- For Docker: ensure mongodb container is running

#### 3. Module Not Found Errors (Python)

**Error**: `ModuleNotFoundError`

**Solution**:
```bash
# Ensure virtual environment is activated
cd AI-Edu-recomend/backend
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

#### 4. npm install Fails

**Error**: Dependency resolution errors

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### 5. API Key Issues

**Error**: `403 Forbidden` or `Invalid API Key`

**Solution**:
- Verify API keys are correctly set in `.env`
- Ensure no extra spaces or quotes in `.env` file
- Check API key permissions in Google Cloud Console
- Verify API services are enabled in your Google Cloud project

#### 6. CORS Errors in Browser

**Error**: `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution**:
- Check FastAPI CORS middleware configuration
- Ensure backend is running on correct port
- Verify frontend is configured to use correct backend URL

#### 7. Docker Build Issues

**Error**: Docker build fails

**Solution**:
```bash
# Rebuild without cache
docker compose build --no-cache

# Remove all containers and volumes
docker compose down -v

# Rebuild and start
docker compose up --build
```

### Getting Help

If you encounter issues not covered here:
1. Check the application logs
2. Review API documentation at http://localhost:8000/docs
3. Ensure all prerequisites are properly installed
4. Verify environment variables are correctly set

## 📝 Development Notes

### Backend Development
- The FastAPI server auto-reloads on code changes when using `--reload` flag
- Access API docs while developing for testing endpoints
- MongoDB data persists in Docker volumes

### Frontend Development
- React app hot-reloads automatically
- Uses proxy to connect to backend API
- Run `npm run build` for production build

### Testing
```bash
# Backend tests
cd AI-Edu-recomend/backend
pytest

# Frontend tests
cd AI-new-ui/learning-ui
npm test
```

## 🔐 Security Notes

- Never commit `.env` files to version control
- Keep API keys secure and rotate them regularly
- Use environment variables for all sensitive data
- Review `.gitignore` to ensure secrets are excluded

## 📄 License

[Add your license information here]

## 👥 Contributors

Prateek Gajanan Bhandari
Venkatesha H D
---


