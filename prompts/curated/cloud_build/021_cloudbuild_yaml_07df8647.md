# Auto-extracted Prompt 21

## Metadata
- **ID**: 021_cloudbuild_yaml_07df8647.md
- **Category**: cloud_build
- **Source**: ./agents/compliance-engine/cloudbuild.yaml:1
- **Created**: 2026-01-29T19:19:47.951481

## Prompt Snippet
```text
1-steps:
2-  # Build the container image
3-  - name: "gcr.io/cloud-builders/docker"
4-    args:
5-      - "build"
6-      - "-t"
7:      - "us-central1-docker.pkg.dev/$PROJECT_ID/agents/compliance-engine:$TAG_NAME"
8-      - "-t"
9:      - "us-central1-docker.pkg.dev/$PROJECT_ID/agents/compliance-engine:latest"
10-      - "."
11:    dir: "agents/compliance-engine"
12-
13-  # Push the container image to Artifact Registry
14-  - name: "gcr.io/cloud-builders/docker"
15-    args:
16-      - "push"
17-      - "--all-tags"
18:      - "us-central1-docker.pkg.dev/$PROJECT_ID/agents/compliance-engine"
19-
20-  # Deploy container image to Cloud Run
21-  - name: "gcr.io/google.com/cloudsdktool/cloud-sdk"
22-    entrypoint: gcloud
23-    args:
24-      - "run"
25-      - "deploy"
26-      - "arid-compliance-engine"
27-      - "--image"
28:      - "us-central1-docker.pkg.dev/$PROJECT_ID/agents/compliance-engine:$TAG_NAME"
29-      - "--region"
30-      - "us-central1"
31-      - "--platform"
32-      - "managed"
33-      - "--allow-unauthenticated"
34-      - "--set-env-vars"
35-      - "GCP_PROJECT_ID=$PROJECT_ID,GCP_REGION=us-central1"
36-      # Add other env vars or secrets here as needed, based on verified service config
37-
38-images:
39:  - "us-central1-docker.pkg.dev/$PROJECT_ID/agents/compliance-engine:$TAG_NAME"
40:  - "us-central1-docker.pkg.dev/$PROJECT_ID/agents/compliance-engine:latest"
41-
42-options:
43-  logging: CLOUD_LOGGING_ONLY

```
