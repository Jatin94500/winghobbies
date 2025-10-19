const { Storage } = require('@google-cloud/storage');

let storage, bucket;

try {
  storage = new Storage();
  bucket = storage.bucket(process.env.GCP_BUCKET_NAME || 'wing-hobbies-products');
  console.log('✅ Google Cloud Storage initialized');
} catch (error) {
  console.log('⚠️  GCS not configured, using local storage');
  storage = null;
  bucket = null;
}

module.exports = { storage, bucket };
