# Google Cloud Storage Setup Guide

## Quick Fix: Grant Permissions to Existing Service Account

### Step 1: Go to IAM Console
https://console.cloud.google.com/iam-admin/iam?project=healthy-basis-475512-v4

### Step 2: Find Service Account
Look for: `wing-hobbies-uploader@healthy-basis-475512-v4.iam.gserviceaccount.com`

### Step 3: Grant Storage Admin Role
1. Click the **Edit** (pencil) icon next to the service account
2. Click **+ ADD ANOTHER ROLE**
3. Search for and select: **Storage Admin**
4. Click **SAVE**

### Step 4: Enable Cloud Storage API (if not enabled)
https://console.cloud.google.com/apis/library/storage-api.googleapis.com?project=healthy-basis-475512-v4

Click **ENABLE**

### Step 5: Verify Bucket Exists
https://console.cloud.google.com/storage/browser?project=healthy-basis-475512-v4

- If bucket `wing-hobbies-products` doesn't exist, create it:
  - Click **CREATE BUCKET**
  - Name: `wing-hobbies-products`
  - Location: `asia-south1` (Mumbai)
  - Storage class: **Standard**
  - Access control: **Fine-grained**
  - Click **CREATE**

### Step 6: Make Bucket Public (for image access)
1. Go to bucket: https://console.cloud.google.com/storage/browser/wing-hobbies-products
2. Click **PERMISSIONS** tab
3. Click **+ GRANT ACCESS**
4. New principals: `allUsers`
5. Role: **Storage Object Viewer**
6. Click **SAVE**
7. Click **ALLOW PUBLIC ACCESS**

---

## Alternative: Use gcloud CLI (Advanced)

```bash
# Grant Storage Admin role
gcloud projects add-iam-policy-binding healthy-basis-475512-v4 \
  --member="serviceAccount:wing-hobbies-uploader@healthy-basis-475512-v4.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

# Create bucket (if doesn't exist)
gsutil mb -p healthy-basis-475512-v4 -l asia-south1 gs://wing-hobbies-products

# Make bucket public
gsutil iam ch allUsers:objectViewer gs://wing-hobbies-products
```

---

## After Setup: Test Connection

Run this command in your backend folder:
```bash
node test-gcs.js
```

You should see:
```
✅ Bucket exists and is accessible!
✅ Bucket is now public (images will be accessible)
```

---

## Restart Your Backend Server

After permissions are granted:
```bash
cd src/backend
node server.js
```

Now product images will be stored in Google Cloud Storage permanently! 🎉
