#!/bin/bash
echo "📦 Pulling latest from GitHub..."
git pull origin main
echo "🔨 Rebuilding Docker containers..."
cd docker
docker-compose build
docker-compose up -d
echo "✅ Update complete!"
docker-compose ps
