# Installation Guide

## Prerequisites Installation

### Installing Java 17

#### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install openjdk-17-jdk
```

#### Verify Java installation:
```bash
java -version
javac -version
```

### Installing Maven

#### Ubuntu/Debian:
```bash
sudo apt install maven
```

#### Verify Maven installation:
```bash
mvn --version
```

### Installing Node.js and npm (if not already installed)

#### Ubuntu/Debian:
```bash
# Install Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Verify Node.js and npm installation:
```bash
node --version
npm --version
```

## Running the Application

### Backend (Spring Boot)
1. Make sure Java 17+ and Maven are installed
2. Navigate to the project root directory
3. Make the backend script executable and run it:
   ```bash
   chmod +x start-backend.sh
   ./start-backend.sh
   ```
   
   Or manually:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

### Frontend (Angular)
1. Make sure Node.js 18+ and npm are installed
2. Navigate to the project root directory
3. Make the frontend script executable and run it:
   ```bash
   chmod +x start-frontend.sh
   ./start-frontend.sh
   ```
   
   Or manually:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## URLs

- **Frontend Application**: http://localhost:4200
- **Backend API**: http://localhost:8080
- **H2 Database Console**: http://localhost:8080/h2-console
  - URL: `jdbc:h2:mem:taskmanager`
  - Username: `sa`
  - Password: `password`

## Troubleshooting

### Common Issues

1. **Port already in use**: 
   - Backend (8080): Kill any process using port 8080
   - Frontend (4200): Kill any process using port 4200

2. **Java version issues**: 
   - Make sure you have Java 17 or higher installed
   - Set JAVA_HOME if necessary

3. **Node.js version issues**:
   - Make sure you have Node.js 18 or higher installed
   - Clear npm cache if needed: `npm cache clean --force`

4. **CORS issues**:
   - The backend is configured to allow CORS from any origin
   - Make sure both frontend and backend are running

5. **Database issues**:
   - The H2 database is in-memory and resets when the backend restarts
   - Check the H2 console to verify database structure

## Development Tips

- Use the H2 console to inspect the database during development
- Check browser developer tools for frontend errors
- Check backend console logs for API errors
- JWT tokens expire after 24 hours by default