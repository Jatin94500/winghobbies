# ☁️ Google Cloud Storage Setup - Wing Hobbies

## 🎯 What Changed
- ✅ Created GCS configuration (`src/backend/config/gcs.js`)
- ✅ Created GCS upload route (`src/backend/routes/upload.js`)
- ✅ Updated server.js to use cloud storage
- ✅ Images will now persist permanently in Google Cloud

## 🚀 Quick Setup (2 minutes)

### Step 1: Grant Permissions
1. Open: https://console.cloud.google.com/iam-admin/iam?project=healthy-basis-475512-v4
2. Find: `wing-hobbies-uploader@healthy-basis-475512-v4.iam.gserviceaccount.com`
3. Click **Edit** → **Add Role** → Select **"Storage Admin"**
4. Click **Save**

### Step 2: Enable Storage API
1. Open: https://console.cloud.google.com/apis/library/storage-api.googleapis.com?project=healthy-basis-475512-v4
2. Click **ENABLE**

### Step 3: Create & Configure Bucket
1. Open: https://console.cloud.google.com/storage/browser?project=healthy-basis-475512-v4
2. Click **CREATE BUCKET**
   - Name: `wing-hobbies-products`
   - Location: `asia-south1` (Mumbai)
   - Storage class: **Standard**
   - Click **CREATE**
3. Click bucket → **PERMISSIONS** tab → **GRANT ACCESS**
   - New principals: `allUsers`
   - Role: **Storage Object Viewer**
   - Click **SAVE** → **ALLOW PUBLIC ACCESS**

### Step 4: Test Connection
```bash
cd src/backend
node test-gcs.js
```

Expected output:
```
✅ Bucket exists and is accessible!
✅ Bucket is now public (images will be accessible)
```

### Step 5: Restart Backend
```bash
node server.js
```

## 📸 How It Works Now

### Before (Local Storage)
```
Product Image → uploads/products/image.jpg → ❌ Deleted on refresh
```

### After (Cloud Storage)
```
Product Image → Google Cloud Storage → ✅ Permanent URL
Example: https://storage.googleapis.com/wing-hobbies-products/products/1234567890-drone.jpg
```

## 💰 Cost Estimate
- Storage: ~1GB = ₹1.50/month
- Bandwidth: ~5GB = ₹40/month
- **Total: ~₹50-100/month** for small store

## 🔧 Technical Details

### Upload Endpoint
- **Single**: `POST /api/upload/single` (form-data: image)
- **Multiple**: `POST /api/upload/multiple` (form-data: images[])

### Response Format
```json
{
  "success": true,
  "url": "https://storage.googleapis.com/wing-hobbies-products/products/1234567890-image.jpg"
}
```

### Environment Variables Used
```env
GCP_PROJECT_ID=healthy-basis-475512-v4
GCP_BUCKET_NAME=wing-hobbies-products
GCP_CLIENT_EMAIL=wing-hobbies-uploader@healthy-basis-475512-v4.iam.gserviceaccount.com
GCP_PRIVATE_KEY=<your-private-key>
```

## ✅ Benefits
- ✅ Images persist permanently (no deletion on refresh)
- ✅ Fast CDN delivery via Google's network
- ✅ Scalable (handles millions of images)
- ✅ Secure (IAM-based access control)
- ✅ Cost-effective (~₹50-100/month)

## 📚 Additional Resources
- Detailed setup: `src/backend/setup-gcs-permissions.md`
- Test script: `src/backend/test-gcs.js`
- GCS config: `src/backend/config/gcs.js`
- Upload route: `src/backend/routes/upload.js`

---

**Need help?** Check `setup-gcs-permissions.md` for detailed instructions.
