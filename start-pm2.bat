@echo off
echo ========================================
echo   Wing Hobbies - Starting with PM2
echo ========================================
echo.

echo [1/3] Checking PM2 installation...
where pm2 >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo PM2 not found! Installing...
    call npm install -g pm2
    call npm install -g pm2-windows-startup
    call pm2-startup install
)

echo.
echo [2/3] Starting Backend with PM2...
cd src\backend
call pm2 delete backend 2>nul
call pm2 start server.js --name backend
cd ..\..

echo.
echo [3/3] Starting Frontend...
start cmd /k "npm start"

echo.
echo ========================================
echo   ✅ Servers Started Successfully!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3001
echo.
echo PM2 Commands:
echo   pm2 list       - Show status
echo   pm2 logs       - View logs
echo   pm2 restart backend - Restart backend
echo   pm2 stop backend    - Stop backend
echo.
echo Press any key to view PM2 status...
pause >nul
call pm2 list
