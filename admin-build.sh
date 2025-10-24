#!/bin/bash
# Build script for Synapse Admin on Netlify

# Create config directory if not exists
mkdir -p public

# Replace environment variables in config template
sed "s|\${HOMESERVER_URL}|${HOMESERVER_URL}|g" ../../admin-config.template.json > public/config.json

echo "✅ Config created with Homeserver URL: ${HOMESERVER_URL}"

# Build the app
yarn install && yarn build

