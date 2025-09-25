#!/bin/bash

# Simple deployment script for BD-SOP
# Run this on your server to update the application

echo "🚀 Starting BD-SOP Deployment..."

# Navigate to project directory
cd /path/to/BD-Bible-Policy || exit

# Pull latest changes
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# Navigate to frontend
cd frontend || exit

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Restart the application
echo "🔄 Restarting application..."
if command -v pm2 &> /dev/null; then
    pm2 restart bd-sop-frontend || pm2 start npm --name "bd-sop-frontend" -- start
else
    # If PM2 is not installed, try to restart with systemctl or just npm
    if systemctl is-active --quiet bd-sop; then
        sudo systemctl restart bd-sop
    else
        echo "⚠️  PM2 not found. Starting with npm..."
        npm start &
    fi
fi

echo "✅ Deployment complete!"
