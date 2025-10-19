#!/bin/bash

echo "🚀 Deploying Wing Hobbies to Render..."

# Check if git is initialized
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit for deployment"
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

echo "✅ Code pushed to GitHub"
echo ""
echo "Next steps:"
echo "1. Go to https://dashboard.render.com/"
echo "2. Create a new Web Service for backend"
echo "3. Create a new Static Site for frontend"
echo "4. Add environment variables from .env.example"
echo "5. Deploy!"
