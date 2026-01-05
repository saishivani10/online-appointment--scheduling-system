# Project Setup and Configuration Guide

## Quick Start Guide

### Step 1: Install Node.js
- Download from https://nodejs.org/
- Verify installation: `node --version` and `npm --version`

### Step 2: Install MySQL

#### Option A: Local MySQL
1. Download MySQL Community Edition from https://dev.mysql.com/downloads/mysql/
2. Follow installation instructions for your OS
3. Start MySQL service
4. Verify: `mysql --version`

#### Option B: MySQL via Docker
```bash
docker run --name mysql -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql:8.0
```

### Step 3: Backend Setup

```bash
cd backend
npm install
cp .env.example .env

# Edit .env with your MySQL configuration
# DB_HOST=localhost
# DB_PORT=3306
# DB_NAME=appointment_scheduling
# DB_USER=root
# DB_PASSWORD=your_password
# JWT_SECRET=your_secret_key

npm start
```

### Step 4: Frontend Setup

```bash
cd frontend
npm install
npm start
```

### Step 5: Test the Application

1. Open http://localhost:3000
2. Register as a new user (Customer or Provider)
3. Login with your credentials
4. Test booking functionality

## Important Configuration Files

### Backend .env
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=appointment_scheduling
DB_USER=root
DB_PASSWORD=password
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

### Frontend .env (optional)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## API Testing with Postman

### Get Bearer Token
1. POST to `http://localhost:5000/api/auth/login`
2. Body:
```json
{
  "email": "your_email@example.com",
  "password": "your_password"
}
```
3. Copy the token from response
4. Add to Headers: `Authorization: Bearer <token>`

### Test Endpoints
- Register: POST /api/auth/register
- Login: POST /api/auth/login
- Get Appointments: GET /api/appointments
- Book Appointment: POST /api/appointments
- Get Services: GET /api/services

## Deployment

### Backend Deployment (Heroku)
1. Create Heroku account
2. Install Heroku CLI
3. Login: `heroku login`
4. Create app: `heroku create your-app-name`
5. Set environment variables: `heroku config:set KEY=VALUE`
6. Push code: `git push heroku main`

### Frontend Deployment (Vercel/Netlify)
1. Build the React app: `npm run build`
2. Deploy the build folder to Vercel or Netlify
3. Set API URL in environment variables

## Troubleshooting

### MySQL Connection Issues
- Check MySQL is running: `mysql -u root -p`
- Verify connection string in .env
- Check firewall settings
- Ensure credentials are correct
- Check port 3306 is not in use

### Port Already in Use
```bash
# For port 5000 (backend)
lsof -i :5000
kill -9 <PID>

# For port 3000 (frontend)
lsof -i :3000
kill -9 <PID>
```

### Sequelize Sync Errors
- Delete .env and recreate it with correct MySQL credentials
- Check that MySQL database exists
- Verify all required tables are created
- Run: `npm start` to auto-sync tables

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
- Check backend CORS configuration in server.js
- Verify frontend API URL matches backend
- Clear browser cache

## Next Steps

1. Implement email notifications
2. Add payment gateway integration
3. Create calendar view
4. Add admin dashboard
5. Implement real-time notifications
6. Add review and rating system
7. Mobile app development
8. Advanced scheduling algorithms

## Support
For issues and questions, refer to:
- Node.js Docs: https://nodejs.org/docs/
- MySQL Docs: https://dev.mysql.com/doc/
- Sequelize Docs: https://sequelize.org/
- React Docs: https://react.dev/
- Express Docs: https://expressjs.com/
