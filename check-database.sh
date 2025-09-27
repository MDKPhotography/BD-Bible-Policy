#!/bin/bash

echo "🔍 Checking PostgreSQL Database Setup..."
echo "======================================="
echo ""

# Test connection as bd_bible_user
echo "Testing database connection..."
export PGPASSWORD='your_secure_password_here'

if psql -h localhost -U bd_bible_user -d bd_bible -c "SELECT current_database(), current_user, version();" 2>/dev/null; then
    echo ""
    echo "✅ Database connection successful!"
    echo ""

    # Check if we can create tables
    psql -h localhost -U bd_bible_user -d bd_bible -c "
    CREATE TABLE IF NOT EXISTS test_connection (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    DROP TABLE IF EXISTS test_connection;
    " 2>/dev/null

    if [ $? -eq 0 ]; then
        echo "✅ Database permissions are correct (can create/drop tables)"
    else
        echo "⚠️  Database exists but permissions may need adjustment"
    fi
else
    echo "❌ Could not connect to database"
    echo "   This could mean:"
    echo "   1. Database doesn't exist yet - run: sudo -u postgres psql < /tmp/bd_bible_setup.sql"
    echo "   2. Wrong password in backend/.env file"
    echo "   3. User doesn't exist"
fi

echo ""
echo "📋 Quick Database Info:"
sudo -u postgres psql -c "\l" 2>/dev/null | grep bd_bible || echo "Database bd_bible not found"
sudo -u postgres psql -c "\du" 2>/dev/null | grep bd_bible_user || echo "User bd_bible_user not found"

unset PGPASSWORD