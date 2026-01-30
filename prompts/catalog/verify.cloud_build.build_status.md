# Verify Cloud Build Status

## Purpose
Verify that a specific Cloud Build run finished successfully.

## When to use
- After triggering a build via CLI or API.
- In automated smoke tests.

## Inputs
| Variable | Description | Example |
|----------|-------------|---------|
| `BUILD_ID` | Cloud Build Run ID | `ae5cabdb-...` |
| `REGION` | GCP Region | `us-central1` |

## Output
Returns `SUCCESS`, `FAILURE`, `WORKING`, or `QUEUED`.

## Copy-paste Prompt
```text
Verify build $BUILD_ID status in $REGION
```

## Links
- [Registry ID](../../registry/verify/cloud_build.build_status.yaml)
