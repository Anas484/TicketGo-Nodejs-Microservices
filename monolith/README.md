# TicketGo Monolith Service

A comprehensive ticket booking system built with Node.js, Express, TypeScript, and Prisma ORM. This monolithic service handles user authentication, event management, seat booking, and administrative operations.

## 🚀 Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Event Management**: Create, view, and search events
- **Seat Booking**: Book seats for events with real-time availability checking
- **Role-Based Access Control**: User and admin roles with appropriate permissions
- **Database Integration**: PostgreSQL with Prisma ORM
- **Input Validation**: Zod schemas for robust data validation

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: Zod
- **Cache**: Redis (optional, currently commented out)

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Redis (optional, for caching)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/ticketgo"
PORT=3000
JWT_SECRET="your-jwt-secret-key"
REDIS_URL="redis://localhost:6379" # Optional
```

### 3. Database Setup

Generate Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Start the Server

```bash
npm run dev
```

The server will start on `http://localhost:3000` (or your configured PORT).

## 📁 Project Structure

```
monolith/
├── src/
│   ├── controllers/         # Business logic handlers
│   │   ├── AuthController.ts
│   │   ├── UserController.ts
│   │   └── AdminController.ts
│   ├── routes/              # API route definitions
│   │   ├── AuthRouter.ts
│   │   ├── UserRouter.ts
│   │   └── AdminRouter.ts
│   ├── middlewares/         # Express middleware
│   │   ├── JwtFilterMiddleware.ts
│   │   └── RoleAccessMiddleware.ts
│   ├── utils/               # Utility functions
│   │   ├── JwtUtil.ts
│   │   ├── BookingUtils.ts
│   │   ├── PrismaConn.ts
│   │   └── Mapper.ts
│   ├── interfaces/          # TypeScript interfaces
│   ├── zod/                # Zod validation schemas
│   └── index.ts            # Application entry point
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
├── dist/                   # Compiled JavaScript output
├── package.json
└── README.md
```

## 🗄️ Database Schema

The application uses the following main entities:

- **User**: Stores user information with role-based access
- **Event**: Contains event details (name, description, date, location, capacity)
- **Seat**: Individual seats for events with pricing and availability
- **Booking**: User bookings linking users to events and seats

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control (user/admin)
- Protected routes require valid JWT tokens
- Password hashing with bcrypt

## 📝 API Endpoints

### Authentication Routes (`/auth`)
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login

### User Routes (`/user`) - JWT Required
- `GET /user/events` - Get all events
- `GET /user/events/search?q=query` - Search events by name
- `POST /user/bookings` - Create a booking
- `GET /user/me` - Get user details
- `GET /user/me/bookings` - Get user's bookings

### Admin Routes (`/admin`) - Admin Role Required
- `GET /admin/users` - Get all users
- `GET /admin/users/:id` - Get user by ID
- `GET /admin/events` - Get all events
- `POST /admin/events` - Create new event
- `PATCH /admin/events/:id` - Update event
- `DELETE /admin/events/:id` - Delete event
- `GET /admin/bookings` - Get all bookings
- `GET /admin/bookings/:id` - Get booking by ID
- `DELETE /admin/bookings/:id` - Delete booking
- `GET /admin/generate-seats/:id` - Generate seats for event
- `GET /admin/seats/:id` - Get all seats for event

## 🧪 Development

### Running in Development Mode

```bash
npm run dev
```

### Database Operations

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# View database
npx prisma studio
```

### Building for Production

```bash
npm run build
```

## 🔧 Configuration

The application uses environment variables for configuration:

- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Server port (default: 3000)
- `JWT_SECRET`: Secret key for JWT signing
- `REDIS_URL`: Redis connection URL (optional)

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**: Ensure PostgreSQL is running and DATABASE_URL is correct
2. **JWT Token Issues**: Verify JWT_SECRET is set in environment
3. **Migration Errors**: Run `npx prisma migrate dev` to ensure schema is up to date
4. **Port Already in Use**: Change PORT in environment or stop conflicting services

### Logging

The application logs errors to console. For production, consider implementing a proper logging solution.

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For issues and questions, please create an issue in the repository.
