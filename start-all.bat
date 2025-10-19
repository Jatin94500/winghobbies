@echo off
echo ========================================
echo Starting Wing Hobbies E-commerce
echo ========================================
echo.

echo [1/2] Starting Backend Server (Port 5000)...
start "Wing Hobbies Backend" cmd /k "cd src\backend && npm start"

echo Waiting for backend to initialize...
timeout /t 5 /nobreak >nul

echo.
echo [2/2] Starting Frontend Server (Port 3001)...
start "Wing Hobbies Frontend" cmd /k "npm start"

echo.
echo ========================================
echo Both servers are starting!
echo ========================================
echo.
echo Backend: http://localhost:5000/api/health
echo Frontend: http://localhost:3001
echo.
echo Keep both terminal windows open!
echo ========================================
pause
