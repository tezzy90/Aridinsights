#!/bin/bash

# Idle Shutdown Script for Vertex Workbench Notebook
# This script stops the notebook instance if it has been idle for more than 30 minutes

INSTANCE_NAME="aridinsights-notebook"
ZONE="us-central1-a"
PROJECT_ID="aridinsights-platform"
IDLE_THRESHOLD_MINUTES=30

# Get the instance status
INSTANCE_STATUS=$(gcloud notebooks instances describe $INSTANCE_NAME \
  --location=$ZONE \
  --project=$PROJECT_ID \
  --format="value(state)")

echo "Instance status: $INSTANCE_STATUS"

if [ "$INSTANCE_STATUS" != "ACTIVE" ]; then
  echo "Instance is not active. Exiting."
  exit 0
fi

# Check CPU utilization over the last 30 minutes
# If average CPU < 5%, consider it idle
CPU_USAGE=$(gcloud monitoring time-series list \
  --filter="metric.type=\"compute.googleapis.com/instance/cpu/utilization\" AND resource.labels.instance_id=\"$INSTANCE_NAME\"" \
  --format="value(point.value.doubleValue)" \
  --project=$PROJECT_ID \
  --start-time="$(date -u -d '30 minutes ago' +%Y-%m-%dT%H:%M:%SZ)" \
  --end-time="$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  | awk '{sum+=$1; count++} END {if (count>0) print sum/count; else print 100}')

echo "Average CPU usage: $CPU_USAGE%"

# If CPU usage is less than 5%, stop the instance
if (( $(echo "$CPU_USAGE < 0.05" | bc -l) )); then
  echo "Instance has been idle for more than $IDLE_THRESHOLD_MINUTES minutes. Stopping..."
  gcloud notebooks instances stop $INSTANCE_NAME --location=$ZONE --project=$PROJECT_ID
  echo "Instance stopped successfully."
else
  echo "Instance is active. No action taken."
fi
