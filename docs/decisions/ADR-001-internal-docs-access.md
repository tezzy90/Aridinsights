# ADR-001: Internal Documentation Access Control

## Status
Accepted

## Date
2026-01-29

## Context
AridInsights maintains internal documentation including:
- prompt libraries
- feature cards
- architecture notes
- operational runbooks

These materials contain sensitive implementation details and must not be publicly accessible.

The project requires:
- fast onboarding for internal contributors
- minimal authentication code
- strong default security
- low operational overhead

## Decision
All internal documentation services deployed on Cloud Run SHALL be protected by **GCP Identity-Aware Proxy (IAP)**.

The application itself SHALL NOT implement authentication or authorization logic for internal docs.

Access control SHALL be managed exclusively through Google Cloud IAM.

## Rationale
- IAP provides Google-managed authentication with minimal attack surface.
- IAM-based access scales cleanly with team growth.
- Eliminates custom auth code and maintenance burden.
- Prevents accidental public exposure.

Firebase Authentication is intentionally deferred and reserved for:
- customer-facing applications
- future productized documentation experiences
- scenarios requiring fine-grained, in-app roles

## Consequences
- Internal documentation requires a Google identity.
- Public documentation must be deployed as a separate service.
- Any request to change access control must update this ADR.

## Revisit Criteria
This decision may be revisited if:
- non-Google identities require access, OR
- documentation becomes a customer-facing product feature

Any change MUST result in a new ADR superseding this one.
