# Verify Artifact Registry Tag

## Purpose
Resolve a Git tag (e.g., v0.2.2) to a specific Docker image digest.

## When to use
- To confirm an image exists before deploying.
- To ensure no tag drift.

## Inputs
| Variable | Description | Example |
|----------|-------------|---------|
| `TAG_NAME` | Git Tag | `v0.2.2` |
| `REPO` | AR Repo Name | `web` |

## Output
A SHA256 digest string.

## Links
- [Registry ID](../../registry/verify/artifact_registry.tag_to_digest.yaml)
