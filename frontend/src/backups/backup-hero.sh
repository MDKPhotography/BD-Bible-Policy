#!/bin/bash

# Backup HeroPage with timestamp and optional message
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
MESSAGE=${1:-"backup"}

# Clean the message to make it filesystem-safe
SAFE_MESSAGE=$(echo "$MESSAGE" | tr ' ' '_' | tr -cd '[:alnum:]_-')

BACKUP_FILE="src/backups/hero-versions/HeroPage_${TIMESTAMP}_${SAFE_MESSAGE}.js"

cp src/HeroPage.js "$BACKUP_FILE"

echo "✅ Backed up HeroPage to: $BACKUP_FILE"
echo ""
echo "Recent backups:"
ls -lt src/backups/hero-versions/ | head -6