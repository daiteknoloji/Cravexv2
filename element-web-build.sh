#!/bin/bash
# Build script for Element Web on Netlify

set -e  # Exit on error

echo "📦 Installing dependencies..."
yarn install

echo "🔨 Building Element Web..."
yarn build

echo "⚙️ Creating config.json..."
# Replace environment variables in config template
sed "s|\${HOMESERVER_URL}|${HOMESERVER_URL}|g" ../../element-web-config.template.json | \
sed "s|\${HOMESERVER_NAME}|${HOMESERVER_NAME}|g" > webapp/config.json

echo "✅ Config created with:"
echo "   Homeserver URL: ${HOMESERVER_URL}"
echo "   Server Name: ${HOMESERVER_NAME}"

# Verify config was created
if [ -f webapp/config.json ]; then
    echo "✅ Config file exists at webapp/config.json"
    cat webapp/config.json
else
    echo "❌ ERROR: Config file not created!"
    exit 1
fi

