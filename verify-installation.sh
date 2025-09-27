#!/bin/bash

echo "🔍 BD Bible Database Installation Verification"
echo "============================================="
echo ""

# Check PostgreSQL
echo "📊 Checking PostgreSQL..."
if command -v psql &> /dev/null; then
    echo "✅ PostgreSQL is installed"
    psql --version

    # Check if service is running
    if systemctl is-active --quiet postgresql; then
        echo "✅ PostgreSQL service is running"
    else
        echo "❌ PostgreSQL service is not running"
        echo "   Run: sudo systemctl start postgresql"
    fi
else
    echo "❌ PostgreSQL is not installed"
fi

echo ""

# Check Redis
echo "🔴 Checking Redis..."
if command -v redis-cli &> /dev/null; then
    echo "✅ Redis is installed"
    redis-cli --version

    # Check if service is running
    if systemctl is-active --quiet redis-server || systemctl is-active --quiet redis; then
        echo "✅ Redis service is running"

        # Test Redis connection
        if redis-cli ping 2>/dev/null | grep -q PONG; then
            echo "✅ Redis is responding to ping"
        else
            echo "⚠️  Redis is running but not responding to ping"
        fi
    else
        echo "❌ Redis service is not running"
        echo "   Run: sudo systemctl start redis-server"
    fi
else
    echo "❌ Redis is not installed"
fi

echo ""

# Check database existence
echo "🗄️ Checking PostgreSQL database..."
if sudo -u postgres psql -lqt 2>/dev/null | cut -d \| -f 1 | grep -qw bd_bible; then
    echo "✅ Database 'bd_bible' exists"

    # Check user existence
    if sudo -u postgres psql -c "\du" 2>/dev/null | grep -q bd_bible_user; then
        echo "✅ User 'bd_bible_user' exists"
    else
        echo "❌ User 'bd_bible_user' does not exist"
    fi
else
    echo "❌ Database 'bd_bible' does not exist"
    echo "   Run: sudo -u postgres psql < /tmp/bd_bible_setup.sql"
fi

echo ""

# Check backend
echo "🚀 Checking backend status..."
if npx pm2 list 2>/dev/null | grep -q bd-bible-backend; then
    if npx pm2 list 2>/dev/null | grep bd-bible-backend | grep -q online; then
        echo "✅ Backend is running in PM2"
    else
        echo "❌ Backend is stopped in PM2"
        echo "   Run: npx pm2 restart bd-bible-backend"
    fi
else
    echo "❌ Backend not found in PM2"
    echo "   Run: npx pm2 start backend/src/index.js --name bd-bible-backend"
fi

# Test API
if curl -s http://localhost:5001/health | grep -q healthy; then
    echo "✅ Backend API is responding"
else
    echo "❌ Backend API is not responding"
fi

echo ""
echo "📈 Summary:"
echo "-----------"

# Final summary
if command -v psql &> /dev/null && \
   command -v redis-cli &> /dev/null && \
   systemctl is-active --quiet postgresql && \
   (systemctl is-active --quiet redis-server || systemctl is-active --quiet redis) && \
   curl -s http://localhost:5001/health | grep -q healthy; then
    echo "🎉 Everything is installed and running correctly!"
    echo ""
    echo "Next steps:"
    echo "1. Your backend is connected to the databases"
    echo "2. Default login: admin@gmu.edu / admin123"
    echo "3. Frontend: http://localhost:3001"
    echo "4. Backend API: http://localhost:5001"
else
    echo "⚠️  Some components need attention. Check the issues above."
fi