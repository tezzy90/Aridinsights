# Docs Portal Runbook

**Control Center url:** `http://localhost:3000` (Local)
**Source:** `apps/docs-portal`

## v2 Upgrade (Control Center)
The portal now acts as a central hub for Docs, Prompts, and Feature Registry. It uses a **client-side search index** generated at build time.

## Quick Start
```bash
# From repo root
num run dev:docs
```

## Rebuilding the Index
If you add new files, you must rebuild the index for them to appear in Search, Recent, or Lists.
```bash
npm run index:docs
```
*Note: The indexer uses `git log` to determine `updatedAt`. If a file is not committed, it falls back to filesystem creation time.*

## Directory Structure
*   `docs/` -> General documentation, ADRs (`docs/decisions`), Runbooks (`docs/runbooks`)
*   `prompts/` -> Prompt Library (auto-discovered)
*   `features/` -> Feature Registry (`FC-####`)

## Troubleshooting
**"Search Index Missing"**
Run `npm run index:docs`. If permissions fail (EPERM), ensure you are running from the repo root and using **Volta (Node 20)**.

**"Access Denied"**
The reader view only serves files from allowed roots: `docs`, `prompts`, `features`, `product`. Do not try to access `secrets` or `.env`.
