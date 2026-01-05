@echo off
REM Start Frontend Server
REM This batch file automatically sets up and runs the frontend

echo.
echo ========================================
echo Appointment Scheduling System - FRONTEND
echo ========================================
echo.

REM Change to frontend directory
cd frontend

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
) else (
    echo Dependencies already installed.
)

echo.
echo Starting frontend server on port 3000...
echo.
call npm start

pause
