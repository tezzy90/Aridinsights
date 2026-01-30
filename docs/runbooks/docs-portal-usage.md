# Internal Docs Portal Usage

## Overview
The **Docs Portal** (`apps/docs-portal`) is a local web application that provides full-text search across all repository documentation:
- `docs/` (Architecture, Standards, Plans)
- `prompts/` (Curated Prompts, Library)
- `features/` (Feature definitions, if present)

It is designed to be deployed behind IAP (see [ADR-001](../decisions/ADR-001-internal-docs-access.md)).

## How to Run Locally

```bash
cd apps/docs-portal
npm install
npm run dev
```
Access at: http://localhost:3000

## Search Index
The search index is generated at build time. To refresh the index manually (e.g., after adding a file):
```bash
npm run index
```

## Adding Content

### Markdown Docs
Simply add `.md` files to `docs/` or `prompts/`. They are auto-discovered.

### Frontmatter (Recommended)
Add YAML frontmatter to improve searchability:

```markdown
---
title: "My New Feature Spec"
tags: ["feature", "payment", "q1"]
status: draft
owner: team-billing
excerpt: "A short summary shown in search results."
---

# Content starts here...
```

### Feature Cards
If you maintain feature definitions in `feature-cards/` or `jira-export/`, they will also be indexed dynamically.
