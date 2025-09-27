#!/bin/bash

# Secure Environment Setup Script
# This script helps you set up environment variables securely

echo "🔐 BD Bible Secure Environment Setup"
echo "====================================="
echo ""
echo "This script will help you create a .env file with your passwords"
echo "Your passwords will NOT be displayed on screen"
echo ""

# Check if .env exists
if [ -f .env ]; then
    echo "⚠️  .env file already exists!"
    read -p "Do you want to overwrite it? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Exiting without changes."
        exit 0
    fi
fi

# Create .env file
echo "Creating .env file..."
cp .env.example .env

# Function to update .env file
update_env() {
    local key=$1
    local value=$2
    if grep -q "^${key}=" .env; then
        # Use a different delimiter to avoid issues with special characters
        sed -i "s|^${key}=.*|${key}=${value}|" .env
    else
        echo "${key}=${value}" >> .env
    fi
}

# Get database password
echo ""
echo -n "Enter PostgreSQL password (will not be shown): "
read -s DB_PASSWORD
echo ""
update_env "DB_PASSWORD" "$DB_PASSWORD"

# Get sudo password (optional)
echo ""
read -p "Do you want to store sudo password for automated tasks? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -n "Enter sudo password (will not be shown): "
    read -s SUDO_PASSWORD
    echo ""
    update_env "SUDO_PASSWORD" "$SUDO_PASSWORD"
fi

# Generate JWT secret if not provided
echo ""
read -p "Generate random JWT secret? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    JWT_SECRET=$(openssl rand -base64 32)
    update_env "JWT_SECRET" "$JWT_SECRET"
    echo "✅ JWT secret generated"
else
    echo -n "Enter JWT secret (will not be shown): "
    read -s JWT_SECRET
    echo ""
    update_env "JWT_SECRET" "$JWT_SECRET"
fi

# Set proper permissions
chmod 600 .env
echo ""
echo "✅ Environment file created with secure permissions (600)"
echo ""
echo "📝 Summary:"
echo "  - .env file created with your passwords"
echo "  - File permissions set to 600 (read/write for owner only)"
echo "  - Passwords are stored securely and not displayed"
echo ""
echo "⚠️  Important:"
echo "  - Never commit .env to git"
echo "  - Keep your .env file secure"
echo "  - The .env file is already in .gitignore"
echo ""
echo "✨ Setup complete!"