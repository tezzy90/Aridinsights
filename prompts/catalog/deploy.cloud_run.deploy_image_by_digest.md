# Deploy Image by Digest

## Purpose
Force deploy a specific immutable image digest to Cloud Run, bypassing tag mutability.

## When to use
- Promoting a precise image from staging to prod.
- Rollbacks.

## Inputs
| Variable | Description | Example |
|----------|-------------|---------|
| `SERVICE_NAME` | Cloud Run Service | `aridinsights-web` |
| `IMAGE_DIGEST` | Full Image Path | `.../image@sha256:...` |

## Links
- [Registry ID](../../registry/deploy/cloud_run.deploy_image_by_digest.yaml)
