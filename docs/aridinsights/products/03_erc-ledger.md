# 📦 Product 3: ERC Ledger (Capacity Banking)

> **Status:** MVP Definition
> **Pain Point Solved:** #6 (Ghost Inventory)
> **Revenue Model:** Enterprise SaaS ($50k/year)

---

## Problem Statement

Utilities track "Equivalent Residential Connections" (ERCs) in Excel. They lose millions in revenue because they cannot identify "Ghost Inventory"—reservations that have expired but haven't been returned to the available pool. They deny new developments thinking they're at capacity when they're not.

---

## Target Users

| User | Role | Need |
|------|------|------|
| **Utility Directors** | Approvers | Recover lost capacity |
| **Developer Coordinators** | Clerks | Track reservation status |
| **CFOs** | Finance | Revenue optimization |

---

## Regulatory Context

- **F.S. 163.3180:** Concurrency (must prove utility capacity before building)
- **Level of Service (LOS):** Varies by county (~250-350 GPD/ERC)
- **Letter of Availability (LOA):** Legal document reserving capacity

---

## Key Features (MVP)

### 1. Double-Entry Ledger
Capacity is treated as currency. Transactions use strict debit/credit logic.

| Transaction | Debit | Credit |
|-------------|-------|--------|
| New Reservation | Developer Account | Plant Capacity |
| Clawback | Plant Capacity | Developer Account |
| Connection | Reserved Pool | Connected Pool |

### 2. The "Sunset" Engine
Nightly job checks LOA dates:
```sql
SELECT * FROM Agreements 
WHERE Expiration_Date < CURRENT_DATE 
  AND Building_Permit_Status IS NULL 
  AND Status = 'Active';
```
→ Flags for automatic clawback.

### 3. Dynamic LOS Tables
Configurable lookup tables (County A = 250 GPD/ERC vs. County B = 300 GPD/ERC).

---

## Schema Design

```sql
-- Plant Inventory
CREATE TABLE Plant_Inventory (
    plant_id UUID PRIMARY KEY,
    plant_name TEXT NOT NULL,
    total_capacity_gpd DECIMAL(12,2),
    permitted_capacity_erc DECIMAL(10,2),
    los_gpd_per_erc DECIMAL(6,2) DEFAULT 300
);

-- Immutable Transaction Ledger
CREATE TABLE Reservation_Ledger (
    transaction_id UUID PRIMARY KEY,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    debit_account UUID NOT NULL,
    credit_account UUID NOT NULL,
    amount_erc DECIMAL(10,2) NOT NULL,
    transaction_type TEXT CHECK (type IN ('RESERVE', 'CLAWBACK', 'CONNECT'))
);

-- Agreements (LOAs)
CREATE TABLE Agreements (
    agreement_id UUID PRIMARY KEY,
    developer_id UUID NOT NULL,
    plant_id UUID NOT NULL,
    erc_amount DECIMAL(10,2),
    loa_date DATE,
    expiration_date DATE,
    building_permit_id TEXT,
    status TEXT DEFAULT 'Active'
);
```

---

## Tech Stack (GCP)

| Component | Service | Purpose |
|-----------|---------|---------|
| **Database** | Cloud SQL (PostgreSQL) | ACID compliance, relational integrity |
| **Backend** | Cloud Run (Python/FastAPI) | Business logic |
| **Automation** | Cloud Scheduler | Sunset cron jobs |
| **Email** | SendGrid | Clawback notifications |

---

## Senior Development Prompt

```
Act as a Principal Backend Engineer (Fintech focus). I am building a 'Utility Capacity Ledger' on Google Cloud SQL (Postgres).

The Context: This system tracks 'ERCs' (Equivalent Residential Connections) like a bank ledger under Florida Concurrency Law. We must prevent 'Double Spending' of water capacity.

The Task:
1. Schema Design: Design a normalized schema with Plant_Inventory, Reservation_Ledger (immutable), and Agreements tables.

2. The 'Clawback' Logic: Write a Python function for Cloud Run that:
   - Queries Agreements where Expiration_Date < TODAY and Status == 'Active'
   - Creates a new Ledger_Transaction crediting Plant_Inventory
   - Triggers a SendGrid email notifying admin of clawed back capacity

3. Concurrency Check: Implement a database constraint that rejects any reservation INSERT if SUM(Reservations) > Plant_Total_Limit.
```

---

## GTM Role

**The Castle (Enterprise Recurring Revenue)**
- Hardest to sell, highest value
- Entry via "Forensic Capacity Audit" ($15k one-time)
- Convert to annual license ($50k/year)
