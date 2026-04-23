# TicketGo API Documentation

This document provides comprehensive information about all API endpoints across the TicketGo microservices architecture.

## Base URL

All API requests should be made through the API Gateway:

```
http://localhost:3000
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## User Service (Port 3001)

### Authentication Endpoints

#### Register User
**Endpoint:** `POST /users/auth/register`

**Description:** Register a new user account

**Authentication:** Not required

**Request Body:**
```json
{
  "firstName": "string (required)",
  "lastName": "string (required)",
  "email": "string (required, unique)",
  "password": "string (required)",
  "role": "string (optional, default: 'User')"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "role": "User"
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "Name, email and password are required"
}
```

---

#### Login User
**Endpoint:** `POST /users/auth/login`

**Description:** Authenticate user and receive JWT token

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "email": "john@example.com"
  },
  "token": "jwt-token-string"
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "Email and password are required"
}
```

---

### User Endpoints (Authenticated)

#### Get Current User Details
**Endpoint:** `GET /users`

**Description:** Get details of the currently authenticated user

**Authentication:** Required (Roles: Admin, User)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "User"
  }
}
```

---

#### Book Ticket
**Endpoint:** `POST /users/book`

**Description:** Book tickets for an event (sends booking request to queue)

**Authentication:** Required (Roles: Admin, User)

**Request Body:**
```json
{
  "event_id": "number (required)",
  "seats": "array of strings (required, e.g., ['A1', 'A2'])"
}
```

**Response (200 OK):**
```json
{
  "message": "sent the booking data"
}
```

---

### Admin Endpoints (Admin Only)

#### Get All Users
**Endpoint:** `GET /users/admin`

**Description:** Retrieve all users in the system

**Authentication:** Required (Role: Admin only)

**Response (200 OK):**
```json
{
  "users": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "User"
    }
  ]
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "No users found"
}
```

---

#### Get User by ID
**Endpoint:** `GET /users/admin/:id`

**Description:** Retrieve a specific user by their ID

**Authentication:** Required (Role: Admin only)

**URL Parameters:**
- `id` (number, required): User ID

**Response (200 OK):**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "role": "User"
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "User not found"
}
```

---

#### Update User
**Endpoint:** `PUT /users/admin/:id`

**Description:** Update user information

**Authentication:** Required (Role: Admin only)

**URL Parameters:**
- `id` (number, required): User ID

**Request Body:** (any user field can be updated)
```json
{
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "email": "string (optional)",
  "role": "string (optional)"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "role": "Admin"
}
```

---

#### Delete User
**Endpoint:** `DELETE /users/admin/:id`

**Description:** Delete a user from the system

**Authentication:** Required (Role: Admin only)

**URL Parameters:**
- `id` (number, required): User ID

**Response (200 OK):**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "role": "User"
}
```

---

## Event Service (Port 3002)

### Admin Event Endpoints (Admin Only)

#### Get All Events
**Endpoint:** `GET /events/admin`

**Description:** Retrieve all events in the system

**Authentication:** Required (Role: Admin only)

**Response (200 OK):**
```json
{
  "events": [
    {
      "id": 1,
      "name": "Concert",
      "performers": ["Artist1", "Artist2"],
      "description": "Event description",
      "startTime": "2024-01-01T10:00:00.000Z",
      "endTime": "2024-01-01T12:00:00.000Z",
      "location": "Venue Name",
      "date": "2024-01-01T00:00:00.000Z",
      "capacity": 100
    }
  ]
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "No events found"
}
```

---

#### Get Event by ID
**Endpoint:** `GET /events/admin/:id`

**Description:** Retrieve a specific event by its ID

**Authentication:** Required (Role: Admin only)

**URL Parameters:**
- `id` (number, required): Event ID

**Response (200 OK):**
```json
{
  "event": {
    "id": 1,
    "name": "Concert",
    "performers": ["Artist1", "Artist2"],
    "description": "Event description",
    "startTime": "2024-01-01T10:00:00.000Z",
    "endTime": "2024-01-01T12:00:00.000Z",
    "location": "Venue Name",
    "date": "2024-01-01T00:00:00.000Z",
    "capacity": 100
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "Event not found"
}
```

---

#### Create Event
**Endpoint:** `POST /events/admin`

**Description:** Create a new event

**Authentication:** Required (Role: Admin only)

**Request Body:**
```json
{
  "name": "string (required)",
  "performers": "array (required)",
  "description": "string (required)",
  "startTime": "string (required, ISO date)",
  "endTime": "string (required, ISO date)",
  "location": "string (required)",
  "date": "string (required, ISO date)",
  "capacity": "number (required)"
}
```

**Response (201 Created):**
```json
{
  "event": {
    "id": 1,
    "name": "Concert",
    "performers": ["Artist1", "Artist2"],
    "description": "Event description",
    "startTime": "2024-01-01T10:00:00.000Z",
    "endTime": "2024-01-01T12:00:00.000Z",
    "location": "Venue Name",
    "date": "2024-01-01T00:00:00.000Z",
    "capacity": 100
  }
}
```

---

#### Delete Event
**Endpoint:** `DELETE /events/admin/:id`

**Description:** Delete an event from the system

**Authentication:** Required (Role: Admin only)

**URL Parameters:**
- `id` (number, required): Event ID

**Response (200 OK):**
```json
{
  "message": "Deleted event with id : 1"
}
```

---

#### Update Event
**Endpoint:** `PATCH /events/admin/:id`

**Description:** Update event information

**Authentication:** Required (Role: Admin only)

**URL Parameters:**
- `id` (number, required): Event ID

**Request Body:** (any event field can be updated)
```json
{
  "name": "string (optional)",
  "performers": "array (optional)",
  "description": "string (optional)",
  "startTime": "string (optional, ISO date)",
  "endTime": "string (optional, ISO date)",
  "location": "string (optional)",
  "date": "string (optional, ISO date)",
  "capacity": "number (optional)"
}
```

**Response (200 OK):**
```json
{
  "message": "Updated event with id : 1"
}
```

---

### Seat Endpoints

#### Generate Seats for Event
**Endpoint:** `POST /seats/admin/generate-seats/:id`

**Description:** Generate seats for a specific event

**Authentication:** Required (Role: Admin only)

**URL Parameters:**
- `id` (number, required): Event ID

**Request Body:**
```json
{
  "seatsPerRow": "number (optional, default: 10)"
}
```

**Response (201 Created):**
```json
{
  "result": {
    "count": 100
  }
}
```

**Note:** 
- Seats are generated based on the event's capacity
- Seat numbering follows row-letter + seat-number pattern (e.g., A1, A2, B1, B2)
- Pricing is tiered by row:
  - Row A (VIP): $100
  - Row B: $80
  - Row C: $60
  - Other rows: $40

---

#### Get Seats by Event ID
**Endpoint:** `GET /seats/:id`

**Description:** Retrieve all seats for a specific event

**Authentication:** Not required

**URL Parameters:**
- `id` (number, required): Event ID

**Response (200 OK):**
```json
{
  "seats": [
    {
      "seat_number": "A1",
      "price": 100,
      "is_available": true
    },
    {
      "seat_number": "A2",
      "price": 100,
      "is_available": false
    }
  ]
}
```

---

## Booking Service (Port 3003)

### Admin Booking Endpoints (Admin Only)

#### Get All Bookings
**Endpoint:** `GET /bookings/admin`

**Description:** Retrieve all bookings in the system

**Authentication:** Required (Role: Admin only)

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "userId": 1,
      "eventId": 1,
      "seats": ["A1", "A2"],
      "createdAt": "2024-01-01T10:00:00.000Z",
      "updatedAt": "2024-01-01T10:00:00.000Z"
    }
  ]
}
```

**Error Response (200 OK):**
```json
{
  "message": "No Bookings found"
}
```

---

#### Get Booking by ID
**Endpoint:** `GET /bookings/admin/:id`

**Description:** Retrieve a specific booking by its ID

**Authentication:** Required (Role: Admin only)

**URL Parameters:**
- `id` (number, required): Booking ID

**Response (200 OK):**
```json
{
  "id": 1,
  "userId": 1,
  "eventId": 1,
  "seats": ["A1", "A2"],
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T10:00:00.000Z"
}
```

**Error Response (200 OK):**
```json
{
  "message": "No Bookings found with 1 found"
}
```

---

## Booking Process Flow

The booking process uses asynchronous messaging via RabbitMQ:

1. **User requests booking** via `POST /users/book`
2. **Message is queued** in RabbitMQ (queue: `seat_booked`)
3. **Booking service consumes** the message
4. **Redis locks seats** temporarily (5-minute lock)
5. **Booking is created** in the database
6. **Confirmation** is sent to the user

**Note:** The booking process is asynchronous, so the initial request returns immediately with a confirmation message that the booking data has been sent.

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "message": "Error message describing the issue"
}
```

### 401 Unauthorized
```json
{
  "message": "Authentication required or invalid token"
}
```

### 403 Forbidden
```json
{
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## Rate Limiting

- Redis is used for session management and rate limiting
- Seat locks expire after 5 minutes (300 seconds)
- Concurrent booking attempts are handled through Redis locks

---

## Data Models

### User Model
```json
{
  "id": "number (auto-increment)",
  "firstName": "string",
  "lastName": "string",
  "email": "string (unique)",
  "password": "string (hashed)",
  "role": "string (default: 'User')",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Event Model
```json
{
  "id": "number (auto-increment)",
  "name": "string",
  "performers": "json (array)",
  "description": "string",
  "startTime": "datetime",
  "endTime": "datetime",
  "location": "string",
  "date": "datetime",
  "capacity": "number"
}
```

### Seat Model
```json
{
  "id": "number (auto-increment)",
  "event_id": "number (foreign key)",
  "seat_number": "string",
  "price": "decimal",
  "is_available": "boolean",
  "created_at": "datetime"
}
```

### Booking Model
```json
{
  "id": "number (auto-increment)",
  "userId": "number",
  "eventId": "number",
  "seats": "array of strings",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

---

## Testing the API

### Using cURL

**Register a user:**
```bash
curl -X POST http://localhost:3000/users/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/users/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get all events (with token):**
```bash
curl -X GET http://localhost:3000/events/admin \
  -H "Authorization: Bearer <your-jwt-token>"
```

**Book tickets:**
```bash
curl -X POST http://localhost:3000/users/book \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "event_id": 1,
    "seats": ["A1", "A2"]
  }'
```

---

## Notes

- All datetime fields should be in ISO 8601 format
- The API Gateway routes requests to the appropriate microservice
- Role-based access control is enforced at the service level
- Async operations (booking) use RabbitMQ for message queuing
- Redis is used for caching and seat locking to prevent double bookings
- Each service has its own PostgreSQL database following the database-per-service pattern
