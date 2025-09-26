# Task Manager Backend

A RESTful API built with Spring Boot for managing tasks with JWT authentication.

## Features

- User registration and authentication with JWT
- CRUD operations for tasks
- H2 in-memory database
- Spring Security integration
- Comprehensive logging

## API Endpoints

### Authentication (Public)
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Tasks (Protected - requires JWT token)
- `GET /api/tasks` - Get all tasks for authenticated user
- `GET /api/tasks/{id}` - Get specific task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update an existing task
- `DELETE /api/tasks/{id}` - Delete a task

## Running the Application

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher

### Steps
1. Navigate to the backend directory
2. Run the application:
   ```bash
   mvn spring-boot:run
   ```
3. The API will be available at `http://localhost:8080`
4. H2 Console is available at `http://localhost:8080/h2-console`
   - URL: `jdbc:h2:mem:taskmanager`
   - Username: `sa`
   - Password: `password`

## Configuration

The application uses the following default configuration in `application.yml`:
- Server Port: 8080
- Database: H2 in-memory
- JWT Secret: configurable
- JWT Expiration: 24 hours

## Database Schema

The application creates two tables:
- `users` - User information (id, username, password)
- `tasks` - Task information (id, title, description, status, user_id)

## Logging

Logs are written to `logs/taskmanager.log` and console output.