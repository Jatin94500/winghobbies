# 🚀 Deployment Checklist

## Pre-Deployment

### 1. Code Preparation
- [ ] All features tested locally
- [ ] No console.log statements in production code
- [ ] All API endpoints working
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Form validations working

### 2. Environment Variables
- [ ] Create .env.example with all required variables
- [ ] Document all environment variables
- [ ] Generate secure JWT_SECRET (min 32 characters)
- [ ] Obtain MongoDB Atlas connection string
- [ ] Get Razorpay API keys
- [ ] Configure Google Cloud Storage
- [ ] Set up email credentials (Gmail App Password)
- [ ] Get Firebase credentials

### 3. Database Setup
- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] IP whitelist configured (0.0.0.0/0 for cloud deployment)
- [ ] Test connection string locally
- [ ] Create database indexes if needed
- [ ] Backup existing data (if any)

### 4. Cloud Storage
- [ ] Google Cloud Storage bucket created
- [ ] Bucket set to public access for images
- [ ] Service account created
- [ ] Service account key downloaded (JSON)
- [ ] Test image upload locally

### 5. Payment Gateway
- [ ] Razorpay account created
- [ ] Test mode keys obtained
- [ ] Test payment flow locally
- [ ] Webhook URL configured (for production)
- [ ] Live mode keys ready (for production launch)

### 6. Email Service
- [ ] Gmail account set up
- [ ] 2FA enabled on Gmail
- [ ] App-specific password generated
- [ ] Test email sending locally
- [ ] Email templates reviewed

### 7. Firebase Setup
- [ ] Firebase project created
- [ ] Web app registered
- [ ] Firebase config obtained
- [ ] Cloud Messaging enabled
- [ ] VAPID key generated
- [ ] Test notifications locally

### 8. Code Repository
- [ ] Git repository initialized
- [ ] .gitignore configured (exclude .env, node_modules)
- [ ] All changes committed
- [ ] Repository pushed to GitHub/GitLab
- [ ] Repository set to private (if needed)

---

## Deployment Steps

### Option A: Render (Recommended)

#### Backend Deployment
- [ ] Sign up at render.com
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Set build command: `npm install`
- [ ] Set start command: `node src/backend/server.js`
- [ ] Add all environment variables
- [ ] Deploy and wait for build
- [ ] Test health endpoint: `https://your-backend.onrender.com/api/health`
- [ ] Copy backend URL

#### Frontend Deployment
- [ ] Create new Static Site on Render
- [ ] Connect same GitHub repository
- [ ] Set build command: `npm install && npm run build`
- [ ] Set publish directory: `build`
- [ ] Add REACT_APP_API_URL with backend URL
- [ ] Deploy and wait for build
- [ ] Copy frontend URL

### Option B: Docker

- [ ] Install Docker and Docker Compose
- [ ] Create .env file from .env.example
- [ ] Run: `docker-compose build`
- [ ] Run: `docker-compose up -d`
- [ ] Check logs: `docker-compose logs -f`
- [ ] Test: http://localhost:80

---

## Post-Deployment Configuration

### 1. Update CORS
- [ ] Add frontend URL to allowedOrigins in server.js
- [ ] Commit and push changes
- [ ] Wait for auto-redeploy

### 2. Update Frontend URLs
- [ ] Update sitemap.xml with production domain
- [ ] Update robots.txt with sitemap URL
- [ ] Update Firebase authorized domains
- [ ] Update Google Analytics tracking ID

### 3. Database Configuration
- [ ] Verify MongoDB connection from deployed backend
- [ ] Check database logs for errors
- [ ] Test CRUD operations from deployed app

### 4. Storage Configuration
- [ ] Upload service account key to deployment platform
- [ ] Set GCS_KEY_FILE environment variable
- [ ] Test image upload from deployed app
- [ ] Verify images are accessible publicly

### 5. Payment Gateway
- [ ] Update Razorpay webhook URL with deployed backend URL
- [ ] Test payment flow on deployed app
- [ ] Verify order creation in database
- [ ] Check email notifications

### 6. Email Configuration
- [ ] Test forgot password flow
- [ ] Test order confirmation emails
- [ ] Verify PDF attachments in emails
- [ ] Check spam folder if emails not received

### 7. SSL/HTTPS
- [ ] Verify SSL certificate is active (auto on Render)
- [ ] Test HTTPS access
- [ ] Update all HTTP URLs to HTTPS
- [ ] Force HTTPS redirect (if needed)

---

## Testing Checklist

### User Flow Testing
- [ ] Homepage loads correctly
- [ ] Product listing displays
- [ ] Product details page works
- [ ] Search functionality works
- [ ] Category filtering works
- [ ] User registration works
- [ ] User login works
- [ ] Forgot password works
- [ ] Reset password works
- [ ] Add to cart works
- [ ] Cart updates correctly
- [ ] Checkout flow works
- [ ] Coupon code applies
- [ ] Payment gateway opens
- [ ] Test payment succeeds
- [ ] Order confirmation email received
- [ ] Order appears in user dashboard
- [ ] Order tracking works

### Admin Flow Testing
- [ ] Admin login works
- [ ] Dashboard analytics display
- [ ] Product management (CRUD) works
- [ ] Category management works
- [ ] Banner management works
- [ ] Order management works
- [ ] Order filters work
- [ ] Export to Excel/PDF works
- [ ] Coupon management works
- [ ] Image upload works
- [ ] Analytics tabs load correctly

### Performance Testing
- [ ] Page load time < 3 seconds
- [ ] Images load quickly
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Works on Chrome
- [ ] Works on Firefox
- [ ] Works on Safari
- [ ] Works on Edge

### Security Testing
- [ ] HTTPS enabled
- [ ] Environment variables not exposed
- [ ] API endpoints protected
- [ ] Admin routes protected
- [ ] SQL injection prevented
- [ ] XSS protection enabled
- [ ] CSRF protection enabled
- [ ] Rate limiting active

---

## Monitoring Setup

### 1. Uptime Monitoring
- [ ] Sign up for UptimeRobot or Pingdom
- [ ] Add backend health check URL
- [ ] Add frontend URL
- [ ] Set up email alerts
- [ ] Set check interval (5 minutes)

### 2. Error Tracking
- [ ] Sign up for Sentry (optional)
- [ ] Install Sentry SDK
- [ ] Configure error reporting
- [ ] Test error capture

### 3. Analytics
- [ ] Verify Google Analytics is tracking
- [ ] Set up conversion goals
- [ ] Monitor user behavior
- [ ] Track page views

### 4. Logs
- [ ] Access deployment platform logs
- [ ] Set up log retention
- [ ] Monitor error logs daily
- [ ] Set up log alerts for critical errors

---

## Optimization

### Performance
- [ ] Enable Gzip compression
- [ ] Optimize images (WebP format)
- [ ] Implement lazy loading
- [ ] Add service worker for caching
- [ ] Use CDN for static assets
- [ ] Minify CSS/JS (auto with build)

### SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt is accessible
- [ ] Add meta descriptions to all pages
- [ ] Optimize page titles
- [ ] Add Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Test with Google PageSpeed Insights

### Database
- [ ] Create indexes for frequently queried fields
- [ ] Enable MongoDB Atlas auto-scaling
- [ ] Set up automated backups
- [ ] Monitor database performance

---

## Launch Preparation

### 1. Final Testing
- [ ] Complete end-to-end testing
- [ ] Test on multiple devices
- [ ] Test on multiple browsers
- [ ] Fix all critical bugs
- [ ] Verify all features work

### 2. Documentation
- [ ] Update README.md
- [ ] Document API endpoints
- [ ] Create user guide (optional)
- [ ] Document admin features

### 3. Backup Plan
- [ ] Database backup created
- [ ] Code repository backed up
- [ ] Environment variables documented
- [ ] Rollback plan ready

### 4. Go Live
- [ ] Switch Razorpay to live mode
- [ ] Update payment keys
- [ ] Announce launch
- [ ] Monitor closely for 24 hours

---

## Post-Launch

### Week 1
- [ ] Monitor error logs daily
- [ ] Check uptime status
- [ ] Review user feedback
- [ ] Fix critical bugs immediately
- [ ] Monitor payment transactions
- [ ] Check email delivery

### Week 2-4
- [ ] Analyze user behavior
- [ ] Optimize slow pages
- [ ] Add requested features
- [ ] Improve based on feedback
- [ ] Scale resources if needed

### Monthly
- [ ] Review analytics
- [ ] Check database size
- [ ] Review costs
- [ ] Update dependencies
- [ ] Security audit
- [ ] Backup verification

---

## Emergency Contacts

- **Hosting Support**: [Platform support email]
- **Database Support**: MongoDB Atlas support
- **Payment Gateway**: Razorpay support
- **Domain Registrar**: [Your registrar]
- **Developer**: [Your contact]

---

## Cost Tracking

| Service | Plan | Monthly Cost |
|---------|------|--------------|
| Render Backend | Free/Paid | $0 / $7 |
| Render Frontend | Free | $0 |
| MongoDB Atlas | Free/M2 | $0 / $9 |
| Google Cloud Storage | Pay-as-you-go | ~$1 |
| Domain | Annual | ~$1/mo |
| **Total** | | **$2-18/mo** |

---

## Success Metrics

- [ ] 99.9% uptime
- [ ] Page load < 3 seconds
- [ ] Zero critical bugs
- [ ] Payment success rate > 95%
- [ ] Email delivery rate > 98%
- [ ] User satisfaction > 4/5

---

## 🎉 Deployment Complete!

Your Wing Hobbies e-commerce platform is now live!

**Next Steps:**
1. Share the URL with stakeholders
2. Monitor for the first 24 hours
3. Gather user feedback
4. Plan next features
5. Celebrate! 🎊
