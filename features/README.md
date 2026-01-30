# Feature Registry 🃏

This directory (`features/`) is the **System of Record** for all shipping features.

## Format
Each feature is a markdown file named `FC-####-short-title.md`.

### Frontmatter (Required)
```yaml
id: FC-1001
title: Internal Docs Portal
status: shipped
owner: @platform-team
components: [apps/docs-portal]
links: [Jira-123]
```

## Lifecycle
- **Proposed**: Early draft.
- **Planned**: Approved for work.
- **Building**: Code in progress.
- **Shipped**: Live in prod.
- **Deprecated**: No longer supported.
