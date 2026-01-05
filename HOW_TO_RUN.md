# 🚀 HOW TO RUN YOUR APPOINTMENT SCHEDULING SYSTEM

## ⚡ EASIEST METHOD - Using Start Scripts

### **Option A: Using Batch Files (.bat) - Windows**

1. **Open File Explorer**
   - Navigate to: `C:\Users\HELLO\OneDrive\Desktop\online-appointment-scheduling-system`

2. **Terminal 1 - Start Backend**
   - Double-click: `start-backend.bat`
   - A PowerShell window opens
   - Wait for: `Server running on port 5000`

3. **Terminal 2 - Start Frontend**
   - Double-click: `start-frontend.bat` 
   - A PowerShell window opens
   - Wait for: Browser opens at `http://localhost:3000`

✅ **That's it! Your system is running!**

---

### **Option B: Using PowerShell Scripts**

1. **Terminal 1 - Backend**
   ```powershell
   # Right-click on start-backend.ps1
   # Select "Run with PowerShell"
   ```

2. **Terminal 2 - Frontend**
   ```powershell
   # Right-click on start-frontend.ps1
   # Select "Run with PowerShell"
   ```

---

## 📋 MANUAL METHOD - Step by Step Commands

### **Prerequisites**
Make sure you have:
- ✅ Node.js installed (https://nodejs.org/)
- ✅ MySQL installed and running
- ✅ PowerShell open

### **Step 1: Open PowerShell (Admin)**
- Press `Win + X`
- Click "Windows PowerShell (Admin)"

### **Step 2: Go to Project Folder**
```powershell
cd "C:\Users\HELLO\OneDrive\Desktop\online-appointment-scheduling-system"
```

### **Step 3: Setup Backend (First Terminal)**

```powershell
# Navigate to backend
cd backend

# Install packages
npm install

# Create environment file if it doesn't exist
cp .env.example .env

# Edit .env with your MySQL password
notepad .env
```

In the `.env` file, update:
```
DB_PASSWORD=your_mysql_password
```

Then start backend:
```powershell
npm start
```

Wait for: `Server running on port 5000` ✅

### **Step 4: Setup Frontend (Second Terminal)**

**Open a NEW PowerShell window** (don't close the first one)

```powershell
# Navigate to frontend
cd "C:\Users\HELLO\OneDrive\Desktop\online-appointment-scheduling-system\frontend"

# Install packages
npm install

# Start frontend
npm start
```

Wait for browser to open at `http://localhost:3000` ✅

---

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| **Start Backend** | `cd backend && npm start` |
| **Start Frontend** | `cd frontend && npm start` |
| **Install Backend Dependencies** | `cd backend && npm install` |
| **Install Frontend Dependencies** | `cd frontend && npm install` |
| **Test API** | `curl http://localhost:5000/api/health` |

---

## 🔍 Verify Everything Works

### **Backend Check**
1. Open PowerShell
2. Run: `curl http://localhost:5000/api/health`
3. Should see: `{"status":"Server is running"}`

### **Frontend Check**
1. Open browser
2. Go to: `http://localhost:3000`
3. Should see: Appointment Scheduling homepage

### **MySQL Check**
1. Open PowerShell
2. Run: `mysql -u root -p`
3. Enter your MySQL password
4. If successful, you see: `mysql>`
5. Type: `exit`

---

## 📂 Important Files

| File | Purpose |
|------|---------|
| `backend/.env` | MySQL connection settings |
| `backend/server.js` | Backend entry point |
| `frontend/src/App.js` | Frontend entry point |
| `start-backend.bat` | Quick backend launcher |
| `start-frontend.bat` | Quick frontend launcher |

---

## 🧪 Test Features

### **1. Register New Account**
- Go to `http://localhost:3000`
- Click "Register"
- Fill form and click "Register"

### **2. Login**
- Email: your_email@example.com
- Password: your_password
- Click "Login"

### **3. Book Appointment**
- Click "Book Appointment"
- Select provider
- Select service
- Choose date/time
- Click "Book"

### **4. View Dashboard**
- See all your appointments
- View appointment status

---

## 🛑 Stop Running Services

**To stop backend:**
- Click Terminal 1
- Press `Ctrl + C`

**To stop frontend:**
- Click Terminal 2
- Press `Ctrl + C`

---

## ❌ Troubleshooting

### **"Port 5000 already in use"**
```powershell
# Kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F
npm start  # Try again
```

### **"MySQL connection failed"**
1. Check MySQL is running
2. Verify password in `.env` is correct
3. Test: `mysql -u root -p`

### **"npm install takes too long"**
- Close antivirus temporarily
- Delete `node_modules` folder
- Run `npm install` again

### **"Cannot find module"**
```powershell
cd backend  # or frontend
rm -r node_modules
npm install
npm start
```

### **Port 3000 in use**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
npm start  # Try again
```

---

## 💡 Pro Tips

1. **Keep both terminals open** while using the app
2. **Check terminal for errors** if something doesn't work
3. **Clear browser cache** if styles look broken: `Ctrl + Shift + Delete`
4. **Copy your `.env` file** as backup before modifying
5. **Use same browser tab** for consistent experience

---

## 📱 System Endpoints

```
Frontend:  http://localhost:3000
Backend:   http://localhost:5000
MySQL:     localhost:3306
```

---

## ✨ What You Can Do

- ✅ Register as Customer or Service Provider
- ✅ Browse available services
- ✅ Book appointments
- ✅ View appointment history
- ✅ Create services (as provider)
- ✅ Manage profile
- ✅ View appointment status

---

**Your appointment scheduling system is now ready to use!** 🎉

If you have any issues, check the Troubleshooting section above.
