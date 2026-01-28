# 📦 Product 4: LSL Field Kit

> **Status:** MVP Definition
> **Pain Point Solved:** #8 (Lead Service Line Unknowns)
> **Revenue Model:** Grant-Funded R&D → GovTech License

---

## Problem Statement

Under the EPA's new Lead & Copper Rule, utilities submitted inventories in late 2024 with thousands of lines listed as "Material Unknown." They have no efficient workflow to manage the "Dig → Verify → Update Record" cycle. Paper forms are slow, error-prone, and don't create audit-proof records.

---

## Target Users

| User | Role | Need |
|------|------|------|
| **Field Maintenance Crews** | Verification | Mobile-first, offline-capable |
| **Utility Admins** | Compliance | Audit-proof records |
| **EPA Auditors** | Oversight | Chain of custody evidence |

---

## Regulatory Context

- **EPA Lead & Copper Rule Revisions (LCRR):** Mandates service line inventories
- **3-Day Letter Requirement:** If lead found, resident must be notified within 3 days
- **Justice40 Initiative:** Federal funding for disadvantaged communities

---

## Key Features (MVP)

### 1. Offline First
Crews often work in dead zones. App caches data and syncs when online.

### 2. Photo Verification ("Snap & Tag")
- Take photo of pipe scratch test
- App timestamps and geotags automatically
- Metadata embedded in image (Lat/Long, User ID, Date)

### 3. Letter Generation
If `Material == 'Lead'`:
- Auto-generate PDF Notification Letter
- Populate with resident's address
- Email to Utility Admin for mailing

### 4. AI Assist (Optional)
Vertex AI analyzes pipe photo and returns confidence score for Lead vs. Copper.

---

## Data Model (Firestore)

```json
{
  "service_lines": {
    "line_id": "uuid",
    "address": "123 Main St",
    "parcel_id": "12-34-56",
    "material_status": "Unknown | Lead | Copper | GalvanizedRequiringReplacement",
    "verification_date": "2026-01-27",
    "verified_by": "user_id",
    "photo_url": "gs://bucket/photos/line_id.jpg",
    "photo_metadata": {
      "lat": 28.5383,
      "lng": -81.3792,
      "timestamp": "2026-01-27T10:30:00Z"
    },
    "letter_sent": false,
    "letter_date": null,
    "ai_confidence": 0.92,
    "sync_status": "synced | pending"
  }
}
```

---

## Tech Stack (GCP)

| Component | Service | Purpose |
|-----------|---------|---------|
| **Mobile** | Flutter | Single codebase iOS/Android |
| **Backend** | Firebase (Firestore) | Offline sync, real-time |
| **Storage** | Cloud Storage | Photo evidence |
| **AI** | Vertex AI (AutoML Vision) | Pipe material classification |
| **PDF** | Cloud Functions | Letter generation trigger |

---

## Senior Development Prompt

```
Act as a Senior Mobile Architect (Flutter/Firebase Expert). I need a 'Service Line Inventory' app for Florida utilities.

The Context: Crews need to document pipe materials (Lead vs. Copper) to meet EPA mandates. The data must be audit-proof.

The Task:
1. Offline Sync Strategy: Architect a Firebase solution where field data is stored locally and syncs when connectivity is restored. Handle conflict resolution if two crews edit the same asset.

2. Evidence Chain: Design a photo upload flow. Image must be stamped with Metadata (Lat/Long, User ID, Date) and stored in Cloud Storage. Reference URL written to Firestore document.

3. PDF Trigger: Write a Cloud Function triggered by onUpdate. If Material == 'Lead', generate a PDF letter using a template, populate with resident's address, and email to Utility Admin.

4. Vertex AI Integration: Outline how to call Vertex AI API to analyze uploaded pipe photo and return 'Confidence Score' for Lead or Copper.
```

---

## GTM Role

**The Bonus (Grant-Funded R&D)**
- Don't use personal money for mobile dev
- EPA SBIR Grant ($275k+) funds this product
- Use Justice40 narrative for disadvantaged communities
- Non-dilutive capital
