#!/bin/bash
# Build script for Element Web on Netlify

# Replace environment variables in config template
sed "s|\${HOMESERVER_URL}|${HOMESERVER_URL}|g" ../../element-web-config.template.json | \
sed "s|\${HOMESERVER_NAME}|${HOMESERVER_NAME}|g" > webapp/config.json

echo "✅ Config created with:"
echo "   Homeserver URL: ${HOMESERVER_URL}"
echo "   Server Name: ${HOMESERVER_NAME}"

# Build the app
yarn install && yarn build

