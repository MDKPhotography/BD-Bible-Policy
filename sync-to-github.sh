#!/bin/bash

# BD Bible GitHub Sync Script
# This script automatically syncs local changes to GitHub

echo "🔄 Starting GitHub sync for BD Bible..."

# Navigate to project directory
cd ~/bd-bible || exit

# Check git status
echo "📊 Checking git status..."
git status

# Add all changes
echo "➕ Adding all changes..."
git add .

# Commit with timestamp
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
echo "💾 Committing changes..."
git commit -m "Auto-sync: $TIMESTAMP"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

echo "✅ Sync complete!"