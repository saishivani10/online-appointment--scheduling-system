# 🔧 INSTALLATION GUIDE - Complete Setup

## ⚠️ PROBLEM: "Cannot find path" or "npm not recognized"

This means **Node.js is NOT installed** on your computer.

---

## ✅ SOLUTION: Install Node.js

### **Step 1: Download Node.js**

1. Open your web browser
2. Go to: **https://nodejs.org/**
3. You'll see two buttons:
   - **"LTS" (Recommended)** ← Click this one
   - "Current"

4. Click **"LTS"** button (it should be green/blue)
5. The installer will download automatically

---

### **Step 2: Run the Installer**

1. Find the downloaded file in your Downloads folder
   - It will be named: `node-v18.x.x-x64.msi` (or similar)

2. **Double-click** the installer file

3. A window opens asking to install Node.js
   - Click **"Next"**
   - Click **"I Agree"** to accept the license
   - Click **"Next"** (keep default location)
   - Click **"Next"** again
   - Click **"Install"**
   - Wait for installation to complete
   - Click **"Finish"**

---

### **Step 3: Restart Your Computer**

After installation completes:
1. **Restart your computer** (Important!)
2. Or at minimum, **close and reopen PowerShell**

---

### **Step 4: Verify Installation**

1. Open **PowerShell** (press `Win + X`, then click "Windows PowerShell")

2. Run these commands:

```powershell
node --version
```

You should see something like: `v18.18.0` ✅

```powershell
npm --version
```

You should see something like: `9.6.7` ✅

**If you see version numbers, Node.js is installed correctly!**

---

## 🚀 Now Install Your Application

Once Node.js is installed, run in PowerShell:

### **Backend Setup**

```powershell
# Go to your project
cd "C:\Users\HELLO\OneDrive\Desktop\online-appointment-scheduling-system\backend"

# Install all dependencies (takes 2-3 minutes)
npm install

# Create environment file
cp .env.example .env

# Edit the .env file
notepad .env
```

In the `.env` file, find this line and update it with your MySQL password:
```
DB_PASSWORD=your_mysql_password
JWT_SECRET=mySecretKey123
```

Then save and close (Ctrl + S, then close window)

### **Start Backend**

```powershell
npm start
```

Wait for this message:
```
Server running on port 5000
MySQL Database connected successfully
```

✅ **Backend is now running!**

---

### **Frontend Setup (New PowerShell Window)**

Open a **NEW PowerShell window** (don't close the first one)

```powershell
# Go to frontend
cd "C:\Users\HELLO\OneDrive\Desktop\online-appointment-scheduling-system\frontend"

# Install dependencies
npm install

# Start frontend
npm start
```

Wait for browser to open at `http://localhost:3000`

✅ **Frontend is now running!**

---

## ✨ You're Done!

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000

Now you can:
1. Register a new account
2. Login
3. Book appointments
4. Explore all features

---

## 📋 If You Still Get Errors

### **Error: "npm not recognized"**
- Node.js not installed
- **Solution**: Follow steps above to install Node.js
- Make sure to restart PowerShell after installation

### **Error: "Cannot find path"**
- Wrong directory path
- **Solution**: Copy and paste this exact command:
```powershell
cd "C:\Users\HELLO\OneDrive\Desktop\online-appointment-scheduling-system\backend"
```

### **Error: "MySQL connection failed"**
- MySQL password wrong in `.env`
- **Solution**: 
  1. Open `.env` file: `notepad .env`
  2. Update: `DB_PASSWORD=your_actual_mysql_password`
  3. Save and restart: `npm start`

### **Error: "Port 5000 already in use"**
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
npm start
```

---

## 🎯 Quick Checklist

Before running npm install, verify:
- [ ] Node.js is installed (run `node --version`)
- [ ] You're in correct folder (backend or frontend)
- [ ] You have internet connection
- [ ] MySQL is installed and running

---

## 💾 If npm install Fails

```powershell
# Clear and retry
rm -r node_modules
rm package-lock.json
npm install
```

---

## 📞 Need Help?

If you're still stuck:
1. Open PowerShell
2. Run: `node --version`
3. Copy the version number
4. Tell me the version and the exact error message

**I'll help you fix it!** 🚀
