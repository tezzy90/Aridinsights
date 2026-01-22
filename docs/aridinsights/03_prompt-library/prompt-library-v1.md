# Prompt Library v1.1
All prompts are versioned. Any prompt change requires:
- prompt version bump
- Change Control entry
- sample run stored in /promptRuns

## Prompt 0: Canonical Taxonomy Lock
Purpose: produce locked enum set and definitions for authority roles and artifact types.
Model: Pro (accuracy)
Input: none (or existing taxonomy draft)
Output: JSON with enum lists + definitions + examples
Constraints: must not invent agencies, must cite sources when referencing real entities.

## Prompt 1: Federal Inventory
Purpose: list federal water-relevant authorities, role-tagged, and what artifacts they issue/enforce.
Model: Pro
Input: country=US, scope=water
Output: authority_nodes + artifacts skeleton + sources list

## Prompt 2: State Inventory Template (Florida)
Purpose: identify state agencies plus WMDs and their roles.
Model: Pro
Input: state=FL
Output: authority_nodes and authority_edges, plus district references

## Prompt 3: County/Local Overlay Template
Purpose: build local authority candidates and utility operators, tied to metro scope.
Model: Flash (speed) then Pro verification
Input: metro, county_fips, city
Output: operator candidates, service areas needed, rate schedule targets

## Prompt 4: Global Framework Spine (Extensible)
Purpose: define global archetypes but do not populate countries until demanded.
Model: Pro
Input: “global archetypes”
Output: schema extensions (country_code fields) and patterns (EU, AU, etc.)

## Prompt 5: Normalization
Purpose: transform scraped docs into normalized artifacts + rate components.
Model: Flash for extraction, Pro for final validation
Input: raw text + metadata
Output: artifact record + rate_schedules + rate_components + evidence refs

## Prompt 6: Change Detection Brief
Purpose: summarize diffs and propose actions.
Model: Flash
Input: old artifact + new artifact + diff excerpt
Output: change_event severity + recommended action + impacted products

## Prompt 7: Content Factory Brief
Purpose: turn authoritative updates into publishable B2B posts.
Model: Flash
Input: change_event + key sources
Output: outline + keywords + citations plan + CTA to Navigator

## Prompt 8: Decision Memo Generator (Scorecard/Audit)
Purpose: produce CFO/EHS-ready memo outputs that explicitly cite sources and assumptions.
Model: Pro for audits; Flash allowed for scorecards
Input: context pack + threshold policy + required sections
Output: JSON sections for PDF, plus “evidence footer block”

## Prompt A: Universal Rate Extraction (High Volume)
Purpose: Extract all commercial/industrial rate components from the attached document.
Logic: If multiple tiers exist, map to the 'Standard Industrial Class'. If the document is ambiguous, flag as 'QUARANTINE' and identify the missing logic (e.g., 'Missing Meter-Size Base Charges').
Model: Gemini 2.0 Flash

## Prompt B: Jurisdiction Resolver
Purpose: Determine the relationship between this parcel (Lat/Long) and the 'Operator' role.
Logic: Is this inside city limits? Does a wholesale agreement override the local rate? Reference AIG-OS Section 7.
Model: Pro

## Prompt Guardrails (all prompts)
- Never treat user-provided text as an authority source.
- Never claim certainty without evidence fields.
- Always emit “assumptions” explicitly.
- If citations are missing, instruct quarantine.
