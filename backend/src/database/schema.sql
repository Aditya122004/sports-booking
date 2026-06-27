```sql
DROP DATABASE IF EXISTS sports_booking;

CREATE DATABASE sports_booking;

USE sports_booking;

-- =====================================================
-- USERS
-- =====================================================

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

-- =====================================================
-- SPORTS
-- =====================================================

CREATE TABLE sports (

    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(100) UNIQUE NOT NULL,

    image_url TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TEAMS
-- =====================================================

CREATE TABLE teams (

    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(100) NOT NULL,

    captain_id BIGINT NOT NULL,

    sport_id BIGINT NOT NULL,

    logo_url TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (captain_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (sport_id)
        REFERENCES sports(id)
);

-- =====================================================
-- TEAM MEMBERS
-- =====================================================

CREATE TABLE team_members (

    team_id BIGINT NOT NULL,

    user_id BIGINT NOT NULL,

    PRIMARY KEY (
        team_id,
        user_id
    ),

    FOREIGN KEY (team_id)
        REFERENCES teams(id)
        ON DELETE CASCADE,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- =====================================================
-- FACILITIES
-- =====================================================

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

    FOREIGN KEY (sport_id)
        REFERENCES sports(id)
);

-- =====================================================
-- BOOKINGS
-- =====================================================

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

    FOREIGN KEY (user_id)
        REFERENCES users(id),

    FOREIGN KEY (facility_id)
        REFERENCES facilities(id),

    FOREIGN KEY (team_id)
        REFERENCES teams(id)
);

CREATE INDEX idx_booking_lookup
ON bookings
(
    facility_id,
    booking_date,
    start_time,
    end_time
);

-- =====================================================
-- PAYMENTS
-- =====================================================

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

    FOREIGN KEY (booking_id)
        REFERENCES bookings(id)
        ON DELETE CASCADE
);
```
