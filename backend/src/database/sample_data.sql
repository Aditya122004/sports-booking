USE sports_booking;

-- -----------------------------------------------------
-- ADMIN
-- Password: Admin@123
-- Replace the hash if you generate your own bcrypt hash.
-- -----------------------------------------------------

INSERT INTO users
(
    name,
    email,
    password,
    photo_id_type,
    photo_id_number,
    role
)
VALUES
(
    'Administrator',
    'admin@sportsbook.com',
    '$2b$10$ReplaceWithYourBcryptHashHere',
    'AADHAR',
    'ADMIN123456',
    'ADMIN'
);

-- -----------------------------------------------------
-- SPORTS
-- -----------------------------------------------------

INSERT INTO sports (name) VALUES
('Football'),
('Cricket'),
('Badminton'),
('Basketball'),
('Tennis');

-- -----------------------------------------------------
-- FACILITIES
-- -----------------------------------------------------

INSERT INTO facilities
(
    name,
    sport_id,
    description,
    location,
    opening_time,
    closing_time,
    price_per_hour,
    max_booking_hours
)
VALUES
(
    'Football Turf A',
    1,
    '7v7 Artificial Turf',
    'Sector 62, Noida',
    '06:00:00',
    '22:00:00',
    1200,
    4
),
(
    'Indoor Badminton Court',
    3,
    'Wooden Court',
    'Sector 18, Noida',
    '07:00:00',
    '21:00:00',
    500,
    2
),
(
    'Cricket Ground',
    2,
    'Full Size Ground',
    'Greater Noida',
    '06:00:00',
    '20:00:00',
    2500,
    6
);

-- -----------------------------------------------------
-- SAMPLE USER
-- Password: User@123
-- -----------------------------------------------------

INSERT INTO users
(
    name,
    email,
    password,
    photo_id_type,
    photo_id_number
)
VALUES
(
    'Demo User',
    'user@example.com',
    '$2b$10$ReplaceWithYourBcryptHashHere',
    'AADHAR',
    '123456789012'
);

-- -----------------------------------------------------
-- SAMPLE TEAM
-- -----------------------------------------------------

INSERT INTO teams
(
    name,
    captain_id,
    sport_id
)
VALUES
(
    'Code Warriors',
    2,
    1
);

INSERT INTO team_members
(
    team_id,
    user_id
)
VALUES
(
    1,
    2
);

-- -----------------------------------------------------
-- SAMPLE BOOKING
-- -----------------------------------------------------

INSERT INTO bookings
(
    user_id,
    facility_id,
    team_id,
    booking_date,
    start_time,
    end_time,
    total_amount,
    booking_status,
    payment_status
)
VALUES
(
    2,
    1,
    1,
    CURDATE(),
    '18:00:00',
    '20:00:00',
    2400,
    'CONFIRMED',
    'SUCCESS'
);

-- -----------------------------------------------------
-- SAMPLE PAYMENT
-- -----------------------------------------------------

INSERT INTO payments
(
    booking_id,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    amount,
    status,
    verified_at
)
VALUES
(
    1,
    'order_demo123',
    'pay_demo123',
    'signature_demo123',
    2400,
    'SUCCESS',
    NOW()
);