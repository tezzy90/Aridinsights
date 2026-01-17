# Coverage Ledger: Florida (Orlando + Tampa) v1
This ledger is how we prevent intelligence drift.

## Status Codes
- GREEN: verified, normalized, passes Autonomy Contract for paid use
- YELLOW: partially normalized or freshness risk, allowed for free tools only
- RED: quarantined, not allowed in paid outputs

## Authorities (core)
- Florida DEP: supervisory relationship over water management districts (state-level oversight). (See Sources Appendix)
- St. Johns River Water Management District: Orange County is within SJRWMD scope (partial county coverage). (See Sources Appendix)
- Southwest Florida Water Management District: Hillsborough County is within SWFWMD scope (district site is entry point). (See Sources Appendix)
- Tampa Bay Water: wholesale supplier for Tampa and member governments (operator role for wholesale supply). (See Sources Appendix)

## Utility / Operator Targets (initial)
### Orlando Metro (seed list; confirm service area by parcel overlay)
- Orlando Utilities Commission (OUC) potable water operator and rate schedule target
- Orange County Utilities potable/wastewater/reclaimed operator and rate schedule target

### Tampa Metro (seed list; confirm service area by parcel overlay)
- City of Tampa Utilities potable/wastewater operator and rate schedule target
- Reclaimed program references where applicable

## Rate Schedule Artifacts (initial references)
- OUC water rate schedule effective Oct 1, 2025 (PDF + rate page). Status: YELLOW until extracted and verified. (See Sources Appendix)
- Orange County Utilities water/wastewater/reclaimed rates effective Oct 1, 2025 (PDF). Status: YELLOW until extracted and verified. (See Sources Appendix)
- City of Tampa residential water/wastewater rate schedule effective Oct 1, 2025 (PDF). Status: YELLOW until extracted and verified. (See Sources Appendix)
- City of Tampa reclaimed water rate info page. Status: YELLOW until extracted and verified. (See Sources Appendix)

## Reclaimed Water Program Signals (Florida context)
- Florida DEP reuse program overview and rules references exist and should be captured as PROGRAM artifacts. (See Sources Appendix)
- City of Orlando reclaimed water guidance exists and should be captured as PROGRAM artifact for Orlando metro. (See Sources Appendix)
- SWFWMD reclaimed water project summary exists and should be captured as PROGRAM artifact for Tampa metro. (See Sources Appendix)

## Required Fields Before GREEN
For each operator and rate schedule:
- operator authority_node exists with role=OPERATOR
- rate_schedule exists with effective_date, customer_class, unit, inside/outside rules
- artifact_sources include official URL, retrieved_at, last_verified_date, hash if possible
- rate_components extracted (tiers and base)
- Autonomy Contract passes paid thresholds

## Sources Appendix (store these as artifact_sources)
(Keep URLs in the Git file for operational use; the UI uses evidence refs.)
