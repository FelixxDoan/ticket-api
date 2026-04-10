# 🎫 Support Ticket API

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express-API-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/JWT-Auth-orange)
![Swagger](https://img.shields.io/badge/Swagger-Docs-brightgreen)
![Docker](https://img.shields.io/badge/Docker-Container-blue)
![Vitest](https://img.shields.io/badge/Vitest-Testing-yellow)

A backend API for managing customer support tickets with authentication, role-based access control, ticket assignment, status updates, comments, Swagger documentation, and Docker support.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Swagger OpenAPI**
- **Morgan**
- **Docker / Docker Compose**
- **Vitest + Supertest**

## 📌 Project Overview

This project helps teams manage customer support requests through a simple ticket workflow.

### Main capabilities
- 👤 users can register and log in
- 🎟️ customers can create tickets
- 🛠️ staff and admin can view and manage tickets
- 📍 admin can assign tickets to staff
- 🔄 staff/admin can update ticket status
- 💬 users can add comments to tickets
- 📚 API documentation is available through Swagger

## ✨ Main Features

- 🔐 User registration and login
- 🪪 JWT-based authentication
- 👥 Role-based access control
- 📝 Customer ticket creation
- 📂 Ticket listing and detail view
- 👨‍💼 Ticket assignment
- 🔄 Ticket status update
- 💬 Ticket comments
- ❤️ Health check endpoint
- 📘 Swagger API docs
- 🐳 Dockerized local setup
- ✅ Basic automated tests

## 👥 Roles

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

## 🗂️ Project Structure

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

## 🛣️ API Overview

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

## ⚙️ Environment Variables

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

## 🧪 Available Scripts

```bash
npm run dev
npm run seed
npm run test
npm run test:watch
```

## 🐳 Run with Docker

```bash
docker compose up --build
```

## 📚 API Documentation

- Swagger: `http://localhost:3000/api-docs`

## ❤️ Health Check

- Health check: `http://localhost:3000/healthz`

## 🔄 Basic Workflow

```text
Register/Login → Create Ticket → Assign Ticket → Update Status → Comment → Resolve
```

## 📝 Notes

- Protected routes require a Bearer token
- MongoDB connection is required before the server starts
- This project is designed for portfolio and backend handover practice
