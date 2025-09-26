# Task Manager Application

A full-stack task management application built with Spring Boot backend and Angular frontend.

## Overview

This project consists of:
- **Backend**: RESTful API built with Spring Boot, Spring Security, JWT authentication, and H2 database
- **Frontend**: Angular SPA with responsive Bootstrap UI, JWT-based authentication, and route guards

## Architecture

### Backend (Spring Boot)
- **Security**: JWT-based authentication with Spring Security
- **Database**: H2 in-memory database with JPA/Hibernate
- **API**: RESTful endpoints for user authentication and task CRUD operations
- **Logging**: Comprehensive logging using SLF4J/Logback

### Frontend (Angular)
- **Authentication**: JWT token management with HTTP interceptors
- **Routing**: Protected routes with Auth Guards
- **UI**: Responsive design using Bootstrap 5
- **State Management**: Service-based state management for authentication and tasks

## Features

### Authentication
- User registration with validation
- Secure login with JWT tokens
- Automatic token refresh and logout on expiration
- Protected routes and API endpoints

### Task Management
- Create, read, update, and delete tasks
- Task status management (pending/completed)
- User-specific task isolation
- Real-time UI updates

## Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- Maven 3.6+
- npm 9+

### Running the Application

1. **Start the Backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   Backend will be available at `http://localhost:8080`

2. **Start the Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Frontend will be available at `http://localhost:4200`

### Default Credentials
The application doesn't have default users - you'll need to register a new account through the registration page.

## API Documentation

### Authentication Endpoints
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Task Endpoints (Protected)
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/{id}` - Get specific task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

## Database Access

H2 Console is available at `http://localhost:8080/h2-console`:
- URL: `jdbc:h2:mem:taskmanager`
- Username: `sa`
- Password: `password`

## Technology Stack

### Backend
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- H2 Database
- JWT (jjwt)
- Maven

### Frontend
- Angular 17
- TypeScript
- Bootstrap 5
- RxJS
- npm

## Project Structure

```
assessment/
├── backend/                 # Spring Boot application
│   ├── src/main/java/com/taskmanager/
│   │   ├── config/         # Security configuration
│   │   ├── controller/     # REST controllers
│   │   ├── dto/           # Data transfer objects
│   │   ├── entity/        # JPA entities
│   │   ├── repository/    # Data repositories
│   │   ├── security/      # JWT utilities & security
│   │   └── service/       # Business logic
│   └── src/main/resources/
├── frontend/               # Angular application
│   └── src/app/
│       ├── auth/          # Authentication components
│       ├── components/    # UI components
│       ├── guards/        # Route guards
│       ├── models/        # TypeScript interfaces
│       ├── services/      # Angular services
│       └── shared/        # Shared utilities
└── README.md
```

## Development Notes

- Backend runs on port 8080
- Frontend runs on port 4200 in development
- CORS is configured to allow frontend-backend communication
- JWT tokens expire after 24 hours
- All API endpoints except `/auth/**` require authentication