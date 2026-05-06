# Alen's Barbershop - Appointment Booking System

A full-stack web application for managing barbershop appointments, services, and customer reviews. Features user authentication, appointment scheduling, and a comprehensive service catalog.

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

- **Node.js** - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MySQL Server** - [Download](https://dev.mysql.com/downloads/mysql/)

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
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration INT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Appointments table
CREATE TABLE appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);
-- Reviews table
CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert values
INSERT INTO services (name, description, price, duration, image_url) VALUES
('Muško šišanje', 'Profesionalno muško šišanje sa stilizovanjem', 15.00, 30, 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400'),
('Brijanje brade', 'Tradicionalno brijanje sa toplim peškirom', 12.00, 25, 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400'),
('Šišanje + Brada', 'Kompletna usluga šišanja i brijanja', 25.00, 50, 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400'),
('Pranje kose', 'Pranje i stilizovanje kose', 8.00, 20, 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400');


```

---

## Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=barbershop_db

# Server Configuration
PORT=5000

# JWT Configuration
JWT_SECRET=your_secret_key_here_change_in_production
```
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

Enjoy!
---
