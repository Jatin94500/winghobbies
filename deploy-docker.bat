@echo off
echo 🚀 Building and deploying with Docker...

REM Check if .env exists
if not exist .env (
    echo ❌ .env file not found!
    echo Please create .env file from .env.example
    exit /b 1
)

REM Build and start containers
echo 📦 Building Docker images...
docker-compose build

echo 🚀 Starting containers...
docker-compose up -d

echo ✅ Deployment complete!
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:80
echo.
echo View logs: docker-compose logs -f
echo Stop: docker-compose down
