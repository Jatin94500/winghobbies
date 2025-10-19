const admin = require('firebase-admin');

// Only initialize Firebase Admin SDK when required environment variables
// are present. In environments where these are not set (for example a
// simple Cloud Run deployment without Firebase), we export a safe stub
// so the app can continue to run and health checks succeed.
const requiredVars = [
  'FIREBASE_PROJECT_ID',
  'FIREBASE_PRIVATE_KEY',
  'FIREBASE_CLIENT_EMAIL'
];

const hasFirebaseConfig = requiredVars.every((k) => !!process.env[k]);

let db = null;
let firebaseAdmin = null;

if (!hasFirebaseConfig) {
  console.warn('⚠️  Firebase environment variables not fully set. Skipping Firebase Admin initialization.');
} else {
  try {
    const serviceAccount = {
      type: 'service_account',
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token'
    };

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      });
    }

    firebaseAdmin = admin;
    db = admin.firestore();
    console.log('✅ Firebase Admin initialized');
  } catch (err) {
    console.error('❌ Failed to initialize Firebase Admin:', err && err.message ? err.message : err);
    console.warn('⚠️  Continuing without Firebase. Some features may be disabled.');
  }
}

module.exports = { admin: firebaseAdmin, db };