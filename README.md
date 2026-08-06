# Student Resource Management System (SRMS)

A full-stack web application for managing staff, students, and admin workflows.

## Project structure

- `backend/` - Express API server
- `frontend/` - React + Vite frontend app

## Backend

The backend is built with Express and includes:

- Authentication routes under `backend/src/routes/authRoutes`
- Student routes under `backend/src/routes/student.routes`
- Staff routes under `backend/src/routes/staff.routes`
- Controllers in `backend/src/controllers/`
- Supabase, PostgreSQL, JWT, bcrypt, and Knex dependencies

### Run backend

1. Open a terminal in `backend/`
2. Install packages: `npm install`
3. Start the server: `node app.js` or use `nodemon` if configured

## Frontend

The frontend is a React application using Vite. It includes pages for:

- Landing page
- Login page
- Registration page
- Admin dashboard
- HOD home page
- Staff dashboard
- Staff management and student management flows

### Run frontend

1. Open a terminal in `frontend/`
2. Install packages: `npm install`
3. Start the app: `npm run dev`

## Features implemented

- Role-based navigation and route protection
- Session restore from `localStorage`
- Separate login flows for staff, HOD, and admin
- Management pages for staff and students
- Backend route scaffolding for auth, staff, and student APIs

## Notes

- The backend currently uses `backend/app.js` as the main Express entrypoint.
- The frontend routing is defined in `frontend/src/App.jsx`.
- The root README is intentionally minimal; update it as features are completed.
