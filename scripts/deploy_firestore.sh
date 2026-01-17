#!/bin/bash
# Deploy Firestore Security Rules

PROJECT_ID="aridinsights-dev"

echo "Deploying Firestore rules to $PROJECT_ID..."
firebase deploy --only firestore:rules --project $PROJECT_ID

# Alternative using gcloud if firebase CLI not preferred/configured
# gcloud firestore security-rules deploy firestore/firestore.rules --project=$PROJECT_ID
