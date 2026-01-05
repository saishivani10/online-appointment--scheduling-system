# Start Backend Server
# This PowerShell script automatically sets up and runs the backend

Write-Host ""
Write-Host "========================================"
Write-Host "Appointment Scheduling System - BACKEND"
Write-Host "========================================"
Write-Host ""

# Change to backend directory
cd backend

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..."
    npm install
} else {
    Write-Host "Dependencies already installed."
}

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file..."
    Copy-Item ".env.example" ".env"
    Write-Host ""
    Write-Host "Please edit the .env file with your MySQL password!"
    Write-Host "Opening Notepad..."
    notepad .env
}

Write-Host ""
Write-Host "Starting backend server on port 5000..."
Write-Host "Make sure MySQL is running!"
Write-Host ""
npm start
