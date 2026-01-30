# Prompt Categories

| Category | Description | File Path Signals |
|----------|-------------|-------------------|
| `build_and_ci` | CI/CD pipelines, git hooks, repo tooling | `cloudbuild.yaml`, `.github/`, `scripts/` |
| `cloud_run` | Runtime config, deployment commands, Dockerfiles | `Dockerfile`, `deploy`, `service.yaml` |
| `cloud_build` | Build steps, triggers, substitutions | `cloudbuild*.yaml` |
| `firebase_functions` | Backend logic, triggers, Firestore interactions | `functions/`, `services/functions/` |
| `agents_python` | AI agent personas, instructions, system prompts | `agents/`, `*.py` with `PROMPT` |
| `architecture` | High-level design, ADRs, system diagrams | `docs/architecture/` |
| `governance` | Policies, standards, compliance rules | `docs/governance/`, `CONTRIBUTING.md` |
| `marketing_content` | Copy, social posts, blog drafts | `docs/content/`, `marketing/` |
| `recruiting_dei` | Job descriptions, interview guides | `docs/hiring/` |
| `misc` | Anything else requiring review | *fallback* |

## Migration Rules
1. All discovered prompts must have a curated entry in `prompts/curated/<category>/`.
2. Filenames must follow: `<counter>_<slug>_<hash>.md`.
3. Categories are enforced by automation where possible.
