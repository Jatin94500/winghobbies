# Quick Deployment Guide

## 🚀 Fastest Way to Deploy (Render - Free)

### Step 1: Prepare Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy Backend (5 minutes)
1. Go to https://dashboard.render.com/
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `wing-hobbies-backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/backend/server.js`
5. Click **"Advanced"** → Add Environment Variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_random_secret_32_chars
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   GCS_PROJECT_ID=your_gcs_project
   GCS_BUCKET_NAME=wing-hobbies-products
   NODE_ENV=production
   ```
6. Click **"Create Web Service"**
7. **Copy the backend URL** (e.g., `https://wing-hobbies-backend.onrender.com`)

### Step 3: Deploy Frontend (3 minutes)
1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Connect same GitHub repository
3. Configure:
   - **Name**: `wing-hobbies-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
4. Add Environment Variable:
   ```
   REACT_APP_API_URL=YOUR_BACKEND_URL_FROM_STEP_2
   ```
5. Click **"Create Static Site"**

### Step 4: Update CORS (2 minutes)
1. Copy your frontend URL (e.g., `https://wing-hobbies.onrender.com`)
2. Edit `src/backend/server.js` line 45:
   ```javascript
   const allowedOrigins = [
     'https://your-frontend-url.onrender.com'
   ];
   ```
3. Commit and push:
   ```bash
   git add .
   git commit -m "Update CORS"
   git push
   ```
4. Render will auto-redeploy

### ✅ Done! Your site is live!

---

## 🐳 Alternative: Docker (Local/VPS)

### Prerequisites
- Docker installed
- Docker Compose installed

### Deploy
```bash
# 1. Create .env file
copy .env.example .env
# Edit .env with your values

# 2. Run deployment script
deploy-docker.bat

# 3. Access
# Backend: http://localhost:5000
# Frontend: http://localhost:80
```

---

## 📊 Deployment Comparison

| Platform | Backend | Frontend | Cost | Setup Time |
|----------|---------|----------|------|------------|
| **Render** | ✅ Free | ✅ Free | $0 | 10 min |
| **Vercel + Netlify** | ✅ Free | ✅ Free | $0 | 15 min |
| **Railway** | ✅ $5/mo | ✅ Free | $5 | 8 min |
| **AWS** | 💰 $20/mo | 💰 $5/mo | $25 | 30 min |
| **Docker VPS** | 💰 $5/mo | 💰 $5/mo | $10 | 20 min |

---

## 🔧 Post-Deployment

### 1. Test Everything
- [ ] User registration/login
- [ ] Product browsing
- [ ] Add to cart
- [ ] Checkout with coupon
- [ ] Payment (test mode)
- [ ] Order tracking
- [ ] Admin panel access
- [ ] Image uploads

### 2. Configure Production Settings
- [ ] Update sitemap.xml with your domain
- [ ] Update robots.txt
- [ ] Add domain to Firebase authorized domains
- [ ] Switch Razorpay to live mode
- [ ] Update Google Analytics tracking ID
- [ ] Set up MongoDB backups
- [ ] Configure uptime monitoring

### 3. Performance
- [ ] Enable CDN for images
- [ ] Test page load speed (Google PageSpeed)
- [ ] Optimize images
- [ ] Enable caching

---

## 🆘 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify all environment variables are set
- Check logs: `docker-compose logs backend`

### Frontend can't connect to backend
- Verify REACT_APP_API_URL is correct
- Check CORS settings in server.js
- Ensure backend is running

### Images not loading
- Check GCS bucket permissions
- Verify service account key is uploaded
- Test with local uploads first

### Payment not working
- Verify Razorpay keys
- Check if using test/live mode correctly
- Check browser console for errors

---

## 📞 Need Help?

Check the full [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.
