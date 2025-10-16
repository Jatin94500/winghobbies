# Deployment Guide

## Build for Production

### Create Production Build

```bash
npm run build
```

This creates an optimized production build in the `build/` folder:

```
build/
├── static/
│   ├── css/
│   │   └── main.[hash].css
│   ├── js/
│   │   └── main.[hash].js
│   └── media/
├── index.html
├── favicon.ico
└── robots.txt
```

### Build Optimization

The production build includes:
- Minified JavaScript and CSS
- Optimized images
- Code splitting
- Tree shaking
- Source maps (optional)
- Service worker (optional)

## Deployment Options

### 1. Vercel (Recommended)

**Automatic Deployment**

1. Push code to GitHub
2. Import project in Vercel
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Deploy

**Manual Deployment**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Configuration** (`vercel.json`):

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

### 2. Netlify

**Automatic Deployment**

1. Connect GitHub repository
2. Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `build`
3. Deploy

**Manual Deployment**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy

# Production deployment
netlify deploy --prod
```

**Configuration** (`netlify.toml`):

```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 3. AWS S3 + CloudFront

**Setup S3 Bucket**

```bash
# Create bucket
aws s3 mb s3://Wing-hobbies

# Enable static website hosting
aws s3 website s3://Wing-hobbies \
  --index-document index.html \
  --error-document index.html
```

**Upload Build**

```bash
# Build project
npm run build

# Upload to S3
aws s3 sync build/ s3://Wing-hobbies \
  --delete \
  --cache-control max-age=31536000,public
```

**CloudFront Configuration**

1. Create CloudFront distribution
2. Set origin to S3 bucket
3. Configure custom error responses:
   - 403 → /index.html (200)
   - 404 → /index.html (200)
4. Enable HTTPS
5. Set custom domain (optional)

---

### 4. Firebase Hosting

**Install Firebase CLI**

```bash
npm install -g firebase-tools
```

**Initialize Firebase**

```bash
firebase login
firebase init hosting
```

**Configuration** (`firebase.json`):

```json
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

**Deploy**

```bash
npm run build
firebase deploy
```

---

### 5. GitHub Pages

**Install gh-pages**

```bash
npm install --save-dev gh-pages
```

**Update package.json**

```json
{
  "homepage": "https://username.github.io/Wing-hobbies",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

**Deploy**

```bash
npm run deploy
```

---

## Docker Deployment

### Dockerfile

**Location**: `Dockerfile`

```dockerfile
# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration

**Location**: `nginx.conf`

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### Build Docker Image

```bash
docker build -t Wing-hobbies:latest .
```

### Run Container

```bash
docker run -d -p 80:80 --name Wing-hobbies Wing-hobbies:latest
```

### Docker Compose

**Location**: `docker-compose.yml`

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

**Run with Docker Compose**

```bash
docker-compose up -d
```

---

## Environment Variables

### Development

**Location**: `.env`

```env
REACT_APP_NAME=Wing Hobbies
REACT_APP_VERSION=1.0.0
REACT_APP_API_URL=http://localhost:5000/api
```

### Production

Set environment variables in hosting platform:

**Vercel**
```bash
vercel env add REACT_APP_API_URL
```

**Netlify**
```bash
netlify env:set REACT_APP_API_URL https://api.Winghobbies.com
```

**AWS**
```bash
aws ssm put-parameter \
  --name /Wing-hobbies/api-url \
  --value https://api.Winghobbies.com \
  --type String
```

---

## Custom Domain

### DNS Configuration

Add DNS records:

```
Type    Name    Value
A       @       <server-ip>
CNAME   www     <hosting-domain>
```

### SSL Certificate

**Let's Encrypt (Free)**

```bash
# Install Certbot
sudo apt-get install certbot

# Generate certificate
sudo certbot certonly --standalone -d Winghobbies.com -d www.Winghobbies.com
```

**Cloudflare (Free)**

1. Add site to Cloudflare
2. Update nameservers
3. Enable SSL (Full)
4. Enable Always Use HTTPS

---

## Performance Optimization

### 1. Enable Compression

**Nginx**
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

**Apache**
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

### 2. Cache Static Assets

**Nginx**
```nginx
location /static/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

**Apache**
```apache
<FilesMatch "\.(css|js|jpg|png|gif|svg)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

### 3. Enable HTTP/2

**Nginx**
```nginx
listen 443 ssl http2;
```

**Apache**
```apache
Protocols h2 http/1.1
```

### 4. CDN Integration

Use CDN for static assets:

```javascript
// Update image URLs
const CDN_URL = 'https://cdn.Winghobbies.com';
const imageUrl = `${CDN_URL}/products/${product.id}.jpg`;
```

---

## Monitoring & Analytics

### 1. Google Analytics

Add to `public/index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Error Tracking (Sentry)

```bash
npm install @sentry/react
```

```javascript
// src/index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
});
```

### 3. Performance Monitoring

```javascript
// src/index.js
import { reportWebVitals } from './reportWebVitals';

reportWebVitals(console.log);
```

---

## CI/CD Pipeline

### GitHub Actions

**Location**: `.github/workflows/deploy.yml`

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## Rollback Strategy

### Vercel

```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback <deployment-url>
```

### Docker

```bash
# Tag previous version
docker tag Wing-hobbies:latest Wing-hobbies:backup

# Rollback
docker stop Wing-hobbies
docker rm Wing-hobbies
docker run -d -p 80:80 --name Wing-hobbies Wing-hobbies:backup
```

---

## Security Checklist

- [ ] Enable HTTPS
- [ ] Set security headers
- [ ] Configure CORS
- [ ] Remove console.logs
- [ ] Obfuscate code
- [ ] Set up rate limiting
- [ ] Enable DDoS protection
- [ ] Regular security audits
- [ ] Update dependencies

### Security Headers

**Nginx**
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

---

## Post-Deployment

### 1. Verify Deployment

- [ ] Homepage loads correctly
- [ ] All routes work
- [ ] Images load
- [ ] Forms submit
- [ ] Cart functionality
- [ ] Mobile responsive
- [ ] SSL certificate valid

### 2. Test Performance

```bash
# Lighthouse audit
npm install -g lighthouse
lighthouse https://Winghobbies.com --view
```

### 3. Monitor Logs

```bash
# Vercel
vercel logs

# Netlify
netlify logs

# Docker
docker logs Wing-hobbies
```

### 4. Set Up Alerts

Configure alerts for:
- Downtime
- High error rates
- Slow response times
- SSL expiry

---

## Maintenance

### Regular Updates

```bash
# Update dependencies
npm update

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### Backup Strategy

- Daily database backups
- Weekly full backups
- Store backups in multiple locations
- Test restore procedures

### Monitoring Checklist

- [ ] Uptime monitoring
- [ ] Performance metrics
- [ ] Error tracking
- [ ] User analytics
- [ ] Server resources
- [ ] SSL certificate expiry
