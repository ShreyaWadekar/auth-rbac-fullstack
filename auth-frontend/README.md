# Full Stack Authentication & RBAC System

A full-stack web application with JWT-based authentication and Role-Based Access Control.

## Tech Stack

### Backend
- Java 17 + Spring Boot 3
- Spring Security + JWT
- Spring Data JPA + H2 Database
- MapStruct + Lombok
- Swagger / OpenAPI

### Frontend
- React + TypeScript
- Vite
- React Router
- React Query
- Axios
- React Hook Form
- TailwindCSS

## Setup Instructions

### Backend
```bash
cd auth-backend
./mvnw spring-boot:run
```
Runs on: http://localhost:8080  
Swagger UI: http://localhost:8080/swagger-ui/index.html

### Frontend
```bash
cd auth-frontend
npm install
npm run dev
```
Runs on: http://localhost:5173

## Features
- User Registration with role selection (USER / ADMIN)
- JWT Login and protected API calls
- Protected frontend routes
- Role-based UI — Admin sees extra content
- Logout functionality
- Swagger API documentation

## API Endpoints

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/public | Public |
| GET | /api/user | USER + ADMIN |
| GET | /api/admin | ADMIN only |