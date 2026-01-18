"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleScorecardGen = handleScorecardGen;
exports.handleAuditGen = handleAuditGen;
const firestore_1 = require("firebase-admin/firestore");
const logger = require("firebase-functions/logger");
const thresholds_1 = require("../config/thresholds");
// Helper for Autonomy Scoring
function calculateAutonomyScores(contextPack) {
    // Mock Scoring Logic
    // In real impl: analyze evidence freshness, source types, etc.
    // MOCK FAILURE for E2E Testing
    if (contextPack && contextPack.orderId && contextPack.orderId.includes("FAIL_SCORE")) {
        return {
            completeness: 50,
            evidence: 50,
            freshness: 50,
            consistency: 50
        };
    }
    return {
        completeness: 85,
        evidence: 80,
        freshness: 90,
        consistency: 95
    };
}
async function handleScorecardGen(db, jobId, orderId) {
    return runScorer(db, jobId, orderId, "SCORECARD");
}
async function handleAuditGen(db, jobId, orderId) {
    return runScorer(db, jobId, orderId, "AUDIT");
}
async function runScorer(db, jobId, orderId, policy) {
    logger.info(`Running Scorer (${policy}) for Order ${orderId}`);
    // Fetch Context Pack
    // We assume contextPackId was passed in job, or we derive/lookup
    // For simplicity, derive common ID pattern or query
    const contextPackId = `cp_${orderId}`;
    const cpRef = db.collection("contextPacks").doc(contextPackId);
    const cpDoc = await cpRef.get();
    if (!cpDoc.exists)
        throw new Error(`Context Pack ${contextPackId} missing`);
    const contextPack = cpDoc.data();
    // 1. Score
    // Ensure contextPack has orderId attached or passed
    const scores = calculateAutonomyScores(Object.assign(Object.assign({}, contextPack), { orderId }));
    // 2. Threshold Check
    const thresholds = thresholds_1.THRESHOLDS[policy];
    const failedReasons = [];
    if (scores.completeness < thresholds.completeness)
        failedReasons.push(`Completeness ${scores.completeness} < ${thresholds.completeness}`);
    if (scores.evidence < thresholds.evidence)
        failedReasons.push("Evidence Insufficient");
    // ... check others
    if (failedReasons.length > 0) {
        // INVARIANT D: Evidence Log must be written even if quarantined
        const evidenceLogId = `ev_${orderId}`;
        await db.collection("evidenceLogs").doc(evidenceLogId).set({
            evidenceLogId,
            orderId,
            contextPackId,
            sources: [], // Should populate with actual sources from ContextPack
            autonomy_scores: scores,
            result: "QUARANTINE",
            thresholdPolicy: policy,
            createdAt: firestore_1.FieldValue.serverTimestamp()
        });
        // QUARANTINE
        logger.warn(`Order ${orderId} failed thresholds: ${failedReasons.join(", ")}`);
        const quarantineId = `q_${orderId}`;
        await db.collection("quarantine").doc(quarantineId).set({
            quarantineId,
            orderId,
            reasonCodes: failedReasons,
            failedThresholds: scores,
            manualResolutionStatus: "PENDING",
            evidenceLogId, // Link to evidence
            createdAt: firestore_1.FieldValue.serverTimestamp()
        });
        // Update Order Status
        await db.collection("orders").doc(orderId).update({
            status: "QUARANTINED",
            updatedAt: firestore_1.FieldValue.serverTimestamp()
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
        createdAt: firestore_1.FieldValue.serverTimestamp()
    });
    return "Scorecard Generated & Passed";
}
//# sourceMappingURL=scoreHandler.js.map