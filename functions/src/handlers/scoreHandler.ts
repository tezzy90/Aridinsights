import { Firestore, FieldValue } from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";
import { THRESHOLDS } from "../config/thresholds";

// Helper for Autonomy Scoring
function calculateAutonomyScores(contextPack: any) {
    // Mock Scoring Logic
    // In real impl: analyze evidence freshness, source types, etc.
    return {
        completeness: 85,
        evidence: 80,
        freshness: 90,
        consistency: 95
    };
}

export async function handleScorecardGen(db: Firestore, jobId: string, orderId: string) {
    return runScorer(db, jobId, orderId, "SCORECARD");
}

export async function handleAuditGen(db: Firestore, jobId: string, orderId: string) {
    return runScorer(db, jobId, orderId, "AUDIT");
}

async function runScorer(db: Firestore, jobId: string, orderId: string, policy: "SCORECARD" | "AUDIT") {
    logger.info(`Running Scorer (${policy}) for Order ${orderId}`);

    // Fetch Context Pack
    // We assume contextPackId was passed in job, or we derive/lookup
    // For simplicity, derive common ID pattern or query
    const contextPackId = `cp_${orderId}`;
    const cpRef = db.collection("contextPacks").doc(contextPackId);
    const cpDoc = await cpRef.get();

    if (!cpDoc.exists) throw new Error(`Context Pack ${contextPackId} missing`);
    const contextPack = cpDoc.data();

    // 1. Score
    const scores = calculateAutonomyScores(contextPack);

    // 2. Threshold Check
    const thresholds = THRESHOLDS[policy];
    const failedReasons: string[] = [];

    if (scores.completeness < thresholds.completeness) failedReasons.push(`Completeness ${scores.completeness} < ${thresholds.completeness}`);
    if (scores.evidence < thresholds.evidence) failedReasons.push("Evidence Insufficient");
    // ... check others

    if (failedReasons.length > 0) {
        // QUARANTINE
        logger.warn(`Order ${orderId} failed thresholds: ${failedReasons.join(", ")}`);
        const quarantineId = `q_${orderId}`;
        await db.collection("quarantine").doc(quarantineId).set({
            quarantineId,
            orderId,
            reasonCodes: failedReasons,
            failedThresholds: scores,
            manualResolutionStatus: "PENDING",
            createdAt: FieldValue.serverTimestamp()
        });

        // Update Order Status
        await db.collection("orders").doc(orderId).update({
            status: "QUARANTINED",
            updatedAt: FieldValue.serverTimestamp()
        });

        return `Quarantined: ${failedReasons.join("; ")}`;
    }

    // 3. Generate Output (Vertex AI Stub)
    // Real impl: Use Vertex AI to generate JSON based on Context Pack
    const outputJson = {
        title: "Water Risk Scorecard",
        score: "B+",
        summary: "Moderate risk due to cooling demand...",
        sections: [
            { heading: "Authority", content: "Served by OUC..." }
        ]
    };

    // 4. Queue Delivery
    const nextJobId = `job_${orderId}_delivery`;
    await db.collection("jobs").doc(nextJobId).set({
        orderId,
        jobType: "DELIVERY",
        contextPackId,
        outputJson, // Pass payload forward (or store in GCS and pass ref)
        status: "QUEUED",
        attempts: 0,
        createdAt: FieldValue.serverTimestamp()
    });

    return "Scorecard Generated & Passed";
}
