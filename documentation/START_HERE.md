# 🚀 START SERVERS

## Backend Server (MUST START FIRST)

### Option 1: Double-click
```
start-backend.bat
```

### Option 2: Manual
```bash
cd src/backend
npm start
```

**Wait for:** `✅ MongoDB Atlas Connected Successfully`

---

## Frontend Server (START SECOND)

### Option 1: Double-click
```
start-frontend.bat
```

### Option 2: Manual
```bash
npm start
```

**Opens:** http://localhost:3000

---

## ⚠️ IMPORTANT
Backend MUST be running on port 5000 before frontend starts!

If you see `ERR_CONNECTION_REFUSED`, backend is not running.
