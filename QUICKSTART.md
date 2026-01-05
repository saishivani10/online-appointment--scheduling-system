# Quick Start Guide - Appointment Scheduling System

## 📋 Prerequisites (Install First)

### 1. **Node.js**
- Download: https://nodejs.org/ (LTS version recommended)
- Verify: Open PowerShell and run:
  ```powershell
  node --version
  npm --version
  ```

### 2. **MySQL**
- Download: https://dev.mysql.com/downloads/mysql/
- Or use: `choco install mysql` (if you have Chocolatey)
- After installation, verify MySQL is running
- Create a root user with password if not already done

---

## 🚀 Complete Setup Instructions

### **Step 1: Open PowerShell as Administrator**
- Press `Win + X` → Select "Windows PowerShell (Admin)"
- Or search "PowerShell" in Windows and open it

### **Step 2: Navigate to Project Folder**
```powershell
cd "c:\Users\HELLO\OneDrive\Desktop\online-appointment-scheduling-system"
```

Verify you're in the right directory:
```powershell
ls  # Should show: backend, frontend, database, README.md, etc.
```

---

## 🔧 BACKEND SETUP (Terminal 1)

### **Step 1: Go to Backend**
```powershell
cd backend
```

### **Step 2: Install Dependencies**
```powershell
npm install
```
⏳ Wait for all packages to install (takes 2-3 minutes)

### **Step 3: Create Environment File**
```powershell
cp .env.example .env
```

### **Step 4: Edit .env with Your MySQL Password**
```powershell
notepad .env
```

**Update these lines** (replace `your_mysql_password` with your actual MySQL password):
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=appointment_scheduling
DB_USER=root
DB_PASSWORD=your_mysql_password
JWT_SECRET=mySecretKey123
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

Save and close (Ctrl + S, then close the window)

### **Step 5: Start Backend Server**
```powershell
npm start
```

✅ **Success** when you see:
```
Server running on port 5000
MySQL Database connected successfully
```

**KEEP THIS TERMINAL OPEN** - Don't close it!

---

## 🎨 FRONTEND SETUP (Terminal 2 - NEW WINDOW)

### **Step 1: Open NEW PowerShell Window**
- Press `Win + X` → Select "Windows PowerShell (Admin)" **AGAIN**
- You should now have 2 PowerShell windows open

### **Step 2: Go to Frontend Folder**
```powershell
cd "c:\Users\HELLO\OneDrive\Desktop\online-appointment-scheduling-system\frontend"
```

### **Step 3: Install Dependencies**
```powershell
npm install
```
⏳ Wait for all packages to install

### **Step 4: Start Frontend**
```powershell
npm start
```

✅ **Success** when:
- You see: `Compiled successfully!`
- Browser opens automatically at `http://localhost:3000`

**KEEP THIS TERMINAL OPEN** - Don't close it!

---

## 🧪 Test the Application

### **Step 1: Register a New Account**
- Go to `http://localhost:3000`
- Click "Register"
- Fill in:
  - Full Name: John Doe
  - Email: john@example.com
  - Phone: 555-1234
  - Password: password123
  - Role: Customer (or Provider)
- Click "Register"

### **Step 2: Login**
- Email: john@example.com
- Password: password123
- Click "Login"

### **Step 3: View Dashboard**
- You should see your dashboard with quick actions

### **Step 4: Test Booking**
- Click "Book Appointment"
- Select a provider
- Select a service
- Choose date and time
- Click "Book Appointment"

---

## 📊 API Testing (Optional)

### **Test Backend Directly:**

Open PowerShell and run:
```powershell
# Test if backend is running
curl http://localhost:5000/api/health

# Should return: {"status":"Server is running"}
```

---

## 🛑 Stopping the Application

When you want to stop:
- **Terminal 1 (Backend)**: Press `Ctrl + C`
- **Terminal 2 (Frontend)**: Press `Ctrl + C`

---

## 🔄 Running It Again Later

```powershell
# Terminal 1 - Backend
cd "c:\Users\HELLO\OneDrive\Desktop\online-appointment-scheduling-system\backend"
npm start

# Terminal 2 - Frontend (in new PowerShell window)
cd "c:\Users\HELLO\OneDrive\Desktop\online-appointment-scheduling-system\frontend"
npm start
```

---

## ❌ Troubleshooting

### **"MySQL connection error"**
- Check MySQL is running
- Verify password in `.env` matches your MySQL password
- Run: `mysql -u root -p` and enter your password

### **"Port 5000 already in use"**
```powershell
# Kill process using port 5000
netstat -ano | findstr :5000
# Find PID and kill it
taskkill /PID <PID> /F
```

### **"npm command not found"**
- Install Node.js from https://nodejs.org/
- Restart PowerShell after installation

### **"React not compiling"**
```powershell
cd frontend
rm -r node_modules
npm install
npm start
```

### **Module not found errors**
```powershell
npm install
```

---

## 📱 Project Structure

```
online-appointment-scheduling-system/
├── backend/                 ← Run: npm start (Terminal 1)
│   ├── models/             (Database schemas)
│   ├── routes/             (API endpoints)
│   ├── middleware/         (Authentication)
│   └── server.js           (Main backend file)
│
├── frontend/               ← Run: npm start (Terminal 2)
│   ├── src/
│   │   ├── components/     (React pages)
│   │   ├── styles/         (CSS files)
│   │   └── api.js          (API calls)
│   └── public/
│
└── database/
    ├── schema.js           (MySQL table definitions)
    └── sample-data.js      (Test data)
```

---

## 🌐 Access Points

| Component | URL | Port |
|-----------|-----|------|
| Frontend | http://localhost:3000 | 3000 |
| Backend API | http://localhost:5000 | 5000 |
| MySQL | localhost | 3306 |

---

## 📚 API Endpoints

```
POST   /api/auth/register         - Create account
POST   /api/auth/login            - Login
GET    /api/appointments          - View appointments
POST   /api/appointments          - Book appointment
GET    /api/services              - View services
POST   /api/services              - Create service (provider)
GET    /api/users/providers       - View providers
```

---

## ✨ Next Steps

After everything is running:
1. ✅ Test registration/login
2. ✅ Test booking appointments
3. ✅ Register as provider and create services
4. ✅ Explore dashboard features

---

## 📞 Common Issues

| Issue | Solution |
|-------|----------|
| Port already in use | Kill process: `taskkill /PID <PID> /F` |
| MySQL not starting | Reinstall MySQL or use Docker |
| npm install fails | Delete `node_modules` and `package-lock.json`, run again |
| CORS error | Check backend is running on 5000 |
| Can't find module | Run `npm install` again |

---

**You're all set! Your appointment scheduling system is ready to use.** 🎉
