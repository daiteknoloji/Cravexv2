# Simplified Synapse Dockerfile for Railway
FROM matrixdotorg/synapse:latest

# Copy PostgreSQL configuration to config directory
COPY homeserver-postgres.yaml /data/homeserver.yaml

# Expose Synapse port
EXPOSE 8008

# Synapse image already has correct ENTRYPOINT/CMD, no need to override

