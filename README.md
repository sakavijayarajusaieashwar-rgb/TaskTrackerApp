# Task Manager

A full-stack Todo application with JWT authentication, task CRUD operations, filtering, completion status, and a responsive React interface.

**Live Demo:** https://task-tracker-app-ooq7.vercel.app  
**Backend API:** https://tasktrackerapp-uu7v.onrender.com

> Note: the backend is hosted on Render's free tier, which spins down after 
> periods of inactivity. The first request after idle time may take 30-60 
> seconds to respond while the server wakes up.

## Features
- User registration and login
- JWT-protected task routes
- Create, edit, complete, and delete tasks
- Filter tasks by all, pending, or completed
- Task summary cards
- Empty state for accounts without tasks
- Responsive dashboard and edit modal

## Tech Stack

### Frontend
- React
- React Router
- Vite
- JavaScript

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT
- bcrypt
- CORS

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Project Structure
```text
Task Manager/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── routes/
│       ├── App.jsx
│       └── main.jsx
└── README.md
```

## Requirements
- Node.js 18 or newer
- MongoDB running locally or a MongoDB connection string
- npm

## Environment Variables

Create `backend/.env`:
```env
PORT=3000
Mongoose_URL=mongodb://127.0.0.1:27017/task-manager
JWT_SECRET=replace-this-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:3000
```

Do not commit `.env` files or real secrets.

## Installation

Install backend dependencies:
```bash
cd backend
npm install
```

Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## Running the Application

Start the backend in one terminal:
```bash
cd backend
npm run dev
```

Start the frontend in another terminal:
```bash
cd frontend
npm run dev
```

Open the URL shown by Vite, usually:
```text
http://localhost:5173
```

## Frontend Commands
Run from `frontend/`:
```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run lint      # Check the source code with ESLint
npm run preview   # Preview the production build
```

## API Routes
Base URL (local): `http://localhost:3000`  
Base URL (production): `https://tasktrackerapp-uu7v.onrender.com`

### Authentication
| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/users/register` | Create a user account |
| `POST` | `/users/login` | Login and receive a JWT |

### Tasks
Task routes require an `Authorization` header:
```text
Authorization: Bearer <token>
```

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/tasks` | Get tasks |
| `POST` | `/tasks` | Create a task |
| `PUT` | `/tasks/:taskId` | Update a task or completion status |
| `DELETE` | `/tasks/:taskId` | Delete a task |

## Usage
1. Register a new account.
2. Login with your email and password.
3. Create a task using the dashboard form.
4. Mark tasks completed, edit them, or delete them.
5. Use the filters to view all, pending, or completed tasks.
6. Use Logout to end the current session.

## Deployment Notes
- Frontend is deployed on Vercel, configured with a `vercel.json` rewrite 
  rule to support client-side routing (React Router).
- Backend is deployed on Render, with `CLIENT_URL` set to the frontend's 
  stable production domain to allow CORS requests.
- CORS middleware is registered before route handlers in `server.js` to 
  ensure headers apply correctly to all API responses.

## Notes
- The frontend expects the backend URL to be set via `VITE_API_URL`.
- The JWT is stored client-side and sent via the `Authorization` header on each request.
- Make sure MongoDB is running (locally or via Atlas) before starting the backend.
