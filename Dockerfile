# Simplified Synapse Dockerfile for Railway
FROM matrixdotorg/synapse:latest

# Copy PostgreSQL configuration to config directory
COPY homeserver-postgres.yaml /data/homeserver.yaml

# Expose Synapse port
EXPOSE 8008

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s \
  CMD curl -f http://localhost:8008/health || exit 1

# Start Synapse (will auto-generate signing key on first run)
CMD ["/start.py"]

