#!/bin/bash
echo "Starting BD-Bible-Policy locally..."
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"

# Start backend
cd backend && npm start &
BACKEND_PID=$!

# Start frontend
cd ../frontend && npm start &
FRONTEND_PID=$!

echo "Press Ctrl+C to stop both servers"
wait
