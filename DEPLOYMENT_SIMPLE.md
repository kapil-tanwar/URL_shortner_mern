# Simple Vercel Deployment Guide

## What We're Doing:
- **Backend**: Deploy as serverless function (handles API calls)
- **Frontend**: Let Vercel auto-detect and build it

## Step 1: Deploy Backend
1. Create new Vercel project
2. Import your GitHub repo
3. **Root Directory**: `backend/`
4. **Framework Preset**: `Node.js`
5. **Build Command**: Leave empty
6. **Output Directory**: Leave empty
7. **Install Command**: `npm install`

## Step 2: Add Environment Variables
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Step 3: Deploy
- Click "Deploy"
- Get your backend URL (e.g., `https://your-backend.vercel.app`)

## Step 4: Deploy Frontend
1. Create another new Vercel project
2. Import the same GitHub repo
3. **Root Directory**: `frontend/`
4. **Framework Preset**: `Vite`
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist`
7. **Install Command**: `npm install`

## Step 5: Add Frontend Environment Variable
```
VITE_API_URL=https://your-backend.vercel.app/api
```

## Step 6: Deploy Frontend
- Click "Deploy"
- Get your frontend URL

## Result:
- **Backend**: Handles API calls at `/api/*`
- **Frontend**: Serves your React app
- **Communication**: Frontend calls backend API

## Why This Approach:
- **Simpler**: Less configuration issues
- **Reliable**: Vercel handles each part separately
- **Easier**: No complex routing or build issues
- **Standard**: This is how most MERN apps are deployed

## Alternative (If You Want Single Deployment):
- Use Vercel's monorepo feature
- Deploy from root directory
- Let Vercel auto-detect both frontend and backend
