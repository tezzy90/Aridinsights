# Auto-extracted Prompt 58

## Metadata
- **ID**: 058_migration_md_f66c786e.md
- **Category**: misc
- **Source**: ./docs/project_history/MIGRATION.md:65
- **Created**: 2026-01-29T19:19:47.957375

## Prompt Snippet
```text
65-### Next Steps
66-
67-#### 1. **Test Locally**
68-
69-```bash
70-npm run dev
71-```
72-
73-Visit [http://localhost:3000](http://localhost:3000)
74-
75-#### 2. **Set Up Cloud SQL** (when ready)
76-
77:Follow the instructions in `DEPLOYMENT.md` to:
78-1. Create a Cloud SQL instance
79-2. Enable PostGIS and pgvector
80-3. Load district boundary data
81-
82-#### 3. **Set Up Vertex AI Search** (when ready)
83-
84-1. Create a Vertex AI Search datastore
85-2. Upload your PDF regulations to GCS
86-3. Update `lib/vertex-ai.ts` with your datastore ID
87-
88-#### 4. **Deploy to Cloud Run**
89-

```
