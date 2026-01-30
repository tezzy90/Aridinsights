# Runbook: Cloud Run IAP for Internal Docs

## Scope
This runbook guides the configuration of Identity-Aware Proxy (IAP) for **internal documentation services** hosted on Google Cloud Run.

**Assumptions:**
- A Cloud Run service is already deployed (e.g., `internal-docs`).
- You have `Owner` or `IAP Admin` permissions on the GCP Project.
- Users are within the Google Workspace organization or listed in an auth group.

## Configuration Steps

### 1. Enable IAP
*Do this in the Google Cloud Console "Identity-Aware Proxy" page.*
- Locate the Backend Service associated with your Cloud Run Load Balancer (LB). 
- **Note**: Cloud Run requires a Global Load Balancer (HTTPS) to use IAP. Ensure your service is backed by an LB, not just a raw `run.app` URL.
- Toggle the "IAP" switch to **On**.

### 2. Configure OAuth Consent Screen
*Required if not yet configured for the project.*
- Go to **APIs & Services > OAuth consent screen**.
- User Type: **Internal** (Allows only users within your Org).
- App Name: "AridInsights Internal Docs".
- Save. (Internal apps do not require public verification).

### 3. Grant Access Access via IAM
*Control WHO can see the docs.*
- In the IAP page, select the resource (backend service).
- Click **"Add Principal"**.
- Enter email addresses or groups (e.g., `engineering@aridinsights.com`).
- Role: **"IAP-secured Web App User"**.

### 4. Configure Cloud Run Ingress
*Ensure traffic flows correctly.*
- **Option A (Strict - Recommended)**: Set Ingress to "Internal and Cloud Load Balancing".
  - This prevents direct access to the `*.run.app` URL, forcing traffic through the LB + IAP.
  - Run:
    ```bash
    gcloud run services update <SERVICE_NAME> \
      --ingress internal-and-cloud-load-balancing \
      --region us-central1
    ```
- **Option B (Permissive)**: "Allow internal traffic only" (if using VPC).

### 5. Verification
- **Unauthorized Test**: Open the LB URL in an Incognito window (unlogged).
  - *Expected*: Redirects to Google Login.
- **Authorized Test**: Log in with an approved account.
  - *Expected*: Access to the documentation index.

## Troubleshooting

### 403 Forbidden
- **Cause**: User is authenticated but not authorized.
- **Fix**: Check IAM policies on the IAP resource. Ensure the user has "IAP-secured Web App User".

### Redirect Loop
- **Cause**: Load Balancer health checks failing auth.
- **Fix**: Ensure the backend service has a health check exception or the app returns 200 on `/` without auth (if configured to bypass), OR confusing IAP setup. Verify LB logs.

### Direct Access Works (Bypassing Auth)
- **Cause**: Ingress is set to "All".
- **Fix**: Update Cloud Run ingress to `internal-and-cloud-load-balancing`.
