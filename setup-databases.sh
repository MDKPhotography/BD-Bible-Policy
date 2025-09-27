#!/bin/bash

# BD Bible Database Setup Script
# Run this AFTER installing PostgreSQL and Redis

echo "🗄️ BD Bible Database Setup"
echo "=========================="
echo ""
echo "This script will create your PostgreSQL database and user"
echo ""

# Create SQL file for database setup
cat > /tmp/bd_bible_setup.sql << 'EOF'
-- Create database
CREATE DATABASE bd_bible;

-- Create user with password
CREATE USER bd_bible_user WITH ENCRYPTED PASSWORD 'your_secure_password_here';

-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE bd_bible TO bd_bible_user;

-- Make user owner of database
ALTER DATABASE bd_bible OWNER TO bd_bible_user;

-- Connect to bd_bible database
\c bd_bible;

-- Grant schema permissions
GRANT ALL ON SCHEMA public TO bd_bible_user;
EOF

echo "📝 SQL setup file created at /tmp/bd_bible_setup.sql"
echo ""
echo "To set up your database, run:"
echo "  sudo -u postgres psql < /tmp/bd_bible_setup.sql"
echo ""
echo "Or manually in PostgreSQL:"
echo "  sudo -u postgres psql"
echo "  Then paste the commands from /tmp/bd_bible_setup.sql"
echo ""
echo "After database setup, restart the backend:"
echo "  pm2 restart bd-bible-backend"
echo "  pm2 logs bd-bible-backend --lines 20"