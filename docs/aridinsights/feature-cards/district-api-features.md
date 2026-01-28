# Feature Cards: District Due Diligence API

> **Product:** District Due Diligence API (Product 1)
> **Created:** 2026-01-27
> **Framework:** 7-Element Agentic Feature Definition

---

## Feature 1: Address Lookup

### 1. User Intent
"I want to check if a property address is inside a Chapter 298 Drainage District so I can identify hidden tax liabilities before closing."

### 2. Outcome
A JSON response containing:
- `in_district`: boolean
- `district_name`: string or null
- `estimated_annual_fee`: number
- `risk_level`: "HIGH" | "MEDIUM" | "LOW" | "NONE"
- `data_source`: "GIS" | "Tax Roll" | "Both"

### 3. Inputs
| Input | Source | Required |
|-------|--------|----------|
| Address string | User (API request) | Yes |
| API Key | User (header) | Yes |
| Geocoding result | Google Maps API | Internal |

### 4. Agent Plan
```
1. Receive address string
2. Geocode address → (lat, lng)
3. Query BigQuery GIS: ST_CONTAINS(district_polygon, POINT(lat, lng))
4. If no GIS match → Query Tax Roll by parcel_id for NAL codes
5. Calculate risk_level based on fee amount
6. Return JSON response
```

### 5. Tools & Permissions
| Tool | Permission | Scope |
|------|------------|-------|
| BigQuery | Read-only | `arid_insights.districts` table |
| Cloud Storage | Read-only | Tax roll files |
| Google Maps Geocoding | Read-only | Address → coordinates |

### 6. Verification
- [ ] GIS match returns valid district_id
- [ ] Tax Roll fallback triggers on GIS miss
- [ ] Response schema validates against OpenAPI spec
- [ ] Latency < 2 seconds (p95)

### 7. Failure Modes
| Failure | Behavior |
|---------|----------|
| Geocoding fails | Return `{"error": "Unable to geocode address", "code": 400}` |
| No data found | Return `{"in_district": false, "confidence": 0.0}` |
| BigQuery timeout | Retry 2x, then return `{"error": "Service unavailable", "code": 503}` |

---

## Feature 2: Bulk Parcel Check

### 1. User Intent
"I have a spreadsheet of 500 parcels for a land acquisition. I need to check all of them for drainage district risks in one batch."

### 2. Outcome
A downloadable CSV file with original parcel data + appended columns:
- `in_district`, `district_name`, `estimated_fee`, `risk_level`

### 3. Inputs
| Input | Source | Required |
|-------|--------|----------|
| CSV file (parcel_id, address) | User upload | Yes |
| Email address | User | Yes (for delivery) |
| API Key | User | Yes |

### 4. Agent Plan
```
1. Validate CSV format (required columns present)
2. Queue job in Cloud Tasks
3. For each row:
   a. Geocode if address provided
   b. Query GIS + Tax Roll (same as Feature 1)
4. Aggregate results into output CSV
5. Upload to signed Cloud Storage URL
6. Email user download link
```

### 5. Tools & Permissions
| Tool | Permission | Scope |
|------|------------|-------|
| Cloud Tasks | Write | Job queue |
| Cloud Storage | Write | Output files |
| SendGrid | Write | Email delivery |
| BigQuery | Read | District tables |

### 6. Verification
- [ ] Job completes within 5 minutes for 500 rows
- [ ] Output CSV row count matches input
- [ ] Email delivered with valid download link
- [ ] Link expires after 24 hours

### 7. Failure Modes
| Failure | Behavior |
|---------|----------|
| Invalid CSV format | Return `{"error": "Missing required column: parcel_id"}` |
| Row-level geocoding failure | Mark row as `"status": "geocode_failed"`, continue |
| Job timeout (>15 min) | Email partial results + error notice |

---

## Feature 3: Risk Score Calculation

### 1. User Intent
"I need a standardized risk score (not just yes/no) so I can compare properties and prioritize due diligence."

### 2. Outcome
A numeric `risk_score` (0-100) with explanation factors.

### 3. Inputs
| Input | Source | Required |
|-------|--------|----------|
| District ID | Internal (from GIS match) | Yes |
| Estimated fee | Internal | Yes |
| Historical assessment trend | BigQuery | Optional |

### 4. Agent Plan
```
1. Base score = 0 if not in district
2. If in district:
   a. fee_score = min(50, fee / 20)  # $1000 fee = 50 points
   b. history_score = 10 if assessments increased >10% in 3 years
   c. bond_score = 20 if district has outstanding bond debt
   d. legal_score = 20 if district has pending litigation
3. risk_score = sum(all scores), capped at 100
4. Include breakdown in response
```

### 5. Tools & Permissions
| Tool | Permission | Scope |
|------|------------|-------|
| BigQuery | Read-only | Historical assessments |
| Firestore | Read-only | District metadata (bonds, litigation) |

### 6. Verification
- [ ] Score reproducible given same inputs
- [ ] Breakdown factors sum to total score
- [ ] Historical data < 90 days old

### 7. Failure Modes
| Failure | Behavior |
|---------|----------|
| No historical data | Return score without history_score component, flag `"data_gap": "no_history"` |
| District metadata missing | Return base fee_score only, flag `"data_gap": "no_metadata"` |

---

## Feature 4: API Authentication

### 1. User Intent
"I need to securely access the API with my organization's credentials and track usage for billing."

### 2. Outcome
- Valid API key returns data
- Invalid key returns 401
- Usage logged for billing

### 3. Inputs
| Input | Source | Required |
|-------|--------|----------|
| API Key | Request header (`X-API-Key`) | Yes |

### 4. Agent Plan
```
1. Extract API key from header
2. Validate against Firestore `api_keys` collection
3. If invalid → 401 Unauthorized
4. If valid:
   a. Check rate limit (100 req/min)
   b. If exceeded → 429 Too Many Requests
   c. Log request to usage_logs collection
   d. Proceed to requested endpoint
```

### 5. Tools & Permissions
| Tool | Permission | Scope |
|------|------------|-------|
| Firestore | Read/Write | `api_keys`, `usage_logs` |
| Cloud Run | Execute | API handlers |

### 6. Verification
- [ ] Invalid key returns 401 within 100ms
- [ ] Rate limit enforced correctly
- [ ] Usage logged with timestamp, key_id, endpoint

### 7. Failure Modes
| Failure | Behavior |
|---------|----------|
| Missing header | Return `{"error": "API key required", "code": 401}` |
| Firestore unreachable | Return `{"error": "Authentication service unavailable", "code": 503}` |
| Rate limit exceeded | Return `{"error": "Rate limit exceeded", "retry_after": 60, "code": 429}` |
