# AIG-OS Constitution v1
(AIG-OS = Authority Intelligence Graph Operating System)

## 1) Purpose
AIG-OS is the intelligence engine that powers Arid Insights products. It answers:
- Who governs this location’s water rules, permits, rates, and enforcement posture?
- What are the financial and compliance implications now, and under expansion scenarios?

AIG-OS is designed to be:
- Evidence-first
- Versioned
- Change-aware
- Safe to operate autonomously (with gating)

## 2) Core Taxonomy (Locked Enums)
### Authority Role Types
- ISSUER: creates binding rules (statutes, regulations, codes)
- ENFORCER: inspects, issues violations, imposes penalties
- ALLOCATOR: grants rights/permits and allocates supply
- OPERATOR: delivers water and sets service terms (utilities, wholesale suppliers)
- ADJUDICATOR: resolves disputes and sets precedent (courts, boards, commissions)

### Artifact Types
- STATUTE
- REGULATION
- PERMIT_REQUIREMENT
- RATE_SCHEDULE
- RATE_ORIGIN_DOC (tariff, ordinance, board resolution)
- ENFORCEMENT_ACTION (NOV, consent order, penalty notice)
- ADMIN_RULING (commission/board decisions)
- CASE_LAW
- POLICY_GUIDANCE (non-binding guidance with relevance)
- BOUNDARY (service area shapefile/polygon, district boundary)
- PROGRAM (reclaimed program rules, restrictions, eligibility)

## 3) Jurisdiction Model (3-tier)
- FEDERAL → STATE → SUB-STATE
Sub-state includes:
- Water Management Districts (Florida)
- Counties/municipalities
- Utility service areas (potable, wastewater, reclaimed)
- Special districts (as applicable)

Florida reference: five water management districts. :contentReference[oaicite:1]{index=1}

## 4) Evidence-First Requirements (Non-negotiable)
No artifact can influence paid outputs unless it has:
- source_url (official preferred)
- retrieval_timestamp
- last_verified_date
- content_hash (or stable doc identifier)
- scope fields (geo + applicability notes)
- confidence score (by Autonomy Contract)

If evidence is missing or stale:
- the artifact is QUARANTINED
- paid outputs must not reference it as fact

## 5) The Autonomy Contract (Quality Gate)
Every candidate record receives four scores:

1) Completeness Score (0–100)
- mandatory fields present
- scope defined
- applicability rules captured

2) Evidence Score (0–100)
- official source priority
- direct citation available
- hash and retrieval timestamp present

3) Freshness Score (0–100)
- based on last_verified_date and artifact volatility class:
  - high volatility: rate schedules, enforcement notices
  - medium: permitting guidance
  - low: statutory text, district boundaries

4) Consistency Score (0–100)
- cross-checks against known entities
- detects contradictions (effective dates, jurisdiction mismatch)

### Output Policy Thresholds
- Free tools: allow lower thresholds but label as ESTIMATE and show assumptions
- Paid Scorecard: must meet minimum thresholds or quarantine sections
- Paid Audit: stricter thresholds, otherwise job is quarantined and manual review required

## 6) Rate Schedules as First-Class Artifacts
Rate schedules are decisive in ROI and CFO relevance.
Rate artifacts must capture:
- effective_date
- expiration_date (if known)
- customer_class (residential, commercial, industrial)
- unit (kgal, ccf, etc.)
- base charges by meter size
- volumetric tiers
- inside_city vs outside_city rules (where applicable)
- reclaimed rates and restrictions where applicable

Examples (Florida):
- OUC water rates effective Oct 1, 2025. :contentReference[oaicite:2]{index=2}
- City of Tampa water rate schedule effective Oct 1, 2025 (inside vs outside city tiers). :contentReference[oaicite:3]{index=3}
- Orange County Utilities includes water, wastewater, and reclaimed rates (effective Oct 1, 2025). :contentReference[oaicite:4]{index=4}

## 7) Parcel-to-Authority Resolution (Geospatial)
AIG-OS must answer: “What authorities govern this parcel?”
Resolution pipeline:
1) Normalize parcel geometry (polygon preferred)
2) Overlay against:
   - county boundary (FIPS)
   - WMD boundary polygons
   - utility service area polygons
3) Output a ranked authority list with role tags:
   - allocator (WMD)
   - operator (utility, wholesale supplier)
   - issuer/enforcer (state agencies, local ordinances)
4) Store overlay evidence:
   - boundary version id
   - overlay timestamp
   - geometry ids used

Central Florida has overlapping WMD jurisdiction considerations (CFWI planning area). :contentReference[oaicite:5]{index=5}

## 8) Change Detection Watchlist
Scheduled jobs detect changes for:
- rate schedule updates
- district rule updates
- enforcement notices (where available)
- reclaimed program changes
- key policy pages

Each change event generates:
- diff summary
- impacted artifacts
- severity score
- action: auto-update, quarantine, or manual verify

## 9) Product Interfaces (What consumes AIG-OS)
- Scorecard Generator: reads AIG-OS artifacts filtered by Autonomy Contract thresholds
- Audit Generator: reads deeper artifacts and enforces stricter thresholds
- Monitoring: watches change events and notifies customers with impact analysis

## 10) Safety and Liability Posture
AIG-OS is intelligence support, not professional engineering or legal practice.
- Never claim “compliance certified”
- Never provide legal advice
- Always provide sources, last verified date, and assumptions

Risk and disclaimers live in the Risk & Disclaimers document and must be embedded into every deliverable.

## 11) Naming and Vocabulary (to avoid confusion)
- “Authority Graph” = the structured representation of authorities and their relationships
- “AIG-OS” = the operating system: ingestion + normalization + scoring + change detection + outputs
