# Sports Booking Backend

A Sports Facility Booking System built using **Node.js**, **Express.js**, and **MySQL**.

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Role Based Authorization (User/Admin)

### Sports
- Add Sports
- View Sports
- Update Sports
- Delete Sports

### Teams
- Create Team
- Add Members
- Remove Members
- View Team Details
- My Teams

### Facilities
- Add Facility
- Update Facility
- View Facilities
- Facility Availability
- Cloudinary Image Upload

### Booking
- Dynamic Slot Generation
- Double Booking Prevention
- Booking Expiry
- Team Booking Support
- My Bookings

### Payments
- Razorpay Test Mode
- Payment Verification

### Admin
- Dashboard
- Users
- Teams
- Bookings
- Revenue Analytics

---

# Tech Stack

- Node.js
- Express.js
- MySQL
- JWT
- Cloudinary
- Razorpay (Test Mode)
- Multer

---

# Installation

```bash
git clone <repository-url>

cd backend

npm install
```

---

# Environment Variables

Create a `.env` file.

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=sports_booking

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

RAZORPAY_KEY_ID=rzp_test_xxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxx
```

---

# Database

Create Database

```sql
CREATE DATABASE sports_booking;

USE sports_booking;
```

---

# Users

```sql
CREATE TABLE users (

    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    profile_picture TEXT,

    photo_id_type ENUM(
        'AADHAR',
        'PAN',
        'PASSPORT',
        'DRIVING_LICENSE',
        'VOTER_ID'
    ) NOT NULL,

    photo_id_number VARCHAR(100) NOT NULL,

    role ENUM(
        'USER',
        'ADMIN'
    ) DEFAULT 'USER',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Sports

```sql
CREATE TABLE sports (

    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(100) UNIQUE NOT NULL,

    image_url TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Teams

```sql
CREATE TABLE teams (

    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(100) NOT NULL,

    captain_id BIGINT NOT NULL,

    sport_id BIGINT NOT NULL,

    logo_url TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (captain_id)
        REFERENCES users(id),

    FOREIGN KEY (sport_id)
        REFERENCES sports(id)
);
```

---

# Team Members

```sql
CREATE TABLE team_members (

    team_id BIGINT,

    user_id BIGINT,

    PRIMARY KEY(team_id,user_id),

    FOREIGN KEY(team_id)
        REFERENCES teams(id)
        ON DELETE CASCADE,

    FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
```

---

# Facilities

```sql
CREATE TABLE facilities (

    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(100) NOT NULL,

    sport_id BIGINT NOT NULL,

    description TEXT,

    location VARCHAR(255),

    opening_time TIME NOT NULL,

    closing_time TIME NOT NULL,

    price_per_hour DECIMAL(10,2) NOT NULL,

    image_url TEXT,

    max_booking_hours INT DEFAULT 4,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(sport_id)
        REFERENCES sports(id)
);
```

---

# Bookings

```sql
CREATE TABLE bookings (

    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    user_id BIGINT NOT NULL,

    facility_id BIGINT NOT NULL,

    team_id BIGINT NULL,

    booking_date DATE NOT NULL,

    start_time TIME NOT NULL,

    end_time TIME NOT NULL,

    total_amount DECIMAL(10,2) NOT NULL,

    booking_status ENUM(
        'PENDING',
        'CONFIRMED',
        'CANCELLED'
    ) DEFAULT 'PENDING',

    payment_status ENUM(
        'PENDING',
        'SUCCESS',
        'FAILED'
    ) DEFAULT 'PENDING',

    expires_at DATETIME,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)
        REFERENCES users(id),

    FOREIGN KEY(facility_id)
        REFERENCES facilities(id),

    FOREIGN KEY(team_id)
        REFERENCES teams(id)
);

CREATE INDEX idx_booking_lookup
ON bookings(
    facility_id,
    booking_date,
    start_time,
    end_time
);
```

---

# Payments

```sql
CREATE TABLE payments (

    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    booking_id BIGINT NOT NULL,

    razorpay_order_id VARCHAR(100),

    razorpay_payment_id VARCHAR(100),

    razorpay_signature TEXT,

    amount DECIMAL(10,2) NOT NULL,

    status ENUM(
        'PENDING',
        'SUCCESS',
        'FAILED'
    ) DEFAULT 'PENDING',

    verified_at DATETIME,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(booking_id)
        REFERENCES bookings(id)
);
```

---

# Run Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# API Modules

```
Authentication
│
├── Register
├── Login
└── Profile

Sports
│
├── Create
├── Update
├── Delete
└── View

Teams
│
├── Create Team
├── Add Member
├── Remove Member
├── Team Details
└── My Teams

Facilities
│
├── Create
├── Update
├── View
└── Availability

Bookings
│
├── Create Booking
├── My Bookings
└── Booking Validation

Payments
│
├── Create Razorpay Order
└── Verify Payment

Admin
│
├── Dashboard
├── Users
├── Teams
├── Bookings
└── Revenue
```

---

# Folder Structure

```
src
│
├── config
├── controllers
├── middlewares
├── repositories
├── routes
├── services
├── utils
├── jobs
└── app.js
```

---