#!/bin/bash

echo "Starting Task Manager Backend..."
echo "================================="

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "Error: Java is not installed. Please install Java 17 or higher."
    exit 1
fi

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "Error: Maven is not installed. Please install Maven 3.6 or higher."
    exit 1
fi

# Navigate to backend directory
cd backend

# Check if pom.xml exists
if [ ! -f "pom.xml" ]; then
    echo "Error: pom.xml not found. Make sure you're in the correct directory."
    exit 1
fi

echo "Building and starting the backend..."
echo "This may take a few minutes on first run..."

# Build and run the application
mvn spring-boot:run

echo "Backend started successfully on http://localhost:8080"
echo "H2 Console available at http://localhost:8080/h2-console"