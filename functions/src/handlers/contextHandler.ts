import { Firestore, FieldValue } from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";

/**
 * Handle Context Pack Generation
 * 1. Read Order Inputs
 * 2. Resolve Geometry (Mock/Stub for MVP)
 * 3. Authority Overlay (Mock/Stub)
 * 4. Write /contextPacks
 * 5. Trigger Next Job (SCORECARD_GEN)
 */
export async function handleContextPack(db: Firestore, jobId: string, orderId: string) {
    logger.info(`Handling Context Pack for Order ${orderId}`);

    const orderRef = db.collection("orders").doc(orderId);
    const orderDoc = await orderRef.get();
    if (!orderDoc.exists) throw new Error(`Order ${orderId} not found`);

    const orderData = orderDoc.data();
    const inputs = orderData?.inputs || {};
    const { metro } = inputs;

    // 1. Resolve Geometry & Overlays (Mock Logic for MVP)
    // In real impl: Query BigQuery arid_core.service_areas
    let authorityResolution = {};
    if (metro === "ORLANDO") {
        authorityResolution = {
            county_fips: "12095", // Orange County, FL
            wmd_authority_id: "SJRWMD", // St. Johns River
            operator_authority_ids: ["OUC_WATER"], // Orlando Utilities Commission
            confidence: 90
        };
    } else if (metro === "TAMPA") {
        authorityResolution = {
            county_fips: "12057", // Hillsborough
            wmd_authority_id: "SWFWMD",
            operator_authority_ids: ["TAMPA_WATER"],
            confidence: 85
        };
    } else {
        authorityResolution = {
            county_fips: "UNKNOWN",
            confidence: 50,
            note: "Fallback resolution"
        };
    }

    // 2. Select Rates (Mock)
    const ratesUsed = ["RATE_SCHED_OUC_2025_COMM"];

    // 3. Assumptions
    const assumptions = {
        wue_l_per_kwh: { low: 1.2, base: 1.8, high: 2.5 }, // Standard cooling benchmarks
        monthly_kgal_current: { base: 1000 },
        source: "Arid Insights Baseline v1"
    };

    // 4. Create Context Pack
    const contextPackId = `cp_${orderId}`;
    const contextPackData = {
        contextPackId,
        orderId,
        inputs_summary: inputs,
        authority_resolution: authorityResolution,
        rates_used: ratesUsed,
        assumptions,
        generatedAt: FieldValue.serverTimestamp()
    };

    await db.collection("contextPacks").doc(contextPackId).set(contextPackData);
    logger.info(`Context Pack ${contextPackId} created.`);

    // 5. Queue Next Job: SCORECARD_GEN (or AUDIT based on product)
    const productType = orderData?.productType;
    let nextJobType = "SCORECARD_GEN";
    if (productType === "AUDIT") nextJobType = "AUDIT_GEN";

    const nextJobId = `job_${orderId}_${nextJobType.toLowerCase()}`;
    await db.collection("jobs").doc(nextJobId).set({
        orderId,
        jobType: nextJobType,
        contextPackId, // Pass context pack ID forward
        status: "QUEUED",
        attempts: 0,
        maxAttempts: 3,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
    });

    return `Context Pack Created: ${contextPackId}`;
}
