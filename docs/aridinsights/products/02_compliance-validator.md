# 📦 Product 2: Compliance Validator (ADaPT Engine)

> **Status:** MVP Definition
> **Pain Point Solved:** #5 (ADaPT Data Rejection)
> **Revenue Model:** Freemium → Lead Gen

---

## Problem Statement

FDEP requires water quality data in a strict "ADaPT" text format. If a lab misses a single comma or uses the wrong analyte code, the state's system rejects the entire submission. Compliance officers are trapped in "Submit → Reject → Fix in Excel → Resubmit" loops.

---

## Target Users

| User | Need | Acquisition |
|------|------|-------------|
| **Utility Compliance Officers** | Stop rejection loops | Free tool (email capture) |
| **Lab Managers** | Validate before sending | Free tool |
| **Environmental Consultants** | Client deliverables | Paid tier |

---

## Regulatory Context

- **FDEP Rule 62-160:** Quality Assurance requirements
- **ADaPT Standard:** Mandatory format for lab data
- **LVALID Tables:** Master library of valid analytes, units, methods
- **EzDMR Portal:** State submission system

---

## Key Features (MVP)

### 1. The "Linter"
Users drag-and-drop a Lab CSV. System scans against FDEP Master Library (valid analytes, units, method codes).

### 2. Auto-Fix
If user uploads "mg/l" but FDEP requires "mg/L", system auto-corrects.

### 3. EzDMR Generator
One-click export to specific XML/TXT format required for FDEP portal.

---

## Validation Logic

```python
# Pseudo-code for validation
for row in csv:
    # Check analyte exists
    if row.analyte_code not in LVALID_ANALYTES:
        flag_error(row, "Invalid Analyte Code")
    
    # Check MDL logic
    if row.value < row.mdl and row.qualifier != "U":
        flag_error(row, "Value < MDL requires Qualifier 'U'")
    
    # Check units
    if row.unit not in VALID_UNITS[row.analyte_code]:
        auto_fix(row, "unit", normalize_unit(row.unit))
```

---

## Tech Stack (GCP)

| Component | Service | Purpose |
|-----------|---------|---------|
| **Compute** | Cloud Functions (2nd Gen) | Serverless file processing |
| **Storage** | Cloud Storage | Raw vs. Cleaned file buckets |
| **Database** | Firestore | Flexible FDEP validation rules |
| **Frontend** | Cloud Run | Simple drag-drop UI |

---

## Senior Development Prompt

```
Act as a Senior Data Engineer (ETL Specialist). I need to build a serverless validation pipeline for Florida environmental data.

The Context: FDEP requires data in the 'ADaPT' format. We need a 'Linter' that catches errors before the user submits to the state.

The Task:
1. Rule Ingestion: Write a script to scrape/ingest the official FDEP 'Reference Library' (specifically the LVALID and EDD_S tables) into Firestore for O(1) lookups.

2. Validation Logic: Create a Python Cloud Function that accepts a CSV upload. It must iterate through every row and validate:
   - Analyte Existence: Does the Analyte_Code exist in the Firestore 'Master' collection?
   - MDL Logic: If Value < MDL, check if the Data_Qualifier is 'U'. If not, flag as error.

3. Output: Return a JSON object listing every error by Row/Column index, with a specific 'Fix Hint'.
```

---

## GTM Role

**The Trojan Horse (Lead Gen)**
- Free tool solves daily annoyance for Permit Coordinators
- Captures emails of every Utility Compliance Officer in Florida
- Warm leads for ERC Ledger upsell
