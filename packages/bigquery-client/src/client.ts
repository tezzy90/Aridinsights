import { BigQuery } from '@google-cloud/bigquery';

let instance: BigQuery | null = null;

export function initBigQueryClient(): BigQuery {
  if (!instance) {
    instance = new BigQuery({
      projectId: process.env.GCP_PROJECT_ID,
      credentials: JSON.parse(process.env.GCP_CREDENTIALS || '{}'),
    });
  }
  return instance;
}

export function getBigQueryClient(): BigQuery {
  if (!instance) throw new Error('BigQuery client not initialized');
  return instance;
}