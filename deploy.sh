#!/bin/bash
echo "🚀 Deploying BD-Bible to server..."

# Create tarball
echo "📦 Creating deployment package..."
tar -czf bd-bible.tar.gz --exclude='node_modules' --exclude='.git' --exclude='.DS_Store' .

# Transfer to server
echo "📤 Transferring to server..."
scp bd-bible.tar.gz mike_komorous@192.168.50.2:~/bd-bible/

# Deploy on server
echo "🔧 Building and deploying on server..."
ssh mike_komorous@192.168.50.2 << 'ENDSSH'
cd ~/bd-bible
tar -xzf bd-bible.tar.gz
cd docker
docker-compose build frontend backend
docker-compose up -d
echo "✅ Deployment complete!"
docker-compose ps
ENDSSH

echo "🎉 Done! Access your app at http://192.168.50.2:8081"
