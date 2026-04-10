# Support Ticket API

A backend API for managing customer support tickets with authentication, role-based access control, ticket assignment, status updates, comments, Swagger documentation, and Docker support.

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Swagger OpenAPI
- Morgan
- Docker / Docker Compose
- Vitest + Supertest

## Project Overview

This project helps teams manage customer support requests through a simple ticket workflow.

Main capabilities:
- users can register and log in
- customers can create tickets
- staff and admin can view and manage tickets
- admin can assign tickets to staff
- staff/admin can update ticket status
- users can add comments to tickets
- API documentation is available through Swagger

## Main Features

- User registration and login
- JWT-based authentication
- Role-based access control
- Customer ticket creation
- Ticket listing and detail view
- Ticket assignment
- Ticket status update
- Ticket comments
- Health check endpoint
- Swagger API docs
- Dockerized local setup
- Basic automated tests

## Roles

### Customer
- register / login
- create tickets
- view own tickets
- comment on tickets

### Staff
- view tickets
- update ticket status
- comment on tickets

### Admin
- view tickets
- assign tickets to staff
- manage ticket workflow

## Project Structure

```bash
.
├── scripts/
├── src/
│   ├── common/
│   ├── config/
│   ├── docs/
│   └── modules/
│       ├── auth/
│       ├── comments/
│       ├── tickets/
│       └── users/
├── tests/
├── Dockerfile
├── docker-compose.yml
├── package.json
└── vitest.config.js
```

## API Overview

### Auth
- `POST /auth/register`
- `POST /auth/login`

### User
- `GET /user/me`

### Tickets
- `POST /tickets/create`
- `GET /tickets/all`
- `GET /tickets/:id`
- `PATCH /tickets/:id/assign`
- `PATCH /tickets/:id/status`

### Comments
- `GET /tickets/:id/comments`
- `POST /tickets/:id/comments`

### System
- `GET /healthz`
- `GET /api-docs`

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ticket
JWT_SECRET=your_jwt_secret
```

### Variable Description
- `PORT`: application port
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: secret key for JWT signing

## Local Setup

### 1. Clone repository
```bash
git clone https://github.com/FelixxDoan/ticket-api.git
cd ticket-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file based on the example above.

### 4. Make sure MongoDB is running
You need a running MongoDB instance before starting the API.

### 5. Start development server
```bash
npm run dev
```

## Run with Docker

```bash
docker compose up --build
```

## Available Scripts

```bash
npm run dev
npm run seed
npm run test
npm run test:watch
```

## Seed Users

This project includes a seed script for creating predefined test accounts for local authentication and RBAC testing.

### Prerequisites
- MongoDB is running
- `.env` file is configured
- `MONGODB_URI` is set correctly

### Run seed script
```bash
npm run seed
```

## API Documentation

After the server starts, Swagger docs are available at:

```bash
http://localhost:3000/api-docs
```

## Health Check

Health check endpoint:

```bash
http://localhost:3000/healthz
```

## Basic Workflow

1. Register or log in
2. Customer creates a ticket
3. Admin assigns the ticket to a staff member
4. Staff/admin updates ticket status
5. Users communicate through comments

## Notes

- Protected routes require a Bearer token
- MongoDB connection is required before the server starts
- This project is designed for portfolio and backend handover practice
