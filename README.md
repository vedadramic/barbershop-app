# Alen's Barbershop - Appointment Booking System

A full-stack web application for managing barbershop appointments, services, and customer reviews. Features user authentication, appointment scheduling, and a comprehensive service catalog.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage Guide](#usage-guide)

---

## About the Project

Alen's Barbershop is a modern appointment booking system designed to streamline barbershop operations. Customers can:
- Register and log in securely
- Browse available services
- Book appointments online
- Leave reviews and ratings
- View their appointment history

Business operators can:
- Manage available services
- Track appointments
- View customer reviews
- Monitor feedback

---

## Key Features

✨ **User Authentication**
- User registration and login with JWT tokens
- Password encryption with bcryptjs
- Secure session management

📅 **Appointment Management**
- Schedule appointments with date, time, and notes
- View appointment history
- Cancel or modify bookings

💇 **Service Management**
- Browse available barbershop services
- View service details and pricing
- Add or remove services

⭐ **Reviews & Ratings**
- Customers can leave reviews after appointments
- Service ratings system
- View all customer feedback

🔐 **Security**
- JWT-based authentication
- Password encryption
- CORS-enabled for secure cross-origin requests

---

## Technologies Used

### Frontend
- **React 19** - UI framework
- **React Router v7** - Client-side routing
- **Axios** - HTTP client for API communication
- **CSS3** - Styling

### Backend
- **Node.js & Express 5** - Server framework
- **MySQL 2** - Database
- **JWT (jsonwebtoken)** - Authentication
- **bcryptjs** - Password encryption
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment configuration
- **Nodemon** - Development auto-reload

### Database
- **MySQL** - Relational database

---

## Project Structure

```
alens-barbershop/
├── backend/                          # Node.js/Express API
│   ├── config/
│   │   └── database.js              # Database configuration
│   ├── controllers/                 # Business logic
│   │   ├── appointmentController.js
│   │   ├── reviewController.js
│   │   ├── serviceController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js                  # JWT authentication middleware
│   ├── models/                      # Database models
│   │   ├── Appointment.js
│   │   ├── Review.js
│   │   ├── Service.js
│   │   └── User.js
│   ├── routes/                      # API routes
│   │   ├── appointmentRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── serviceRoutes.js
│   │   └── userRoutes.js
│   ├── server.js                    # Express app entry point
│   ├── package.json
│   └── .gitignore
│
├── frontend/                         # React app
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── AppointmentForm.js
│   │   │   ├── Navbar.js
│   │   │   ├── ServiceCard.js
│   │   │   └── Footer.js
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   └── Reviews.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── App.css
│   ├── package.json
│   ├── .gitignore
│   └── README.md
│
├── .gitignore                       # Root-level gitignore
└── README.md                        # This file
```

---

## Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MySQL Server** (v5.7 or higher) - [Download](https://dev.mysql.com/downloads/mysql/)
- **Git** - [Download](https://git-scm.com/)

---

## Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/alens-barbershop.git
cd alens-barbershop
```

### Step 2: Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

### Step 3: Frontend Setup

In a new terminal, navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

### Step 4: Database Setup

1. Open MySQL and create a new database:

```sql
CREATE DATABASE barbershop_db;
USE barbershop_db;
```

2. Create the required tables:

```sql
-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration_minutes INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    notes TEXT,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
);

-- Reviews table
CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    appointment_id INT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);
```

---

## Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory (do not commit this file):

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=barbershop_db
DB_PORT=3306

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

**⚠️ Important:** 
- Never commit `.env` file to version control
- Change `JWT_SECRET` to a strong, random string in production
- Use strong database passwords in production

### Frontend Environment Variables (Optional)

Create a `.env` file in the `frontend/` directory if needed:

```env
REACT_APP_API_URL=http://localhost:5000
```

---

## Running the Application

### Start the Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

### Start the Frontend Application

In a new terminal:

```bash
cd frontend
npm start
```

The frontend will open at `http://localhost:3000`

### Production Build

To create an optimized production build:

```bash
cd frontend
npm run build
```

---

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create new service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)

### Appointments
- `GET /api/appointments` - Get user's appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create new review
- `GET /api/reviews/:id` - Get review by ID
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

---

## Usage Guide

### For Customers

1. **Register Account**: Click "Register" and enter your details
2. **Browse Services**: View available services on the home page
3. **Book Appointment**: Navigate to Dashboard → Click "Book Appointment"
4. **Select Details**: Choose service, date, time, and add notes
5. **Confirm Booking**: Submit the form to create appointment
6. **Leave Review**: After appointment completion, submit a review

### For Administrators

1. **Manage Services**: Add, edit, or remove services through the admin panel
2. **View Appointments**: Access the appointments listing
3. **Monitor Reviews**: Read and respond to customer feedback

---



For issues or questions, please open an issue on the GitHub repository.

---

**Happy coding! 🎉**
