#!/bin/bash

# Database Installation Script for BD Bible
# This script installs PostgreSQL and Redis

echo "🚀 BD Bible Database Installation Script"
echo "========================================"
echo ""

# Source the .env file if it exists
if [ -f ~/.bd-bible/.env ]; then
    export $(grep -v '^#' ~/.bd-bible/.env | xargs)
fi

# Function to run sudo commands
run_sudo() {
    if [ -n "$SUDO_PASSWORD" ]; then
        echo "$SUDO_PASSWORD" | sudo -S $@
    else
        echo "⚠️  No sudo password found in .env file"
        echo "Please run: ./setup-env.sh first to set up your passwords"
        exit 1
    fi
}

# Check if we have sudo password
if [ -z "$SUDO_PASSWORD" ]; then
    echo "⚠️  SUDO_PASSWORD not found in .env file"
    echo "Please run ./setup-env.sh to configure your passwords"
    exit 1
fi

echo "📦 Step 1: Updating package list..."
run_sudo apt update

echo ""
echo "🐘 Step 2: Installing PostgreSQL..."
run_sudo apt install -y postgresql postgresql-contrib

echo ""
echo "✅ Step 3: Checking PostgreSQL status..."
run_sudo systemctl status postgresql --no-pager | head -10

echo ""
echo "🔧 Step 4: Setting up PostgreSQL database..."
# Create database setup script
cat > /tmp/setup_db.sql << EOF
CREATE DATABASE bd_bible;
CREATE USER bd_bible_user WITH ENCRYPTED PASSWORD '${DB_PASSWORD:-changeme}';
GRANT ALL PRIVILEGES ON DATABASE bd_bible TO bd_bible_user;
ALTER DATABASE bd_bible OWNER TO bd_bible_user;
\q
EOF

# Run the setup script
run_sudo -u postgres psql < /tmp/setup_db.sql
rm /tmp/setup_db.sql

echo ""
echo "🔴 Step 5: Installing Redis..."
run_sudo apt install -y redis-server

echo ""
echo "✅ Step 6: Checking Redis status..."
run_sudo systemctl status redis --no-pager | head -10

echo ""
echo "📁 Step 7: Creating PDFs folder..."
mkdir -p ~/bd-bible/backend/data/pdfs
echo "Created: ~/bd-bible/backend/data/pdfs"

echo ""
echo "📝 Step 8: Creating backend .env file..."
cat > ~/bd-bible/backend/.env << EOF
# Database Configuration
DATABASE_URL=postgresql://bd_bible_user:${DB_PASSWORD:-changeme}@localhost:5432/bd_bible
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bd_bible
DB_USER=bd_bible_user
DB_PASSWORD=${DB_PASSWORD:-changeme}

# Redis Configuration
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=${JWT_SECRET:-your_jwt_secret_here}

# Server Configuration
PORT=5001
NODE_ENV=development

# API Configuration
API_URL=http://localhost:5001
EOF

echo "✅ Backend .env file created at ~/bd-bible/backend/.env"

echo ""
echo "🎉 Installation Complete!"
echo ""
echo "📊 Summary:"
echo "  ✅ PostgreSQL installed and configured"
echo "  ✅ Database 'bd_bible' created"
echo "  ✅ User 'bd_bible_user' created"
echo "  ✅ Redis installed and running"
echo "  ✅ PDFs folder created"
echo "  ✅ Backend .env file configured"
echo ""
echo "🔄 Next Steps:"
echo "  1. Restart the backend: pm2 restart bd-bible-backend"
echo "  2. Check logs: pm2 logs bd-bible-backend"
echo "  3. Test the connection: curl http://localhost:5001/health"
echo ""
echo "⚠️  Remember to keep your .env files secure!"