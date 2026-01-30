# Debug Cloud Run Label Error

## Purpose
Identify why a Cloud Run deployment failed due to label formatting, specifically regarding dots/special characters.

## When to use
- Determining why a deployment failed with "metadata.labels: At least one label does not conform".

## Inputs
| Variable | Description | Example |
|----------|-------------|---------|
| `LOG_TEXT` | Error log snippet | `Label value 'v0.2.0' violates...` |

## Output
Root cause explanation.

## Links
- [Registry ID](../../registry/debug/cloud_run.audit_label_error.yaml)
