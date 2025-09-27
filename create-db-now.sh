#!/bin/bash

echo "🔄 Creating BD Bible Database..."
echo "================================"
echo ""

# Create a SQL file with all commands
cat > /tmp/create_bd_bible.sql << 'EOF'
-- Drop database if exists (for fresh start)
DROP DATABASE IF EXISTS bd_bible;

-- Create database
CREATE DATABASE bd_bible;

-- Drop user if exists
DROP USER IF EXISTS bd_bible_user;

-- Create user with password
CREATE USER bd_bible_user WITH ENCRYPTED PASSWORD 'your_secure_password_here';

-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE bd_bible TO bd_bible_user;

-- Make user owner of database
ALTER DATABASE bd_bible OWNER TO bd_bible_user;
EOF

echo "Running database creation..."
sudo -u postgres psql < /tmp/create_bd_bible.sql

echo ""
echo "Setting schema permissions..."
sudo -u postgres psql -d bd_bible -c "GRANT ALL ON SCHEMA public TO bd_bible_user;"

echo ""
echo "✅ Database setup complete!"
echo ""
echo "Verifying..."
sudo -u postgres psql -c "\l" | grep bd_bible
sudo -u postgres psql -c "\du" | grep bd_bible_user

echo ""
echo "Next steps:"
echo "1. Restart backend: npx pm2 restart bd-bible-backend"
echo "2. Check logs: npx pm2 logs bd-bible-backend"