# AridInsights - Google Cloud Platform Deployment Guide

This application has been refactored to use the **Grade A Google Cloud Architecture** for regulatory compliance platforms.

## Architecture Overview

### Stack Components

1. **Frontend & Backend**: Next.js 14 (App Router) on Cloud Run
2. **Database**: Cloud SQL (PostgreSQL) with PostGIS + pgvector extensions
3. **AI/ML**: Vertex AI Agent Builder for document search and RAG
4. **Authentication**: Firebase Auth (to be integrated)
5. **Storage**: Google Cloud Storage for PDF documents

## Why This Stack?

### PostGIS (Cloud SQL)
- **Geospatial Queries**: Answer "Is this well inside District X?" using native polygon intersection
- **Industry Standard**: PostGIS is the gold standard for water district mapping
- **pgvector**: Store embeddings of regulation text for semantic search

### Vertex AI Agent Builder
- **Document Intelligence**: Automatically index PDF rules and regulations
- **RAG with Citations**: Answers include source document and page number
- **No Hallucinations**: Grounded in your actual regulatory documents

### Cloud Run
- **Serverless**: Pay only for what you use
- **Scalable**: Auto-scales from 0 to thousands of instances
- **Cloud SQL Integration**: Native Unix socket connection for security and performance

## Local Development Setup

### Prerequisites

1. **Install Google Cloud SDK**
   ```bash
   brew install --cask google-cloud-sdk
   ```

2. **Authenticate**
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

3. **Install Cloud SQL Proxy** (for local development)
   ```bash
   brew install cloud-sql-proxy
   ```

### Database Setup

1. **Create Cloud SQL Instance**
   ```bash
   gcloud sql instances create aridinsights-db \
     --database-version=POSTGRES_15 \
     --tier=db-f1-micro \
     --region=us-central1
   ```

2. **Enable PostGIS and pgvector**
   ```bash
   gcloud sql databases create aridinsights --instance=aridinsights-db
   
   # Connect and run init script
   gcloud sql connect aridinsights-db --user=postgres
   # Then run: \i scripts/init-db.sh
   ```

3. **Start Cloud SQL Proxy** (for local development)
   ```bash
   cloud-sql-proxy YOUR_PROJECT_ID:us-central1:aridinsights-db
   ```

### Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in your values:
   ```bash
   cp .env.example .env.local
   ```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Production Deployment

### 1. Set Up Cloud SQL

```bash
# Create production instance
gcloud sql instances create aridinsights-prod \
  --database-version=POSTGRES_15 \
  --tier=db-custom-2-7680 \
  --region=us-central1 \
  --database-flags=cloudsql.iam_authentication=on
```

### 2. Store Secrets

```bash
# Store database credentials in Secret Manager
echo -n "postgres" | gcloud secrets create db-user --data-file=-
echo -n "YOUR_PASSWORD" | gcloud secrets create db-password --data-file=-
echo -n "aridinsights" | gcloud secrets create db-name --data-file=-
```

### 3. Deploy to Cloud Run

```bash
# Set environment variables
export GCP_PROJECT_ID=your-project-id
export GCP_REGION=us-central1
export CLOUD_SQL_INSTANCE=your-project-id:us-central1:aridinsights-db

# Run deployment script
./scripts/deploy.sh
```

## API Endpoints

### District Lookup (PostGIS)
```bash
POST /api/districts/find
{
  "latitude": 30.2672,
  "longitude": -97.7431
}
```

**Response:**
```json
{
  "district_id": 1,
  "district_name": "Middle Trinity Groundwater Conservation District"
}
```

### Regulation Query (Vertex AI)
```bash
POST /api/regulations/query
{
  "districtId": "1",
  "question": "What is the deadline for production reports?"
}
```

**Response:**
```json
{
  "answer": "Production reports must be submitted by January 15th annually.",
  "sources": [
    {
      "document": "middle_trinity_rules.pdf",
      "page": 42
    }
  ]
}
```

## Next Steps

### 1. Set Up Vertex AI Search

1. **Create a Search Datastore**
   - Go to Vertex AI Search in Google Cloud Console
   - Create a new datastore for "Unstructured Documents"
   - Point it to a GCS bucket containing your PDF regulations

2. **Update `lib/vertex-ai.ts`**
   - Replace placeholder with actual Vertex AI Search API calls
   - Use the Discovery Engine API to query your datastore

### 2. Migrate Components to Server Components

The current components are client components. For better performance:
- Move data fetching to Server Components
- Use React Server Components for static content
- Keep interactivity in Client Components with `'use client'`

### 3. Add Authentication

Integrate Firebase Auth:
```bash
npm install firebase firebase-admin
```

### 4. Load District Boundaries

Import GeoJSON/Shapefile data for Texas GCDs:
```sql
-- Example: Load from GeoJSON
INSERT INTO water_districts (district_name, district_code, geom)
VALUES (
  'Middle Trinity GCD',
  'MTGCD',
  ST_GeomFromGeoJSON('{"type":"MultiPolygon",...}')
);
```

## Cost Optimization

- **Cloud Run**: Free tier includes 2M requests/month
- **Cloud SQL**: Use `db-f1-micro` for development ($10/month)
- **Vertex AI**: Pay per query (estimate $0.001 per search)

## Monitoring

```bash
# View logs
gcloud run services logs read aridinsights --region=us-central1

# Monitor Cloud SQL
gcloud sql operations list --instance=aridinsights-db
```

## Support

For issues or questions, refer to:
- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Cloud SQL for PostgreSQL](https://cloud.google.com/sql/docs/postgres)
- [Vertex AI Search](https://cloud.google.com/generative-ai-app-builder/docs/try-enterprise-search)
