# Task Manager Frontend

An Angular single-page application (SPA) for managing tasks with user authentication.

## Features

- User registration and login
- JWT token-based authentication
- Task management (create, read, update, delete)
- Task status tracking (pending/completed)
- Responsive design with Bootstrap
- Route guards for protected pages
- HTTP interceptor for automatic JWT token attachment

## Components

- **Login Component** - User authentication
- **Register Component** - User registration
- **Dashboard Component** - Main task management interface
- **Auth Service** - Handles authentication logic
- **Task Service** - Manages task operations
- **Auth Guard** - Protects routes from unauthorized access
- **Auth Interceptor** - Automatically adds JWT token to HTTP requests

## Running the Application

### Prerequisites
- Node.js 18 or higher
- npm 9 or higher
- Angular CLI (optional but recommended)

### Steps
1. Navigate to the frontend directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   Or if you have Angular CLI installed:
   ```bash
   ng serve
   ```
4. Open your browser and navigate to `http://localhost:4200`

### Building for Production
```bash
npm run build
```

## Configuration

The application is configured to connect to the backend API at `http://localhost:8080`.

To change the API URL, update the `API_URL` constants in:
- `src/app/services/auth.service.ts`
- `src/app/services/task.service.ts`

## Application Flow

1. **Registration/Login**: Users can register a new account or log in with existing credentials
2. **Authentication**: Upon successful login, a JWT token is stored in localStorage
3. **Dashboard**: Authenticated users can view, create, edit, and delete their tasks
4. **Task Management**: Tasks are organized into pending and completed categories
5. **Logout**: Users can logout, which clears the stored JWT token

## Security Features

- JWT token stored securely in localStorage
- Route guards prevent unauthorized access to protected pages
- HTTP interceptor automatically includes JWT token in API requests
- Automatic logout on token expiration or invalid token responses

## Styling

The application uses Bootstrap 5 for responsive design and styling.