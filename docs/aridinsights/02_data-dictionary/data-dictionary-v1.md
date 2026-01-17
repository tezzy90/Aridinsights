# Arid Insights Data Dictionary v1
This is the contract for BigQuery and Firestore.

## 1) BigQuery Datasets (recommended)
- dataset: arid_core (authorities, artifacts, rates, boundaries)
- dataset: arid_ops (evidence logs, change events, run logs)
- dataset: arid_analytics (content performance, lead scoring)

## 2) BigQuery Tables (arid_core)

### 2.1 authority_nodes
- authority_id (STRING, PK)
- name (STRING)
- role_types (ARRAY<STRING>) enum: ISSUER, ENFORCER, ALLOCATOR, OPERATOR, ADJUDICATOR
- jurisdiction_level (STRING) enum: FEDERAL, STATE, SUB_STATE
- state_code (STRING, nullable)
- county_fips (STRING, nullable)
- homepage_url (STRING, nullable)
- status (STRING) enum: ACTIVE, INACTIVE
- last_verified_date (DATE)
- evidence_score (INT64)

### 2.2 authority_edges
- edge_id (STRING, PK)
- from_authority_id (STRING)
- to_authority_id (STRING)
- relationship_type (STRING) enum: OVERSEES, SUPPLIES, PERMITS_IN, ENFORCES_FOR, APPEALS_TO, CONTRACTS_WITH
- scope_note (STRING)
- last_verified_date (DATE)
- evidence_ref_id (STRING)

### 2.3 artifacts
- artifact_id (STRING, PK)
- artifact_type (STRING) enum: STATUTE, REGULATION, PERMIT_REQUIREMENT, RATE_SCHEDULE, RATE_ORIGIN_DOC, ENFORCEMENT_ACTION, ADMIN_RULING, CASE_LAW, POLICY_GUIDANCE, BOUNDARY, PROGRAM
- authority_id (STRING, nullable)
- title (STRING)
- summary (STRING)
- effective_date (DATE, nullable)
- status (STRING) enum: ACTIVE, SUPERSEDED, REPEALED, UNKNOWN
- jurisdiction_scope (RECORD)
  - country_code (STRING, default "US")
  - state_code (STRING, nullable)
  - county_fips (STRING, nullable)
  - geoid_tags (ARRAY<STRING>, nullable)
- applicability_rules (STRING, nullable)
- last_verified_date (DATE)
- content_hash (STRING, nullable)
- confidence (INT64)

### 2.4 artifact_sources
- source_id (STRING, PK)
- artifact_id (STRING)
- source_url (STRING)
- retrieved_at (TIMESTAMP)
- last_verified_date (DATE)
- source_type (STRING) enum: OFFICIAL, SECONDARY, OTHER
- hash (STRING, nullable)
- notes (STRING)

### 2.5 rate_schedules
- rate_schedule_id (STRING, PK)
- operator_authority_id (STRING) (utility)
- service_type (STRING) enum: POTABLE, WASTEWATER, RECLAIMED, WHOLESALE
- customer_class (STRING) enum: RESIDENTIAL, COMMERCIAL, INDUSTRIAL, OTHER
- unit (STRING) enum: KGAL, CCF, OTHER
- effective_date (DATE)
- last_verified_date (DATE)
- source_artifact_id (STRING)
- applicability_rules (STRING)
- inside_outside_city (STRING) enum: INSIDE_ONLY, OUTSIDE_ONLY, BOTH, NA
- status (STRING) enum: ACTIVE, SUPERSEDED, UNKNOWN

### 2.6 rate_components
- component_id (STRING, PK)
- rate_schedule_id (STRING)
- component_type (STRING) enum: BASE_CHARGE, TIER, SURCHARGE, DROUGHT_SURCHARGE, SEWER_MULTIPLIER, OTHER
- meter_size (STRING, nullable)
- tier_min (FLOAT64, nullable)
- tier_max (FLOAT64, nullable)
- price_per_unit (FLOAT64)
- notes (STRING)

### 2.7 service_areas
- service_area_id (STRING, PK)
- operator_authority_id (STRING)
- service_type (STRING) enum: POTABLE, WASTEWATER, RECLAIMED
- boundary_version_id (STRING)
- geometry_ref (STRING) (pointer to GEE asset or GCS file path)
- last_verified_date (DATE)

### 2.8 jurisdiction_overlays
- overlay_id (STRING, PK)
- input_geometry_id (STRING)
- computed_at (TIMESTAMP)
- county_fips (STRING)
- wmd_authority_id (STRING, nullable)
- operator_authority_ids (ARRAY<STRING>)
- confidence (INT64)
- notes (STRING)

## 3) Firestore Collections (arid_ops)
### /orders
- orderId (doc id)
- productType: SCORECARD | AUDIT | MONITORING
- customerId
- lemonSqueezyOrderId
- status: RECEIVED | IN_PROGRESS | QUARANTINED | DELIVERED | FAILED
- createdAt, updatedAt

### /jobs
- jobId
- orderId
- jobType: CONTEXT_PACK | SCORECARD_GEN | AUDIT_GEN | MONITOR_ALERT
- status, timestamps
- retryCount

### /contextPacks
- contextPackId
- orderId
- inputs_summary (includes current MW, cooling profile, planned MW optional)
- authority_resolution (overlay results)
- rates_used (rate_schedule_ids)
- assumptions
- generatedAt

### /evidenceLogs
- evidenceLogId
- orderId
- contextPackId
- sources[] (url, retrievedAt, hash, lastVerified)
- autonomy_scores (completeness/evidence/freshness/consistency)
- outputRefs (pdfDriveId, pdfUrlSignedRef, emailMessageId)
- createdAt

### /quarantine
- quarantineId
- orderId
- reasonCodes[]
- failedThresholds
- manualResolutionStatus

### /coverageLedger
- coverageId
- geoScope (Orlando, Tampa)
- operator/authority reference
- artifact refs
- lastVerified
- status: GREEN | YELLOW | RED

### /prompts
- promptId
- name
- version
- model (Flash/Pro)
- text
- inputSchema
- outputSchema
- updatedAt

### /promptRuns
- runId
- promptId
- orderId
- contextPackId
- modelUsed
- tokenUsage
- latencyMs
- status
