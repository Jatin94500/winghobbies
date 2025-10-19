# ⚠️ BACKEND SERVER IS NOT RUNNING

## Error You're Seeing:
```
Access to XMLHttpRequest at 'http://localhost:5000/api/auth/login' from origin 'http://localhost:3001' 
has been blocked by CORS policy
```

## This Means:
The backend server on port 5000 is **NOT RUNNING**.

## Fix:

### Step 1: Open NEW Terminal/Command Prompt

### Step 2: Navigate to backend folder
```bash
cd c:/Users/ACER/Rc-model/rc-ecommerce/src/backend
```

### Step 3: Start the server
```bash
npm start
```

### Step 4: Wait for success message
```
✅ MongoDB Atlas Connected Successfully
Database: wing-hobbies
🚀 Server running on port 5000
📡 CORS enabled for: http://localhost:3000, http://localhost:3001
```

### Step 5: Keep this terminal open
DO NOT close this terminal. Backend must stay running.

### Step 6: Refresh your frontend
Go back to http://localhost:3001 and try logging in again.

---

## Quick Check:
Open browser and go to: http://localhost:5000/api/health

If you see `{"status":"OK","message":"Wing Hobbies API is running"}` - Backend is working!

If you see "This site can't be reached" - Backend is NOT running!

---

## You Need TWO Terminals Running:
1. **Terminal 1**: Backend (port 5000) - `cd src/backend && npm start`
2. **Terminal 2**: Frontend (port 3001) - `npm start`

Both must be running at the same time!
