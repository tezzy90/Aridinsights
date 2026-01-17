# Arid Insights: Master Product Strategy 2026

## Strategic Identity
- Mantra: Intelligence at the Speed of Risk.
- Mission: Provide hydrological resilience and financial certainty for industrial, agricultural, and commercial assets in the US Sun Belt.
- Visual Language: Executive Intelligence aesthetic (navy, slate, glacial emerald, bento grids, serif typography).

## Primary Beachhead
Florida first. Metro focus: Orlando + Tampa.

## Buyer Persona for v1
Primary: CFO and EHS decision-makers for water-dependent facilities.
Secondary (later): insurance brokers, lenders, consultants, utilities, water-tech vendors.

## Product Map (v1 to v3)

### v1 CFO Wedge (Florida, Orlando + Tampa)
Goal: ship fast, prove willingness to pay, build credibility, and start compounding a data asset.

1) Water Risk Scorecard (paid, low friction)
- Deliverable: 5-page PDF
- Outcome: fast financial exposure view and compliance complexity snapshot
- Inputs: address or parcel polygon, current IT load (MW), cooling profile, optional planned MW (24–36 months)

2) AquaPrime Certified Audit (paid, decision-grade)
- Deliverable: 20-page PDF
- Outcome: board-ready strategic memo including authority map and rate exposure
- Adds: assumptions table, evidence table, regulatory posture summary, action plan

3) WaterWatch Monitoring (recurring, minimal MVP)
- Deliverable: monthly email digest + alert triggers (rate changes, authority changes, enforcement notices where available)
- Outcome: switching costs and renewal logic

### v2 Expansion
- Texas and Arizona added with the same artifacts and controls.
- Site Selection Compare (multi-site) introduced as a premium one-time product.

### v3 Partner Layer
- Partner API + licensing.
- Lead Orchestrator credits for water-tech vendors, insurers, consultants.

## Non-negotiable Moat Components
Arid Insights is not “a PDF generator”.
The moat is a maintained, versioned intelligence corpus:
- Authority registry and ontology (Issuer, Enforcer, Allocator, Operator, Adjudicator)
- Rate schedules as first-class artifacts (versioned, dated, applicability rules)
- Evidence-first lineage (source URL, retrieval timestamp, hash, last verified)
- Change detection watchlist and weekly verification cadence
- Autonomy Contract (quality gate) that prevents bad outputs from shipping

## Data Sources (Florida v1 focus)
- Florida DEP oversight and district relationships
- St. Johns River Water Management District coverage for Orange County
- Southwest Florida Water Management District coverage for Hillsborough County
- Utility rate schedules for Orlando and Tampa providers
- Reclaimed water programs (availability and restrictions)

## Definition of Done (for every sprint)
A sprint is not “done” unless:
1) Feature shipped (code)
2) Coverage Ledger updated (what is now covered)
3) Prompt Library updated if prompt changed
4) Data Dictionary updated if schema changed
5) Change Control Log entry created
6) Risk & Disclaimers reviewed for impact
7) Paid-run Evidence Logs are produced end-to-end in staging

## Weekly Cadence (James Clear operationalization)
- Monday: change detection run + new ingestion
- Tuesday: validation + quarantine resolution
- Wednesday: publish one authority post + one coverage update
- Thursday: outbound outreach using new signals
- Friday: backlog grooming and cost review (Vertex + BigQuery)

## Scope Control for v1
v1 is Florida-only and metro-only (Orlando + Tampa). Expansion is blocked unless:
- Coverage Ledger for v1 is stable
- Autonomy Contract pass rate exceeds target for 2 consecutive weeks
