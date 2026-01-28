# Arid Insights Documentation Standards

> **Purpose:** Define documentation standards that meet enterprise architect and investor scrutiny
> **Status:** DRAFT - Needs Review
> **Created:** 2026-01-28

---

## 1. Documentation Hierarchy

```
docs/aridinsights/
├── 00_master-strategy/          # Vision & Strategic Direction
├── 01_aig-os-constitution/      # Governance & Operating Principles
├── 02_data-dictionary/          # Schema & Data Contracts ✅ EXISTS
├── 03_prompt-library/           # AI Prompts & System Instructions
├── 04_universal-rate-source-index/  # Rate Data Sources
├── 05_change-control/           # Version History & Decisions
├── 06_risk-disclaimers/         # Legal & Liability
├── 07_architecture/             # 🆕 Technical Architecture (ADRs)
├── 08_api-specs/                # 🆕 OpenAPI Specifications
├── business-plans/              # Investor-Ready Documents
├── products/                    # Product PRDs ✅ EXISTS
├── prompts/                     # Gem System Prompts ✅ EXISTS
└── feature-cards/               # Agentic Feature Definitions ✅ EXISTS
```

---

## 2. Architecture Decision Records (ADRs)

### What Passes Scrutiny
ADRs document **why** decisions were made, not just what was decided. Elite architects and investors want to see:

1. **Context** - What problem/opportunity triggered this decision?
2. **Decision Drivers** - Constraints, requirements, priorities
3. **Options Considered** - At least 2-3 alternatives evaluated
4. **Decision** - What was chosen and why
5. **Consequences** - Trade-offs, risks, follow-up items
6. **Status** - Proposed → Accepted → Superseded

### ADR Template

```markdown
# ADR-{NUMBER}: {TITLE}

**Status:** Proposed | Accepted | Deprecated | Superseded
**Date:** YYYY-MM-DD
**Deciders:** [list of stakeholders]
**Technical Story:** [link to Jira issue]

## Context and Problem Statement

{2-3 sentences describing the problem or decision point}

## Decision Drivers

- [driver 1, e.g., "Must integrate with BigQuery"]
- [driver 2, e.g., "Budget constraint of $X/month"]
- [driver 3, e.g., "Must support offline operation"]

## Considered Options

1. {Option 1}
2. {Option 2}
3. {Option 3}

## Decision Outcome

Chosen option: **"{Option X}"**, because {justification}.

### Positive Consequences

- {e.g., "Reduces latency by 50%"}
- {e.g., "Enables future feature Y"}

### Negative Consequences

- {e.g., "Increases cloud cost by $X/month"}
- {e.g., "Requires team to learn new technology"}

## Pros and Cons of Options

### {Option 1}

{Description}

- ✅ Good, because {reason}
- ⚠️ Neutral, because {reason}
- ❌ Bad, because {reason}

### {Option 2}

{repeat structure}
```

### Required ADRs for Arid Insights

| ADR # | Topic | Status |
|-------|-------|--------|
| ADR-001 | GCP as Primary Cloud Provider | NEEDED |
| ADR-002 | BigQuery for Geospatial Data | NEEDED |
| ADR-003 | Firestore for Operational Data | NEEDED |
| ADR-004 | Evidence-First Architecture | NEEDED |
| ADR-005 | Autonomy Contract Pattern | NEEDED |
| ADR-006 | CRM Strategy (HubSpot → Custom) | NEEDED |

---

## 3. Software Design Documents (SDDs)

### Structure for Each Product

```markdown
# {Product Name} - Software Design Document

## 1. Overview
- Purpose
- Scope
- Definitions & Acronyms

## 2. Architecture
- High-Level Architecture (Mermaid diagram)
- Component Breakdown
- Data Flow
- Integration Points

## 3. Data Model
- Entity Relationship Diagram
- Schema Definitions (link to Data Dictionary)
- Data Validation Rules

## 4. API Design
- Endpoints (OpenAPI reference)
- Authentication & Authorization
- Rate Limiting & Quotas
- Error Handling

## 5. Security Considerations
- Data Classification
- Encryption (at rest, in transit)
- Access Control
- Audit Logging

## 6. Deployment
- Infrastructure (Terraform)
- CI/CD Pipeline
- Environment Configuration
- Rollback Procedures

## 7. Observability
- Logging Strategy
- Metrics & Dashboards
- Alerting Rules
- Tracing

## 8. Testing Strategy
- Unit Tests
- Integration Tests
- E2E Tests
- Load Tests
```

---

## 4. API Specification Standard (OpenAPI 3.1)

### Requirements

1. **Every API endpoint** must have an OpenAPI spec
2. **Stored in** `docs/aridinsights/08_api-specs/{product}.yaml`
3. **Includes:**
   - Complete request/response schemas
   - Authentication requirements
   - Error response codes
   - Example payloads

### Example Structure

```yaml
openapi: 3.1.0
info:
  title: District Due Diligence API
  version: 1.0.0
  description: |
    Point-in-polygon lookup for Chapter 298 Water Control Districts.
    Returns district jurisdiction and assessment risk information.

servers:
  - url: https://api.aridinsights.com/v1
    description: Production

security:
  - apiKey: []

paths:
  /lookup:
    post:
      summary: Single address lookup
      operationId: lookupAddress
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LookupRequest'
      responses:
        '200':
          description: Successful lookup
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LookupResponse'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/InternalError'

components:
  schemas:
    LookupRequest:
      type: object
      required:
        - address
      properties:
        address:
          type: string
          example: "123 Main St, Orlando, FL 32801"
    
    LookupResponse:
      type: object
      properties:
        parcel_id:
          type: string
        districts:
          type: array
          items:
            $ref: '#/components/schemas/DistrictInfo'
        risk_score:
          type: number
          format: float
          minimum: 0
          maximum: 1

  securitySchemes:
    apiKey:
      type: apiKey
      in: header
      name: X-API-Key
```

---

## 5. Testing & Quality Standards

### Coverage Requirements

| Type | Minimum Coverage | Notes |
|------|-----------------|-------|
| Unit Tests | 80% | Core business logic |
| Integration Tests | 100% of API endpoints | Happy path + error cases |
| E2E Tests | Critical user journeys | Automated via Playwright |

### Quality Gates

Before any commit:
- [ ] Linting passes (ESLint, Prettier)
- [ ] Unit tests pass
- [ ] No new vulnerabilities (npm audit)

Before any release:
- [ ] All tests pass
- [ ] API docs updated
- [ ] ADR written for significant decisions
- [ ] Change log updated

---

## 6. Investor/Architect Scrutiny Checklist

### What They Look For

| Dimension | What Impresses | What Raises Red Flags |
|-----------|---------------|----------------------|
| **Architecture** | Clear diagrams, separation of concerns, scalability story | Monolith with no clear boundaries, "we'll scale later" |
| **Decisions** | ADRs showing thoughtful evaluation | "We used X because we knew it" |
| **Data** | Normalized schemas, clear data dictionary | Ad-hoc tables, no documentation |
| **Security** | Explicit threat model, encryption, access control | "We'll add security later" |
| **Testing** | Automated tests, coverage metrics | "We test manually" |
| **Operations** | Monitoring, alerting, runbooks | "We'll know when users complain" |
| **Compliance** | Explicit handling of PII, audit trails | No mention of data handling |

### Current Gap Analysis

| Requirement | Current State | Action Needed |
|-------------|--------------|---------------|
| Architecture Diagrams | ❌ Missing | Create for each product |
| ADRs | ❌ Missing | Write initial 6 ADRs |
| OpenAPI Specs | ❌ Missing | Create for District API |
| Data Dictionary | ✅ Exists | Minor updates |
| Testing Standards | ❌ Informal | Document standard |
| Security Posture | ❌ Undocumented | Create security doc |
| Compliance | ⚠️ Partial (ToS/Privacy) | Complete legal docs |

---

## 7. Recommended Next Steps

### Phase 1: Foundation (Week 1)
1. Create `docs/aridinsights/07_architecture/` directory
2. Write ADR-001 through ADR-003 (core infrastructure choices)
3. Create high-level architecture diagram (Mermaid)

### Phase 2: API Specs (Week 2)
1. Create `docs/aridinsights/08_api-specs/` directory
2. Write OpenAPI spec for District Due Diligence API
3. Set up automated spec validation in CI

### Phase 3: SDDs (Week 3-4)
1. Create SDD for District Due Diligence API (first product)
2. Template for remaining products

### Phase 4: Security & Compliance (Week 4)
1. Create security posture document
2. Draft Privacy Policy and Terms of Service
3. Document data handling practices

---

## References

- [ADR GitHub Template](https://github.com/joelparkerhenderson/architecture-decision-record)
- [OpenAPI Specification](https://spec.openapis.org/oas/v3.1.0)
- [C4 Model for Architecture](https://c4model.com/)
- [MADR Template](https://adr.github.io/madr/)
