#!/bin/bash

echo "🚀 Deploying Sleeper League Finder to Cloudflare Workers..."

# Check if user is logged in to Cloudflare
if ! npx wrangler whoami &> /dev/null; then
    echo "🔐 Please log in to Cloudflare..."
    npx wrangler login
fi

# Deploy the application
echo "📦 Deploying application..."
npx wrangler deploy --env production

echo "✅ Deployment complete!"
echo "🌐 Your application should now be live at the URL provided above."
