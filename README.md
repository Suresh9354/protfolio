# MERN Stack Portfolio Website

A full-stack portfolio website built with MongoDB, Express, React, and Node.js.

## Features

- **Public Pages**: Home (CV/Resume), About, Projects, Skills, Contact
- **Admin Panel**: Manage projects, skills, bio, and view contact submissions
- **Authentication**: JWT-based admin authentication
- **Image Upload**: Upload images for projects and profile
- **Responsive Design**: Modern, mobile-friendly UI

## Tech Stack

- **Frontend**: React, React Router, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js, Mongoose, JWT, bcrypt, Multer
- **Database**: MongoDB

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Install all dependencies:
```bash
npm run install-all
```

2. Set up environment variables:

**server/.env:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

**client/.env:**
```
VITE_API_URL=http://localhost:5000/api
```

3. Start the development servers:
```bash
npm run dev
```

This will start both the backend server (port 5000) and frontend client (port 5173 or 3000).

### Create Admin User

After setting up the database, create an admin user by running:

```bash
cd server
npm run seed
```

This will create a default admin account:
- **Email**: admin@example.com
- **Password**: admin123

**⚠️ IMPORTANT**: Change this password immediately after first login through the admin panel!

## Project Structure

```
mern-portfolio-website/
├── client/          # React frontend
├── server/          # Express backend
├── package.json     # Root package.json
└── README.md
```

## API Endpoints

### Public
- `GET /api/projects` - Get all projects
- `GET /api/skills` - Get all skills
- `GET /api/bio` - Get bio information
- `POST /api/contact` - Submit contact form

### Admin (Protected)
- `POST /api/auth/login` - Admin login
- `GET /api/projects` - Get all projects (admin)
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- Similar endpoints for skills, bio, and contacts

