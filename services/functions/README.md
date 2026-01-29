# Arid Insights Cloud Functions

This directory contains the Cloud Functions for the Arid Insights order processing pipeline.

## Architecture

The system consists of two main functions:

1.  **`createOrder` (HTTP Webhook)**:
    *   Ingests orders from Lemon Squeezy.
    *   Verifies signature using `LEMON_SQUEEZY_WEBHOOK_SECRET`.
    *   Upserts customer data to `/customers`.
    *   Creates an order in `/orders`.
    *   Queues the initial `CONTEXT_PACK` job in `/jobs`.

2.  **`onJobCreated` (Firestore Trigger)**:
    *   Triggered on creation of a document in `/jobs/{jobId}`.
    *   Acts as a central job runner/dispatcher.
    *   Dispatches to handlers:
        *   `CONTEXT_PACK`: Resolves geometry, overlays, and rates.
        *   `SCORECARD_GEN` / `AUDIT_GEN`: Scrutinizes data using Autonomy Contract logic.
        *   `DELIVERY`: Generates PDF, uploads to Drive, and emails via Resend.

## Prerequisites

*   Google Cloud Project with Firestore, Secret Manager, Cloud Build, and Vertex AI API enabled.
*   Secrets stored in Google Secret Manager:
    *   `LEMON_SQUEEZY_WEBHOOK_SECRET`
    *   `RESEND_API_KEY`

## Deployment

We use a pre-compilation strategy to ensure stability.

### 1. Compile TypeScript

```bash
cd functions
npm install
npm run build   # Default build (tsc)
# or manually:
npx tsc
```

### 2. Deploy `createOrder`

```bash
gcloud functions deploy createOrder \
  --gen2 \
  --runtime nodejs20 \
  --trigger-http \
  --allow-unauthenticated \
  --region us-east1 \
  --source . \
  --set-secrets=LEMON_SQUEEZY_WEBHOOK_SECRET=LEMON_SQUEEZY_WEBHOOK_SECRET:latest
```

### 3. Deploy `onJobCreated`

```bash
gcloud functions deploy onJobCreated \
  --gen2 \
  --runtime nodejs20 \
  --trigger-event-filters="type=google.cloud.firestore.document.v1.created" \
  --trigger-event-filters="database=(default)" \
  --trigger-event-filters-path-pattern="document=jobs/{jobId}" \
  --region us-east1 \
  --source . \
  --set-secrets=RESEND_API_KEY=RESEND_API_KEY:latest
```

## Local Verification

Use the scripts in `scripts/` or `functions/` to test locally or verify deployment.

*   `seed_job.js`: Manually seeds an order and job to test the runner.
*   `verify_output.js`: Checks Firestore for expected output artifacts.
