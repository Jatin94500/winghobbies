# Wing Hobbies - Deployment Guide

## Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account
- Google Cloud Storage account
- Razorpay account
- Firebase account
- Domain name (optional)

## Deployment Options

### Option 1: Render (Recommended - Free Tier Available)

#### Backend Deployment
1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: wing-hobbies-backend
   - **Root Directory**: (leave empty)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node src/backend/server.js`
   - **Instance Type**: Free
6. Add Environment Variables (from .env.example)
7. Click "Create Web Service"
8. Copy the backend URL (e.g., https://wing-hobbies-backend.onrender.com)

#### Frontend Deployment
1. Go to Render Dashboard
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Configure:
   - **Name**: wing-hobbies-frontend
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
5. Add Environment Variable:
   - `REACT_APP_API_URL`: Your backend URL from step 8 above
6. Click "Create Static Site"

### Option 2: Railway

#### Backend
1. Go to [Railway](https://railway.app/)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables
5. Railway will auto-detect Node.js and deploy

#### Frontend
1. Use Vercel or Netlify for frontend (see below)

### Option 3: Vercel (Backend) + Netlify (Frontend)

#### Backend on Vercel
```bash
npm install -g vercel
vercel login
vercel --prod
```
Add environment variables in Vercel dashboard

#### Frontend on Netlify
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Option 4: Google Cloud Run

#### Backend
```bash
# Build and push Docker image
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/wing-hobbies-backend -f Dockerfile.backend

# Deploy to Cloud Run
gcloud run deploy wing-hobbies-backend \
  --image gcr.io/YOUR_PROJECT_ID/wing-hobbies-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production
```

#### Frontend
```bash
# Build and push Docker image
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/wing-hobbies-frontend -f Dockerfile.frontend

# Deploy to Cloud Run
gcloud run deploy wing-hobbies-frontend \
  --image gcr.io/YOUR_PROJECT_ID/wing-hobbies-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Option 5: AWS (EC2 + S3)

#### Backend on EC2
```bash
# SSH into EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone your-repo-url
cd rc-ecommerce

# Install dependencies
npm install

# Install PM2
sudo npm install -g pm2

# Start backend
pm2 start src/backend/server.js --name wing-hobbies-backend
pm2 save
pm2 startup
```

#### Frontend on S3 + CloudFront
```bash
# Build frontend
npm run build

# Upload to S3
aws s3 sync build/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### Option 6: Docker + VPS

```bash
# On your VPS
git clone your-repo-url
cd rc-ecommerce

# Create .env file with your variables
nano .env

# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f
```

## Environment Variables Setup

### Required Variables
```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wing-hobbies

# JWT
JWT_SECRET=your_secure_random_string_min_32_chars

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password

# Razorpay
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=your_secret

# Google Cloud Storage
GCS_PROJECT_ID=your_project_id
GCS_BUCKET_NAME=wing-hobbies-products
GCS_KEY_FILE=./gcs-key.json

# Frontend
REACT_APP_API_URL=https://your-backend-url.com
```

## Post-Deployment Checklist

### 1. Update CORS Origins
Edit `src/backend/server.js`:
```javascript
const allowedOrigins = [
  'https://your-frontend-domain.com',
  'https://www.your-frontend-domain.com'
];
```

### 2. Update sitemap.xml
Edit `public/sitemap.xml` with your domain

### 3. Update robots.txt
Edit `public/robots.txt` with your sitemap URL

### 4. Configure Firebase
- Add your production domain to Firebase authorized domains
- Update Firebase config in frontend

### 5. Configure Google Analytics
- Update tracking ID in `public/index.html`

### 6. Test Payment Gateway
- Switch Razorpay from test mode to live mode
- Update API keys

### 7. SSL Certificate
- Most platforms (Render, Vercel, Netlify) provide free SSL
- For custom domains, use Let's Encrypt

### 8. Database Backup
```bash
# MongoDB Atlas automatic backups
# Or manual backup:
mongodump --uri="your_mongodb_uri" --out=./backup
```

### 9. Monitoring Setup
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Configure error tracking (Sentry)
- Set up log aggregation

### 10. Performance Optimization
- Enable CDN for static assets
- Configure caching headers
- Optimize images
- Enable Gzip compression

## Troubleshooting

### Backend not connecting to MongoDB
- Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for all IPs)
- Verify connection string
- Check network access settings

### CORS errors
- Add your frontend domain to allowedOrigins in server.js
- Redeploy backend

### Images not loading
- Verify GCS bucket permissions are public
- Check GCS_BUCKET_NAME environment variable
- Ensure service account has Storage Admin role

### Payment gateway errors
- Verify Razorpay keys are correct
- Check if using live keys in production
- Verify webhook URL is set in Razorpay dashboard

## Scaling Considerations

### Database
- MongoDB Atlas auto-scaling enabled
- Consider read replicas for high traffic

### Backend
- Use load balancer for multiple instances
- Implement Redis for session management
- Add caching layer (Redis/Memcached)

### Frontend
- Use CDN (Cloudflare, AWS CloudFront)
- Implement service workers for offline support
- Lazy load components

### Storage
- Use CDN for GCS bucket
- Implement image optimization pipeline
- Consider multiple regions

## Cost Estimation

### Free Tier (Development)
- Render: Free (backend + frontend)
- MongoDB Atlas: Free (512MB)
- GCS: Free tier (5GB)
- Total: $0/month

### Production (Small Scale)
- Render: $7/month (backend)
- Netlify: Free (frontend)
- MongoDB Atlas: $9/month (2GB)
- GCS: ~$1/month (10GB)
- Total: ~$17/month

### Production (Medium Scale)
- AWS EC2: $20/month
- MongoDB Atlas: $57/month (10GB)
- S3 + CloudFront: $5/month
- Total: ~$82/month

## Support
For issues, check:
- Server logs
- Browser console
- MongoDB Atlas logs
- GCS logs
- Payment gateway dashboard
