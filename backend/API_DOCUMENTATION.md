# Sports Booking Backend API Documentation

## Base URL

```
http://localhost:5000/api
```

---

# Authentication

## Register

**POST** `/auth/register`

**Content-Type:** `multipart/form-data`

| Field          | Type   | Required |
| -------------- | ------ | -------- |
| name           | String | ✅        |
| email          | String | ✅        |
| password       | String | ✅        |
| photoIdType    | String | ✅        |
| photoIdNumber  | String | ✅        |
| profilePicture | File   | ❌        |

Example

```
name=Aditya
email=aditya@gmail.com
password=Password@123
photoIdType=AADHAR
photoIdNumber=123456789012
profilePicture=<image>
```

---

## Login

**POST** `/auth/login`

```json
{
    "email":"aditya@gmail.com",
    "password":"Password@123"
}
```

---

## Get Profile

**GET** `/auth/profile`

Authorization

```
Bearer <JWT_TOKEN>
```

---

# Sports

## Create Sport

**POST** `/sports`

Authorization

```
Bearer <ADMIN_TOKEN>
```

Content-Type

```
multipart/form-data
```

Fields

```
name=Football

image=<file>
```

---

## Get All Sports

**GET**

```
/sports
```

---

## Get Sport

**GET**

```
/sports/:id
```

---

## Update Sport

**PUT**

```
/sports/:id
```

Content-Type

```
multipart/form-data
```

Fields

```
name=Football Updated

image=<optional file>
```

---

## Delete Sport

**DELETE**

```
/sports/:id
```

---

# Teams

## Create Team

**POST**

```
/teams
```

Authorization

```
Bearer <TOKEN>
```

Content-Type

```
multipart/form-data
```

Fields

```
name=Code Warriors

sportId=1

logo=<optional image>
```

---

## Add Member

**POST**

```
/teams/:teamId/members
```

```json
{
    "userId":2
}
```

---

## Remove Member

**DELETE**

```
/teams/:teamId/members/:userId
```

---

## My Teams

**GET**

```
/teams/my
```

---

## Team Details

**GET**

```
/teams/:id
```

---

# Facilities

## Create Facility

**POST**

```
/facilities
```

Authorization

```
Bearer <ADMIN_TOKEN>
```

Content-Type

```
multipart/form-data
```

Fields

```
name=Football Turf A

sportId=1

description=Premium Turf

location=Sector 62

openingTime=06:00

closingTime=22:00

pricePerHour=1200

maxBookingHours=4

image=<file>
```

---

## Get Facilities

**GET**

```
/facilities
```

Optional Query

```
?sportId=1
```

---

## Facility Details

**GET**

```
/facilities/:id
```

---

## Availability

**GET**

```
/facilities/:id/availability?date=2026-07-01
```

---

# Bookings

## Create Booking

**POST**

```
/bookings
```

Authorization

```
Bearer <TOKEN>
```

### Individual Booking

```json
{
    "facilityId":1,
    "bookingDate":"2026-07-01",
    "startTime":"18:00",
    "duration":2
}
```

### Team Booking

```json
{
    "facilityId":1,
    "teamId":1,
    "bookingDate":"2026-07-01",
    "startTime":"18:00",
    "duration":2
}
```

Response

```json
{
    "bookingId":15,
    "totalAmount":2400
}
```

---

## My Bookings

**GET**

```
/bookings/my
```

---

# Payments

## Create Razorpay Order

**POST**

```
/payments/create-order
```

Authorization

```
Bearer <TOKEN>
```

```json
{
    "bookingId":15,
    "amount":2400
}
```

---

## Verify Payment

**POST**

```
/payments/verify
```

Authorization

```
Bearer <TOKEN>
```

```json
{
    "razorpay_order_id":"order_xxxxx",

    "razorpay_payment_id":"pay_xxxxx",

    "razorpay_signature":"signature"
}
```

---

# Admin

Authorization Required

```
Bearer <ADMIN_TOKEN>
```

---

## Dashboard

**GET**

```
/admin/dashboard
```

---

## Users

**GET**

```
/admin/users
```

---

## Teams

**GET**

```
/admin/teams
```

---

## Bookings

**GET**

```
/admin/bookings
```

---

## Revenue Analytics

**GET**

```
/admin/revenue
```

---

# Status Codes

| Status | Meaning               |
| ------ | --------------------- |
| 200    | Success               |
| 201    | Created               |
| 400    | Validation Error      |
| 401    | Unauthorized          |
| 403    | Forbidden             |
| 404    | Resource Not Found    |
| 500    | Internal Server Error |

---

# Default Credentials

## Admin

```
Email:
admin@sportsbook.com

Password:
Admin@123
```

---

## Demo User

```
Email:
user@example.com

Password:
User@123
```

---

# Project Flow

```
Register/Login
        │
        ▼
Browse Sports
        │
        ▼
Browse Facilities
        │
        ▼
Check Availability
        │
        ▼
Create Booking
        │
        ▼
Create Razorpay Order
        │
        ▼
Payment
        │
        ▼
Verify Payment
        │
        ▼
Booking Confirmed
```
