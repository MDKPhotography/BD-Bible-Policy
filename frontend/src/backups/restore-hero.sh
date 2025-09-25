#!/bin/bash

# List available backups and restore selected one
echo "Available HeroPage backups:"
echo "=========================="

# List backups with numbers
select BACKUP in src/backups/hero-versions/*.js; do
  if [ -n "$BACKUP" ]; then
    # First backup current version
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    cp src/HeroPage.js "src/backups/hero-versions/HeroPage_${TIMESTAMP}_before_restore.js"

    # Restore selected backup
    cp "$BACKUP" src/HeroPage.js

    echo "✅ Restored: $BACKUP"
    echo "📦 Current version backed up as: HeroPage_${TIMESTAMP}_before_restore.js"
    break
  else
    echo "Invalid selection. Please try again."
  fi
done