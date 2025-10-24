# Simplified Synapse Dockerfile for Railway
FROM matrixdotorg/synapse:latest

# Create data directory
RUN mkdir -p /data

# Copy PostgreSQL configuration
COPY homeserver-postgres.yaml /data/homeserver.yaml

# Generate signing key if not exists
RUN if [ ! -f /data/signing.key ]; then \
    python -m synapse.app.homeserver \
    --config-path=/data/homeserver.yaml \
    --generate-keys; \
    fi

# Expose Synapse port
EXPOSE 8008

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s \
  CMD curl -f http://localhost:8008/health || exit 1

# Start Synapse
CMD ["/start.py"]

