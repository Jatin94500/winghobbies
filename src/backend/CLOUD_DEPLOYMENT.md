# Full Cloud Deployment - No Local Dependencies

## Architecture

```
Frontend (Netlify) → Backend (Railway/Render) → MongoDB Atlas (Cloud DB)
                                               → Gmail API (Cloud Email)
                                               → Google Cloud Storage (Cloud Images)
```

## ✅ Already Configured

### 1. MongoDB Atlas (Cloud Database)
- **Status**: ✅ Connected
- **URI**: Already in `.env`
- **Cluster**: winghobbies.mzduv50.mongodb.net
- No local MongoDB needed!

### 2. Google Cloud Storage (Images)
- **Status**: ✅ Configured
- **Project**: healthy-basis-475512-v4
- **Bucket**: wing-hobbies-products
- **Service Account**: wing-hobbies-uploader
- No local file storage needed!

## 🔧 Setup Required

### 3. Gmail API (Email Service)

Follow `OAUTH_SETUP_GUIDE.md` to get:
- Client ID
- Client Secret  
- Refresh Token

Update `.env`:
```env
EMAIL_USER=your-email@gmail.com
GMAIL_CLIENT_ID=...
GMAIL_CLIENT_SECRET=...
GMAIL_REFRESH_TOKEN=...
```

### 4. Deploy Backend to Cloud

#### Option A: Railway (Recommended)

1. Go to [Railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your repository
5. Add environment variables from `.env`
6. Deploy!

**Railway gives you:**
- Free $5 credit/month
- Automatic HTTPS
- Auto-deploy on git push
- Built-in logging

#### Option B: Render

1. Go to [Render.com](https://render.com)
2. Sign in with GitHub
3. Click **New** → **Web Service**
4. Connect repository
5. Settings:
   - Build Command: `cd src/backend && npm install`
   - Start Command: `cd src/backend && npm start`
6. Add environment variables
7. Deploy!

**Render gives you:**
- Free tier (spins down after inactivity)
- Automatic HTTPS
- Auto-deploy on git push

#### Option C: Google Cloud Run

1. Install [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
2. Build and deploy:

```bash
cd src/backend

# Build Docker image
gcloud builds submit --tag gcr.io/healthy-basis-475512-v4/wings-backend

# Deploy to Cloud Run
gcloud run deploy wings-backend \
  --image gcr.io/healthy-basis-475512-v4/wings-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="$(cat .env | xargs)"
```

### 5. Update Frontend API URL

Update frontend to use deployed backend:

```javascript
// src/config/api.js
const API_URL = process.env.REACT_APP_API_URL || 'https://your-backend.railway.app/api';
```

Update `.env` in frontend:
```env
REACT_APP_API_URL=https://your-backend.railway.app/api
```

## Deployment Checklist

- [x] MongoDB Atlas connected
- [x] Google Cloud Storage configured
- [ ] Gmail API OAuth setup
- [ ] Backend deployed to Railway/Render
- [ ] Frontend deployed to Netlify
- [ ] Frontend API URL updated
- [ ] Test all features

## Cost Breakdown (Free Tier)

| Service | Free Tier | Cost After |
|---------|-----------|------------|
| MongoDB Atlas | 512MB storage | $0.08/GB/month |
| Google Cloud Storage | 5GB storage | $0.02/GB/month |
| Gmail API | 1B quota/day | Free |
| Railway | $5 credit/month | $0.000463/GB-hour |
| Netlify | 100GB bandwidth | $0.20/GB |

**Total**: $0/month for small projects!

## Testing Cloud Setup

```bash
# Test MongoDB connection
curl https://your-backend.railway.app/api/health

# Test email
curl -X POST https://your-backend.railway.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test"}'

# Test image upload
curl -X POST https://your-backend.railway.app/api/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@test.jpg"
```

## Monitoring

- **Railway**: Built-in logs and metrics
- **MongoDB Atlas**: Performance monitoring dashboard
- **Google Cloud**: Stackdriver logging
- **Netlify**: Analytics and deploy logs

## Backup Strategy

- **MongoDB Atlas**: Automatic daily backups
- **Google Cloud Storage**: Versioning enabled
- **Code**: GitHub repository

## Next Steps

1. Complete Gmail OAuth setup
2. Deploy backend to Railway
3. Update frontend API URL
4. Test all features
5. Set up custom domain (optional)

Everything runs in the cloud - no local dependencies! 🚀
