# URL Shortener App

Makes long URLs shorter. Built with MERN stack.

## Run Commands

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

## Open in Browser
- Frontend: http://localhost:3000
- Backend: http://localhost:5000


## Deploying to Render

Environment variables:

- Backend service
  - `MONGODB_URI`: your MongoDB connection string (e.g. MongoDB Atlas)
  - `NODE_ENV`: `production`
  - `RENDER_EXTERNAL_URL`: auto-provided by Render (used to build short URLs)

- Frontend static site
  - `VITE_API_BASE_URL`: backend API base, e.g. `https://your-backend.onrender.com/api`
  - `VITE_PUBLIC_BASE_URL` (optional): backend public base for short links; defaults to `window.location.origin`

Build & start commands:

- Backend
  - Build command: `npm install`
  - Start command: `npm start`

- Frontend
  - Build command: `npm install && npm run build`
  - Publish directory: `dist`