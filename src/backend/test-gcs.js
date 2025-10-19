require('dotenv').config();
const { bucket } = require('./config/gcs');

async function testGCS() {
  try {
    console.log('🔍 Testing Google Cloud Storage connection...');
    console.log('📦 Bucket:', process.env.GCP_BUCKET_NAME);
    
    const [exists] = await bucket.exists();
    
    if (exists) {
      console.log('✅ Bucket exists and is accessible!');
      console.log('🌐 Public URL format: https://storage.googleapis.com/' + process.env.GCP_BUCKET_NAME + '/products/filename.jpg');
    } else {
      console.log('❌ Bucket does not exist. Creating bucket...');
      await bucket.create();
      console.log('✅ Bucket created successfully!');
    }
    
    // Make bucket public
    await bucket.makePublic();
    console.log('✅ Bucket is now public (images will be accessible)');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n📋 SETUP REQUIRED:');
    console.log('1. Go to: https://console.cloud.google.com/iam-admin/iam?project=' + process.env.GCP_PROJECT_ID);
    console.log('2. Find service account: ' + process.env.GCP_CLIENT_EMAIL);
    console.log('3. Click Edit → Add Role → Select "Storage Admin"');
    console.log('4. Enable API: https://console.cloud.google.com/apis/library/storage-api.googleapis.com?project=' + process.env.GCP_PROJECT_ID);
    console.log('\n📖 Full guide: src/backend/setup-gcs-permissions.md');
  }
}

testGCS();
