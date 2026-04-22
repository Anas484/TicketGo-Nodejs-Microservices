# TicketGo-Nodejs-Microservices

This is a monorepo for the TicketGo application, which is a ticket booking system built using Node.js microservices architecture.

## Services
- **user-service**: User management service
- **event-service**: Event management service
- **booking-service**: Booking management service
- **api-gateway-service**: API gateway service

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v13 or higher)
- **Redis** (v6 or higher)
- **RabbitMQ** (v3.9 or higher)
- **Git**

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/TicketGo-Nodejs-Microservices.git
cd TicketGo-Nodejs-Microservices
```

### 2. Install Dependencies

Navigate to each service directory and install dependencies:

```bash
# Install dependencies for all services
npm install

# Or install individually for each service
cd user-service && npm install
cd ../event-service && npm install
cd ../booking-service && npm install
cd ../api-gateway-service && npm install
```

### 3. Environment Configuration

Each service requires environment variables. Create `.env` files in each service directory:

#### User Service (`user-service/.env`)
```env
PORT=3001
DATABASE_URL="postgresql://username:password@localhost:5432/ticketgo_users"
JWT_SECRET="your-jwt-secret-key"
RABBITMQ_URL="amqp://localhost:5672"
```

#### Event Service (`event-service/.env`)
```env
PORT=3002
DATABASE_URL="postgresql://username:password@localhost:5432/ticketgo_events"
JWT_SECRET="your-jwt-secret-key"
REDIS_URL="redis://localhost:6379"
```

#### Booking Service (`booking-service/.env`)
```env
PORT=3003
DATABASE_URL="postgresql://username:password@localhost:5432/ticketgo_bookings"
JWT_SECRET="your-jwt-secret-key"
RABBITMQ_URL="amqp://localhost:5672"
REDIS_URL="redis://localhost:6379"
```

#### API Gateway (`api-gateway-service/.env`)
```env
PORT=3000
USER_SERVICE_URL="http://localhost:3001"
EVENT_SERVICE_URL="http://localhost:3002"
BOOKING_SERVICE_URL="http://localhost:3003"
```

### 4. Database Setup

Create databases for each service:

```sql
-- Connect to PostgreSQL and run these commands
CREATE DATABASE ticketgo_users;
CREATE DATABASE ticketgo_events;
CREATE DATABASE ticketgo_bookings;
```

Run database migrations (if using Prisma):

```bash
# For each service that uses Prisma
cd user-service && npx prisma migrate dev
cd ../event-service && npx prisma migrate dev
cd ../booking-service && npx prisma migrate dev
```

### 5. Start External Services

Ensure PostgreSQL, Redis, and RabbitMQ are running:

```bash
# Start PostgreSQL (service-specific commands vary by OS)
# Start Redis
redis-server

# Start RabbitMQ (service-specific commands vary by OS)
```

### 6. Run the Application

Start all services:

```bash
# Option 1: Run each service individually
cd user-service && npm start
cd ../event-service && npm start
cd ../booking-service && npm start
cd ../api-gateway-service && npm start

# Option 2: Use concurrent processes (recommended for development)
npm install -g concurrently
concurrently "npm run start:user" "npm run start:event" "npm run start:booking" "npm run start:gateway"
```

Add these scripts to your root `package.json` for easier development:

```json
{
  "scripts": {
    "start:user": "cd user-service && npm start",
    "start:event": "cd event-service && npm start",
    "start:booking": "cd booking-service && npm start",
    "start:gateway": "cd api-gateway-service && npm start",
    "dev": "concurrently \"npm run start:user\" \"npm run start:event\" \"npm run start:booking\" \"npm run start:gateway\""
  }
}
```

## API Endpoints

Once all services are running, you can access:

- **API Gateway**: http://localhost:3000
- **User Service**: http://localhost:3001
- **Event Service**: http://localhost:3002
- **Booking Service**: http://localhost:3003

## Development Workflow

1. Make changes to individual services
2. Test services independently
3. Use the API Gateway to test integrated functionality
4. Commit changes with descriptive messages
5. Push to your GitHub repository

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

