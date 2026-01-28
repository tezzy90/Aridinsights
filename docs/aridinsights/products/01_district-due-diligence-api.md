# 📦 Product 1: District Due Diligence API

> **Status:** MVP Definition
> **Pain Point Solved:** #7 (Chapter 298 Shadow Assessments)
> **Revenue Model:** Transactional ($50/lookup)

---

## Problem Statement

Chapter 298 Drainage Districts levy hidden taxes (Non-Ad Valorem Assessments) that do not appear in standard title searches or GIS maps. Investors buy land thinking it has "low taxes," only to get a ~$1,000/acre/year surprise assessment post-closing.

---

## Target Users

| User | Need | Willingness to Pay |
|------|------|--------------------|
| **PropTech Platforms** | Embed risk data in listings | API subscription |
| **Real Estate Attorneys** | Due diligence reports | Per-report fee |
| **REITs / Land Buyers** | Avoid bad deals | High per-lookup |
| **Title Companies** | Liability protection | Bundled offering |

---

## Regulatory Context

- **F.S. Chapter 298:** Authorizes Water Control Districts
- **County Tax Rolls:** NAL (Non-Ad Valorem) levy codes
- **No Central API:** Data must be scraped/ingested from 67 counties

---

## Key Features (MVP)

### 1. The Geofence
Accurate GIS polygons of all 90+ active Chapter 298 Drainage Districts.

### 2. Tax Roll Scraper
ETL pipeline that ingests County Tax Rolls and filters for specific "Levy Codes" (e.g., "DD" for Drainage District).

### 3. Risk Score API
| Input | Output |
|-------|--------|
| Address or Lat/Long | District Name, Estimated Annual Cost, Risk Level, Data Source |

**Example Response:**
```json
{
  "address": "1234 Main St, Loxahatchee, FL",
  "in_district": true,
  "district_name": "Indian Trail Improvement District",
  "estimated_annual_fee": 850,
  "risk_level": "HIGH",
  "data_source": "GIS + Tax Roll",
  "confidence": 0.95
}
```

---

## Tech Stack (GCP)

| Component | Service | Purpose |
|-----------|---------|---------|
| **Data Warehouse** | BigQuery (GIS) | `ST_CONTAINS` for Point-in-Polygon |
| **ETL** | Dataflow | Parse massive County Tax Roll files |
| **API** | Cloud Run | REST endpoint |
| **Storage** | Cloud Storage | Raw tax roll files |

---

## Senior Development Prompt

```
Act as a Geospatial Data Architect. I need to build a 'Risk API' that identifies if a Florida property falls within a 'Chapter 298 Water Control District'.

The Context: These districts are quasi-governmental and levy hidden assessments. Data exists in disparate GIS files and Tax Rolls.

The Task:
1. Geospatial Architecture: Set up a BigQuery GIS table to store the polygons of Florida's special districts. Write a SQL query using ST_CONTAINS to check if a user-provided Lat/Long is inside a district.

2. Tax Roll Correlation: We have raw CSV tax rolls (NAL files) for Florida counties. Write a Dataflow job to filter these rolls for 'Non-Ad Valorem' codes associated with water/drainage.

3. Fuzzy Matching Strategy: Sometimes the GIS boundary is slightly off. Implement a logic where if the GIS match is negative, but the Tax Roll confirms a drainage payment for that Parcel ID, the API returns 'Positive' with a 'Data Source: Tax Roll' flag.
```

---

## GTM Role

**The ATM (Day 1 Cash Flow)**
- No UI required, just an API
- Sell "District Risk Reports" for $500 each while building
- First revenue funds the other products
