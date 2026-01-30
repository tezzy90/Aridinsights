# Auto-extracted Prompt 20

## Metadata
- **ID**: 020_cloudbuild_release_yaml_ffd1434d.md
- **Category**: cloud_build
- **Source**: ./cloudbuild.release.yaml:59
- **Created**: 2026-01-29T19:19:47.951317

## Prompt Snippet
```text
59-  - name: gcr.io/cloud-builders/docker
60-    id: engine-build
61:    dir: agents/compliance-engine
62-    args:
63-      [
64-        "build",
65-        "-t",
66-        "${_REGION}-docker.pkg.dev/${PROJECT_ID}/${_ENGINE_REPO}/${_ENGINE_IMAGE}:${TAG_NAME}",
67-        ".",
68-      ]
69-
70-  - name: gcr.io/cloud-builders/docker
71-    id: engine-push
72-    args:
73-      [

```
