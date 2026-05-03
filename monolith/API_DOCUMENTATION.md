# TicketGo Monolith API Documentation

## Overview

This document provides comprehensive API documentation for the TicketGo monolith service. The API follows RESTful conventions and uses JWT-based authentication with role-based access control.

**Base URL**: `http://localhost:3000`

## Authentication

The API uses JSON Web Tokens (JWT) for authentication. Include the token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

### Getting a Token

1. **Signup**: `POST /auth/signup`
2. **Login**: `POST /auth/login`

Both endpoints return a JWT token that must be used for authenticated requests.

## API Endpoints

---

## 🔐 Authentication Endpoints

### POST /auth/signup

Register a new user account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "role": "user" // or "admin"
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "role": "user"
}
```

**Error Responses:**
- `400`: All fields are required
- `400`: User already exists
- `500`: Internal server error

---

### POST /auth/login

Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "message": "User logged in successfully",
  "id": 1,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400`: Email and password are required
- `400`: User not found
- `400`: Invalid password
- `500`: Internal server error

---

## 👤 User Endpoints (Authentication Required)

### GET /user/events

Get all available events.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Summer Concert",
      "description": "Amazing summer music festival",
      "date": "2024-07-15T00:00:00.000Z",
      "location": "Central Park",
      "capacity": 1000,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401`: Unauthorized (invalid/missing token)
- `403`: Forbidden (insufficient permissions)
- `500`: Internal server error

---

### GET /user/events/search

Search events by name (case-insensitive).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `q` (required): Search query string

**Example:** `/user/events/search?q=concert`

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Summer Concert",
      "description": "Amazing summer music festival",
      "date": "2024-07-15T00:00:00.000Z",
      "location": "Central Park",
      "capacity": 1000,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### POST /user/bookings

Create a new booking for seats at an event.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "eventId": 1,
  "seatNumbers": ["A1", "A2", "B1"]
}
```

**Response (200):**
```json
{
  "data": {
    "id": 123,
    "userId": 1,
    "eventId": 1,
    "seatNumbers": ["A1", "A2", "B1"],
    "totalPrice": 150.00
  }
}
```

**Error Responses:**
- `400`: Invalid request format
- `400`: Some seats are not available
- `500`: Internal server error

---

### GET /user/me

Get current user's details.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `404`: User not found
- `500`: Internal server error

---

### GET /user/me/bookings

Get all bookings for the current user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "data": [
    {
      "id": 123,
      "userId": 1,
      "eventId": 1,
      "seatNumbers": ["A1", "A2", "B1"],
      "totalPrice": 150.00
    }
  ]
}
```

---

## 🛡️ Admin Endpoints (Admin Role Required)

All admin endpoints require:
1. Valid JWT token
2. Admin role privileges

### User Management

#### GET /admin/users

Get all users in the system.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "role": "user",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### GET /admin/users/:id

Get a specific user by ID.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Path Parameters:**
- `id`: User ID

**Response (200):**
```json
{
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Event Management

#### GET /admin/events

Get all events (admin view).

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Summer Concert",
      "description": "Amazing summer music festival",
      "date": "2024-07-15T00:00:00.000Z",
      "location": "Central Park",
      "capacity": 1000,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### POST /admin/events

Create a new event.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "name": "Winter Festival",
  "description": "Annual winter celebration",
  "date": "2024-12-20T00:00:00.000Z",
  "location": "City Square",
  "capacity": 500
}
```

**Response (201):**
```json
{
  "data": {
    "id": 2,
    "name": "Winter Festival",
    "description": "Annual winter celebration",
    "date": "2024-12-20T00:00:00.000Z",
    "location": "City Square",
    "capacity": 500,
    "createdAt": "2024-01-02T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

---

#### PATCH /admin/events/:id

Update an existing event.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Path Parameters:**
- `id`: Event ID

**Request Body:**
```json
{
  "name": "Updated Winter Festival",
  "capacity": 600
}
```

**Response (200):**
```json
{
  "data": {
    "id": 2,
    "name": "Updated Winter Festival",
    "description": "Annual winter celebration",
    "date": "2024-12-20T00:00:00.000Z",
    "location": "City Square",
    "capacity": 600,
    "createdAt": "2024-01-02T00:00:00.000Z",
    "updatedAt": "2024-01-03T00:00:00.000Z"
  }
}
```

---

#### DELETE /admin/events/:id

Delete an event.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Path Parameters:**
- `id`: Event ID

**Response (200):**
```json
{
  "message": "Event deleted successfully"
}
```

---

### Booking Management

#### GET /admin/bookings

Get all bookings in the system.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response (200):**
```json
{
  "data": [
    {
      "id": 123,
      "userId": 1,
      "eventId": 1,
      "seatNumbers": ["A1", "A2", "B1"],
      "totalPrice": 150.00
    }
  ]
}
```

---

#### GET /admin/bookings/:id

Get a specific booking by ID.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Path Parameters:**
- `id`: Booking ID

**Response (200):**
```json
{
  "data": {
    "id": 123,
    "userId": 1,
    "eventId": 1,
    "seatNumbers": ["A1", "A2", "B1"],
    "totalPrice": 150.00
  }
}
```

---

#### DELETE /admin/bookings/:id

Delete a booking.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Path Parameters:**
- `id`: Booking ID

**Response (200):**
```json
{
  "message": "Booking deleted successfully"
}
```

---

### Seat Management

#### GET /admin/generate-seats/:id

Generate seats for an event.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Path Parameters:**
- `id`: Event ID

**Response (200):**
```json
{
  "message": "Seats generated successfully",
  "data": [
    {
      "id": 1,
      "eventId": 1,
      "seatNumber": "A1",
      "price": 50.00,
      "isAvailable": true
    }
  ]
}
```

---

#### GET /admin/seats/:id

Get all seats for a specific event.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Path Parameters:**
- `id`: Event ID

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "eventId": 1,
      "seatNumber": "A1",
      "price": 50.00,
      "isAvailable": true
    },
    {
      "id": 2,
      "eventId": 1,
      "seatNumber": "A2",
      "price": 50.00,
      "isAvailable": false
    }
  ]
}
```

---

## 🚨 Error Handling

### Standard Error Response Format

```json
{
  "message": "Error description"
}
```

### Common HTTP Status Codes

- `200`: OK - Request successful
- `201`: Created - Resource created successfully
- `400`: Bad Request - Invalid request data
- `401`: Unauthorized - Authentication required
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource not found
- `500`: Internal Server Error - Server error

---

## 🔒 Security Considerations

1. **JWT Tokens**: Store tokens securely on the client side
2. **Password Security**: Passwords are hashed using bcrypt
3. **Input Validation**: All inputs are validated using Zod schemas
4. **Role-Based Access**: Admin endpoints require admin role
5. **HTTPS**: Use HTTPS in production environments

---

## 📝 Examples

### Complete User Flow

```bash
# 1. Signup
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alice",
    "lastName": "Smith", 
    "email": "alice@example.com",
    "password": "password123",
    "role": "user"
  }'

# 2. Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "password123"
  }'

# 3. Get events (with token)
curl -X GET http://localhost:3000/user/events \
  -H "Authorization: Bearer <token>"

# 4. Book seats
curl -X POST http://localhost:3000/user/bookings \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": 1,
    "seatNumbers": ["A1", "A2"]
  }'
```

### Admin Event Creation

```bash
# Create admin user first, then:
curl -X POST http://localhost:3000/admin/events \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Conference 2024",
    "description": "Annual technology conference",
    "date": "2024-09-15T00:00:00.000Z",
    "location": "Convention Center",
    "capacity": 2000
  }'
```

---

## 🧪 Testing

Use tools like Postman, Insomnia, or curl to test the API endpoints. Ensure you have a valid JWT token for authenticated requests.

---

## 📞 Support

For API-related issues or questions, please refer to the project repository or contact the development team.
