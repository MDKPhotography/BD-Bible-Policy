#!/bin/bash
echo "🔍 BD-Bible-Policy System Status"
echo "================================"

# Check Backend
if curl -s http://localhost:5001/health | grep -q "healthy"; then
    echo "✅ Backend: Running on port 5001"
    DOC_COUNT=$(curl -s http://localhost:5001/api/documents | python3 -c "import sys, json; print(len(json.loads(sys.stdin.read())['documents']))")
    echo "   📄 Documents available: $DOC_COUNT"
else
    echo "❌ Backend: Not running"
fi

# Check Frontend
if lsof -i :3001 > /dev/null 2>&1; then
    echo "✅ Frontend: Running on port 3001"
    echo "   🌐 URL: http://localhost:3001"
else
    echo "❌ Frontend: Not running"
fi

# Get local IP for network sharing
LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)
echo ""
echo "📱 For local network access, share:"
echo "   http://$LOCAL_IP:3001"
