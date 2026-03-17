# Full Stack Authentication & Role-Based Access Control (RBAC) System

A full-stack web application demonstrating JWT-based authentication and Role-Based Access Control (RBAC) using a Java Spring Boot backend and a React + TypeScript frontend.

---

## 📌 Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [How It Works](#how-it-works)
- [Screenshots](#screenshots)

---

## 🧭 Overview

This project implements a complete authentication system where:
- Users can **register** with a name, email, password, and role
- Users can **login** and receive a JWT token
- The JWT token is used for all protected API calls
- Content is shown or hidden based on the user's role (USER or ADMIN)

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Java 17 | Programming language |
| Spring Boot 3 | Backend framework |
| Spring Security | Authentication & Authorization |
| JWT (jjwt 0.11.5) | Token generation & validation |
| Spring Data JPA + Hibernate | Database ORM |
| H2 Database | In-memory database (dev) |
| MapStruct | DTO mapping |
| Lombok | Boilerplate code reduction |
| Maven | Build tool |
| Swagger / OpenAPI | API documentation |

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type-safe JavaScript |
| Vite | Build tool |
| React Router v6 | Client-side routing |
| React Query | Server state management |
| Axios | HTTP requests |
| React Hook Form | Form handling & validation |
| TailwindCSS | Styling |

---

## 📁 Project Structure
```
auth-rbac-fullstack/
│
├── auth-backend/
│   └── src/main/java/com/example/authbackend/
│       ├── config/
│       │   ├── SecurityConfig.java        # Spring Security + CORS config
│       │   └── SwaggerConfig.java         # OpenAPI / Swagger setup
│       ├── controller/
│       │   ├── AuthController.java        # /api/auth/register, /api/auth/login
│       │   └── ApiController.java         # /api/public, /api/user, /api/admin
│       ├── dto/
│       │   ├── request/
│       │   │   ├── RegisterRequest.java
│       │   │   └── LoginRequest.java
│       │   └── response/
│       │       ├── AuthResponse.java
│       │       └── UserResponse.java
│       ├── entity/
│       │   ├── User.java                  # User JPA entity
│       │   └── Role.java                  # ENUM: USER, ADMIN
│       ├── mapper/
│       │   └── UserMapper.java            # MapStruct mapper
│       ├── repository/
│       │   └── UserRepository.java        # JPA repository
│       ├── security/jwt/
│       │   ├── JwtUtil.java               # JWT generate & validate
│       │   └── JwtFilter.java             # JWT request filter
│       └── service/
│           ├── AuthService.java           # Register & login logic
│           └── UserDetailsServiceImpl.java
│
├── auth-frontend/
│   └── src/
│       ├── api/
│       │   ├── axios.ts                   # Axios instance + JWT interceptor
│       │   └── auth.ts                    # API call functions
│       ├── pages/
│       │   ├── LoginPage.tsx
│       │   ├── RegisterPage.tsx
│       │   └── DashboardPage.tsx
│       ├── routes/
│       │   └── ProtectedRoute.tsx         # Redirect if not logged in
│       ├── types/
│       │   └── index.ts                   # TypeScript interfaces
│       ├── utils/
│       │   └── auth.ts                    # localStorage helpers
│       └── App.tsx                        # Routes setup
│
└── README.md
```

---

## ✨ Features

### Authentication
- ✅ User registration with name, email, password, role
- ✅ User login with email and password
- ✅ JWT token returned on successful login
- ✅ Token attached to all protected API requests
- ✅ Logout clears token from localStorage

### Authorization (RBAC)
- ✅ Two roles: USER and ADMIN
- ✅ `/api/public` — accessible by everyone
- ✅ `/api/user` — accessible by USER and ADMIN
- ✅ `/api/admin` — accessible by ADMIN only

### Frontend
- ✅ Register page with form validation
- ✅ Login page with error handling
- ✅ Protected dashboard route
- ✅ Role-based content rendering
- ✅ USER sees: User Content Card only
- ✅ ADMIN sees: User Content Card + Admin Content Card
- ✅ Loading and error states
- ✅ Responsive UI with TailwindCSS

---

## 🚀 Setup Instructions

### Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 20.19+ or 22.12+
- npm

---

### Backend Setup
```bash
# Navigate to backend folder
cd auth-backend

# Run the application
./mvnw spring-boot:run
# Windows:
.\mvnw spring-boot:run
```

Backend runs on: **http://localhost:8080**

**Swagger UI:** http://localhost:8080/swagger-ui/index.html  
**H2 Console:** http://localhost:8080/h2-console  
- JDBC URL: `jdbc:h2:mem:authdb`  
- Username: `sa`  
- Password: *(leave empty)*

---

### Frontend Setup
```bash
# Navigate to frontend folder
cd auth-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

## 📡 API Endpoints

### Auth Endpoints (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

#### Register Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "USER"
}
```

#### Login Request Body
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

#### Auth Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "role": "USER",
  "name": "John Doe"
}
```

---

### Protected Endpoints

| Method | Endpoint | Role Required |
|--------|----------|---------------|
| GET | `/api/public` | None (public) |
| GET | `/api/user` | USER or ADMIN |
| GET | `/api/admin` | ADMIN only |

All protected requests require header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 How It Works

### JWT Flow
```
1. User registers / logs in
2. Backend validates credentials
3. Backend generates JWT token (contains email + role)
4. Frontend stores token in localStorage
5. Every API request includes: Authorization: Bearer <token>
6. JwtFilter intercepts request, validates token
7. Sets Spring Security context with user + role
8. Endpoint allows or denies based on role
```

### Role-Based UI
```
USER logs in  → sees User Content Card only
ADMIN logs in → sees User Content Card + Admin Content Card
```

---

## 🧪 Testing the App

1. Start backend: `.\mvnw spring-boot:run`
2. Start frontend: `npm run dev`
3. Open http://localhost:5173
4. Register as USER → verify only User card visible
5. Logout → register as ADMIN → verify both cards visible
6. Try accessing /dashboard without login → redirected to /login
7. Test APIs directly at http://localhost:8080/swagger-ui/index.html
