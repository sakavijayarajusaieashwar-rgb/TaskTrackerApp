# Task Manager

A full-stack Todo application with JWT authentication, task CRUD operations, filtering, completion status, and a responsive React interface.

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
- `js-cookie`

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT
- bcrypt
- CORS

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

The task dashboard is available at `/` and `/page` after login.

## Frontend Commands

Run from `frontend/`:

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run lint      # Check the source code with ESLint
npm run preview   # Preview the production build
```

## API Routes

Base URL: `http://localhost:3000`

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

## Notes

- The frontend expects the backend to run on port `3000`.
- The JWT is stored in a browser cookie named `jwttoken`.
- Make sure MongoDB is running before starting the backend.
