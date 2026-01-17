#!/bin/bash
# Initialize BigQuery datasets and tables for Arid Insights

PROJECT_ID="aridinsights-dev"
REGION="us-east1"

echo "Using project: $PROJECT_ID"

# Create datasets
for dataset in arid_core arid_ops arid_analytics; do
  echo "Creating dataset: $dataset"
  bq mk --dataset --project_id $PROJECT_ID --location=$REGION --force $dataset
done

# Run DDL for arid_core
echo "Executing DDL for arid_core..."
bq query --use_legacy_sql=false --project_id $PROJECT_ID < scripts/bq/schema.sql

echo "BigQuery initialization complete."
