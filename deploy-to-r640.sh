#!/bin/bash

# Configuration
SERVER_IP="your_r640_server_ip"
DOMAIN="bdbible.local"

# Build and push to your server
echo "Building containers..."
docker-compose -f docker/docker-compose.yml build

echo "Deploying to R640 server..."
docker-compose -f docker/docker-compose.yml up -d

echo "Application deployed!"
echo "Access at: http://${DOMAIN}"
echo "Traefik Dashboard: http://${DOMAIN}:8080"
echo "Portainer: http://${SERVER_IP}:9000"
