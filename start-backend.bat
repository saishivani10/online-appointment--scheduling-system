@echo off
REM Start Backend Server
REM This batch file automatically sets up and runs the backend

echo.
echo ========================================
echo Appointment Scheduling System - BACKEND
echo ========================================
echo.

REM Change to backend directory
cd backend

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
) else (
    echo Dependencies already installed.
)

REM Check if .env exists
if not exist ".env" (
    echo Creating .env file...
    copy .env.example .env
    echo.
    echo Please edit the .env file with your MySQL password!
    echo Starting Notepad...
    start notepad .env
    pause
)

echo.
echo Starting backend server on port 5000...
echo Make sure MySQL is running!
echo.
call npm start

pause
