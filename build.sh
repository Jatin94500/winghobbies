#!/bin/bash
echo "Installing dependencies..."
npm install

echo "Installing backend dependencies..."
npm install express mongoose cors helmet express-rate-limit express-session passport passport-local passport-google-oauth20 bcryptjs jsonwebtoken dotenv multer @google-cloud/storage razorpay xlsx

echo "Build complete!"
