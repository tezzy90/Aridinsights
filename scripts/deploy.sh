#!/bin/bash

# Deploy AridInsights to Google Cloud Run
# Prerequisites:
# 1. gcloud CLI installed and authenticated
# 2. Cloud SQL instance created
# 3. Service account with necessary permissions

set -e

# Configuration
PROJECT_ID="${GCP_PROJECT_ID}"
REGION="${GCP_REGION:-us-central1}"
SERVICE_NAME="aridinsights"
CLOUD_SQL_INSTANCE="${CLOUD_SQL_INSTANCE}"

echo "Deploying AridInsights to Cloud Run..."

# Build the container image
echo "Building container image..."
gcloud builds submit --tag gcr.io/${PROJECT_ID}/${SERVICE_NAME}

# Deploy to Cloud Run with Cloud SQL connection
echo "Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
  --image gcr.io/${PROJECT_ID}/${SERVICE_NAME} \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --add-cloudsql-instances ${CLOUD_SQL_INSTANCE} \
  --set-env-vars "DB_HOST=/cloudsql/${CLOUD_SQL_INSTANCE}" \
  --set-env-vars "GCP_PROJECT_ID=${PROJECT_ID}" \
  --set-env-vars "GCP_REGION=${REGION}" \
  --set-secrets "DB_USER=DB_USER:latest" \
  --set-secrets "DB_PASSWORD=DB_PASSWORD:latest" \
  --set-secrets "DB_NAME=DB_NAME:latest" \
  --memory 1Gi \
  --cpu 1 \
  --timeout 300 \
  --max-instances 10

echo "Deployment complete!"
echo "Your application is now running at:"
gcloud run services describe ${SERVICE_NAME} --region ${REGION} --format 'value(status.url)'
