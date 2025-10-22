# Main Dockerfile for Railway
# This is a placeholder - Railway will use railway.toml configuration

FROM python:3.9-alpine

# Install basic tools
RUN apk add --no-cache curl

# Create a simple HTTP server
WORKDIR /app

# Create a simple index.html
RUN echo '<html><head><title>Railway Monorepo</title></head><body><h1>Railway Monorepo</h1><p>This project uses railway.toml for multi-service deployment.</p><p>Services: Synapse, Element Web, Admin Panel</p></body></html>' > index.html

# Expose port
EXPOSE 80

# Start a simple HTTP server
CMD ["python", "-m", "http.server", "80"]
