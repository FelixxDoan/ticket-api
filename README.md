# 🎫 Support Ticket API

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express-API-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/JWT-Auth-orange)
![Swagger](https://img.shields.io/badge/Swagger-Docs-brightgreen)
![Docker](https://img.shields.io/badge/Docker-Container-blue)
![Vitest](https://img.shields.io/badge/Vitest-Testing-yellow)

A backend API for managing customer support tickets with authentication, role-based access control, ticket assignment, status updates, comments, Swagger documentation, and Docker support.

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

## ▶️ Local Setup

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
Create a `.env` file based on the example below.

### 4. Make sure MongoDB is running
You need a running MongoDB instance before starting the API.

### 5. Seed demo data
```bash
npm run seed
```

### 6. Start development server
```bash
npm run dev
```

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

## 🌱 Seed Data

This project includes seeded demo data for local development, API exploration, and role-based testing.

### Seeded Accounts
- `admin1@gmail.com` / `123123`
- `admin2@gmail.com` / `123123`
- `staff1@gmail.com` / `123123`
- `staff2@gmail.com` / `123123`
- `customer1@gmail.com` / `123123`
- `customer2@gmail.com` / `123123`

### Seeded Tickets
- `TCK-1001` → `open`
- `TCK-1002` → `assigned`
- `TCK-1003` → `in_progress`
- `TCK-1004` → `resolved`
- `TCK-1005` → `closed`
- `TCK-1006` → `cancelled`

### Seeded Comments
- public comments
- internal comments
- customer replies
- staff/admin replies

## 🧭 Demo Scenarios

Use the seeded accounts and tickets below to quickly understand the system workflow without needing to explore every endpoint manually.

### Business Case 1 — Customer creates and tracks a ticket

**Goal:** understand the customer-side experience.

#### Flow
1. Log in as `customer1@gmail.com`
2. Open the ticket list
3. View tickets created by this customer
4. Open ticket `TCK-1001`
5. Add a comment to the ticket

#### What this demonstrates
- customers can log in
- customers can access their own tickets
- customers can participate through comments

#### Expected result
- the ticket detail is accessible
- the comment is created successfully
- the ticket remains visible to the same customer

### Business Case 2 — Customer cannot access another customer's ticket

**Goal:** verify access control.

#### Flow
1. Log in as `customer1@gmail.com`
2. Try to open a ticket created by `customer2@gmail.com`
3. For example, try ticket `TCK-1003` or `TCK-1004`

#### What this demonstrates
- role-based access control
- ownership-based ticket visibility

#### Expected result
- request is rejected
- customer cannot read another customer's ticket

### Business Case 3 — Admin assigns a ticket to staff

**Goal:** show admin workflow.

#### Flow
1. Log in as `admin1@gmail.com`
2. Open ticket `TCK-1001`
3. Assign the ticket to `staff1@gmail.com`

#### What this demonstrates
- admin can manage ticket workflow
- admin can assign responsibility to staff

#### Expected result
- ticket is updated successfully
- `assignedTo` now points to `staff1`

### Business Case 4 — Staff processes a ticket

**Goal:** show the staff handling flow.

#### Flow
1. Log in as `staff1@gmail.com`
2. Open ticket `TCK-1002`
3. Update status from `assigned` to `in_progress`
4. Add a comment explaining the progress

#### What this demonstrates
- staff can work on assigned tickets
- staff can update ticket progress
- staff can communicate through comments

#### Expected result
- status is updated successfully
- new comment appears in the ticket conversation

### Business Case 5 — Review completed and inactive ticket states

**Goal:** show that the system supports multiple lifecycle stages.

#### Flow
1. Log in as `admin1@gmail.com` or `staff1@gmail.com`
2. Open:
   - `TCK-1004` for `resolved`
   - `TCK-1005` for `closed`
   - `TCK-1006` for `cancelled`

#### What this demonstrates
- ticket lifecycle is not limited to create/update only
- the system supports end-state visibility

#### Expected result
- different seeded statuses are visible
- reviewer can understand the overall workflow quickly

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

## 📝 Notes

- Protected routes require a Bearer token
- MongoDB connection is required before the server starts
- Demo scenarios are designed to help reviewers understand the project quickly
- Swagger: `http://localhost:3000/api-docs`
- Health check: `http://localhost:3000/healthz`
- This project is designed for portfolio and backend handover practice
