#!/bin/bash
# Deploy script for BD-Bible

echo "🚀 Deploying BD-Bible to server..."

# Commit and push any uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo "📝 Committing changes..."
    git add .
    git commit -m "Auto-deploy: $(date '+%Y-%m-%d %H:%M')"
    git push
fi

# Create tarball
echo "📦 Creating deployment package..."
tar -czf bd-bible.tar.gz --exclude='node_modules' --exclude='.git' --exclude='*.docx' --exclude='.DS_Store' .

# Transfer to server
echo "📤 Transferring to server..."
scp bd-bible.tar.gz mike_komorous@192.168.50.2:~/bd-bible/

# Deploy on server
echo "🔧 Building and deploying on server..."
ssh mike_komorous@192.168.50.2 << 'ENDSSH'
cd ~/bd-bible
tar -xzf bd-bible.tar.gz
cd docker
docker-compose build
docker-compose up -d
docker-compose ps
echo "✅ Deployment complete!"
ENDSSH

echo "🎉 Done! Access your app at http://192.168.50.2:8081"
