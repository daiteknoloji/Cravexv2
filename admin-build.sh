#!/bin/bash
# Build script for Synapse Admin on Netlify

set -e  # Exit on error

echo "📦 Installing dependencies..."
yarn install

echo "⚙️ Creating config.json..."
# Create config directory if not exists
mkdir -p public

# Replace environment variables in config template
sed "s|\${HOMESERVER_URL}|${HOMESERVER_URL}|g" ../../admin-config.template.json > public/config.json

echo "✅ Config created with Homeserver URL: ${HOMESERVER_URL}"
cat public/config.json

echo "🔨 Building Synapse Admin..."
yarn build

# Copy config to dist directory as well
echo "📋 Copying config to dist directory..."
mkdir -p dist
cp public/config.json dist/config.json

echo "✅ Build complete!"

