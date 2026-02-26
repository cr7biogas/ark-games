#!/bin/bash
# ARK Games - Safe Deploy Script
# Esegue test automatici PRIMA del deploy

set -e

echo "🧪 Running pre-deploy tests..."

# Start local server for testing
cd public
npx serve -l 3456 &
SERVER_PID=$!
sleep 2

# Run tests
cd ..
if node test-before-deploy.js http://localhost:3456; then
  echo ""
  echo "✅ Tests passed! Deploying..."
  kill $SERVER_PID 2>/dev/null || true
  
  cd public
  vercel --prod --yes
  vercel alias $(vercel ls --json | jq -r '.[0].url') ark-games.vercel.app
  
  echo ""
  echo "🚀 Deploy completed!"
else
  echo ""
  echo "❌ Tests FAILED! Deploy aborted."
  kill $SERVER_PID 2>/dev/null || true
  exit 1
fi
