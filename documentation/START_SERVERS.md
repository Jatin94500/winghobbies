# Start Servers Guide

## Backend Server (Port 5000)
```bash
cd src/backend
npm start
```

## Frontend Server (Port 3000)
```bash
npm start
```

## Verify Connection
1. Backend should show: "✅ MongoDB Atlas Connected Successfully"
2. Frontend should open at http://localhost:3000
3. Backend API at http://localhost:5000/api/health

## Test Today's Deals Feature
1. Login to admin: http://localhost:3000/admin/login
   - Email: admin@winghobbies.com
   - Password: admin123

2. Go to "Today's Deals" in sidebar

3. Click "Add to Deals" on any product

4. Check homepage sidebar - product should appear in "Today's Deals"

5. Refresh page - product should still be there (stored in MongoDB Atlas)

## Troubleshooting
- If MongoDB connection fails, check .env file has correct MONGODB_URI
- If port 5000 is busy, change PORT in .env
- Clear browser cache: F12 > Application > Clear Storage
