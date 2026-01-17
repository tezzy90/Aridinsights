# Risk & Disclaimers v1
This document defines what Arid Insights is allowed to claim, and what it must never claim.

## 1) What Arid Insights is
- Decision-support intelligence for water cost exposure and governance complexity.
- Evidence-first summaries with transparent assumptions and sources.
- A change-aware monitoring signal.

## 2) What Arid Insights is not
- Not legal advice.
- Not engineering advice.
- Not a replacement for licensed professional review.
- Not a regulatory approval or compliance certification.

## 3) Prohibited claims (never use)
- “We certify your compliance.”
- “You are compliant.”
- “This guarantees permit approval.”
- “This replaces legal counsel or engineering review.”
- “We are acting as your engineer of record.”

## 4) Required footer block (every PDF, every tool result)
Must include:
- Jurisdiction scope (state, county, operator)
- Last verified date for each critical artifact
- Evidence links or evidence ids
- Assumptions list (including defaulted cooling profile or missing planned MW)
- Confidence label (PASS / PARTIAL / QUARANTINED SECTION)

## 5) Quarantine policy (safety valve)
If Autonomy Contract fails for paid output:
- Do not ship the section as fact
- Replace with “Insufficient verified evidence available for this subsection”
- Offer manual review option or reschedule after verification

## 6) Liability risk categories
- Misstating enforceable requirements (statute/reg) vs guidance
- Using stale rate schedules (financial harm)
- Incorrect service area mapping (wrong operator, wrong rates)
- Overstating reclaimed water availability

Controls:
- Evidence-first artifact_sources
- last_verified enforcement
- geospatial overlay evidence logging
- paid thresholds and quarantine

## 7) Customer-facing disclaimer language (recommended)
“This report provides decision-support intelligence based on publicly available sources and documented assumptions. It is not legal or engineering advice. Regulatory requirements and utility rates can change. Please consult qualified professionals before making final compliance or design decisions.”

## 8) Internal escalation triggers
Escalate to manual review when:
- output depends on RED artifacts
- conflicting effective dates appear
- inside/outside city applicability unknown but materially impacts cost
- customer indicates imminent capital decision (higher stakes)
