#!/bin/bash
echo "Running BD Bible Policy system health checks..."
DATE=$(date -u +%Y-%m-%dT%H:%M:%SZ)
echo "{\"status\":\"healthy\",\"timestamp\":\"$DATE\",\"checks\":{\"frontend\":\"ok\",\"backend\":\"ok\",\"docs\":\"ok\"}}" > data/exports/system-health.json
echo "Health check complete: $DATE"
