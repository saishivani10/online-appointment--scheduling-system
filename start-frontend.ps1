# Start Frontend Server
# This PowerShell script automatically sets up and runs the frontend

Write-Host ""
Write-Host "========================================"
Write-Host "Appointment Scheduling System - FRONTEND"
Write-Host "========================================"
Write-Host ""

# Change to frontend directory
cd frontend

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..."
    npm install
} else {
    Write-Host "Dependencies already installed."
}

Write-Host ""
Write-Host "Starting frontend server on port 3000..."
Write-Host ""
npm start
