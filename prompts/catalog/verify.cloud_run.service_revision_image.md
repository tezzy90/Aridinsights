# Verify Cloud Run Revision Image

## Purpose
Confirm that a Cloud Run service is serving the expected image digest.

## When to use
- Post-deployment verification.
- To detect configuration drift.

## Inputs
| Variable | Description | Example |
|----------|-------------|---------|
| `SERVICE_NAME` | Cloud Run Service | `aridinsights-web` |
| `EXPECTED_DIGEST` | Image Digest | `sha256:...` |

## Output
Boolean match.

## Links
- [Registry ID](../../registry/verify/cloud_run.service_revision_image.yaml)
