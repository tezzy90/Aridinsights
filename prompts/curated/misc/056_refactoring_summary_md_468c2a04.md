# Auto-extracted Prompt 56

## Metadata
- **ID**: 056_refactoring_summary_md_468c2a04.md
- **Category**: misc
- **Source**: ./docs/project_history/REFACTORING_SUMMARY.md:137
- **Created**: 2026-01-29T19:19:47.957097

## Prompt Snippet
```text
137-- Cloud Run: Free tier (2M requests/month)
138-- Cloud SQL: $10/month (db-f1-micro)
139-- Vertex AI: ~$0.001 per query
140-
141-**Production** (estimated): ~$100-300/month
142-- Cloud Run: Auto-scales based on traffic
143-- Cloud SQL: $50-150/month (depends on size)
144-- Vertex AI: Based on query volume
145-
146-## Questions?
147-
148-Refer to:
149:- `DEPLOYMENT.md` for deployment instructions
150-- `MIGRATION.md` for what changed
151-- `scripts/init-db.sh` for database schema
152-
153--
```
