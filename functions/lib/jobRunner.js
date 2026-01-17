"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onJobCreated = void 0;
const firestore_1 = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");
const firestore_2 = require("firebase-admin/firestore");
const contextHandler_1 = require("./handlers/contextHandler");
const scoreHandler_1 = require("./handlers/scoreHandler");
const deliveryHandler_1 = require("./handlers/deliveryHandler");
const firebase_1 = require("./firebase");
/**
 * Job Runner
 * Triggered when a new Job is created in /jobs.
 * Dispatches to the appropriate handler based on jobType.
 * Handles locking ensures serialization if needed (though Firestore trigger is per doc).
 */
exports.onJobCreated = (0, firestore_1.onDocumentCreated)("jobs/{jobId}", async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
        return;
    }
    const jobId = event.params.jobId;
    const jobData = snapshot.data();
    const { jobType, orderId, status } = jobData;
    logger.info(`Job Runner triggered for ${jobId} (${jobType})`);
    try {
        // Locking Mechanism
        // Using transaction or simple check-and-set if we want strict single execution
        //Triggers are "at least once", so idempotency in handlers is best.
        // For this MVP, we update status to RUNNING.
        if (status !== "QUEUED") {
            logger.info(`Job ${jobId} is not QUEUED (${status}). Skipping.`);
            return;
        }
        await snapshot.ref.update({
            status: "RUNNING",
            startedAt: firestore_2.FieldValue.serverTimestamp(),
            lockedAt: firestore_2.FieldValue.serverTimestamp() // Simple lock
        });
        // Dispatch
        let result = null;
        switch (jobType) {
            case "CONTEXT_PACK":
                result = await (0, contextHandler_1.handleContextPack)(firebase_1.db, jobId, orderId);
                break;
            case "SCORECARD_GEN":
                result = await (0, scoreHandler_1.handleScorecardGen)(firebase_1.db, jobId, orderId);
                break;
            case "AUDIT_GEN":
                result = await (0, scoreHandler_1.handleAuditGen)(firebase_1.db, jobId, orderId); // Reusing logic or separate
                break;
            case "DELIVERY":
                result = await (0, deliveryHandler_1.handleDelivery)(firebase_1.db, jobId, orderId);
                break;
            default:
                logger.warn(`Unknown jobType: ${jobType}`);
                throw new Error(`Unknown jobType: ${jobType}`);
        }
        // Completion
        await snapshot.ref.update({
            status: "SUCCEEDED",
            completedAt: firestore_2.FieldValue.serverTimestamp(),
            resultSummary: result || "Completed"
        });
        logger.info(`Job ${jobId} SUCCEEDED.`);
    }
    catch (error) {
        logger.error(`Job ${jobId} FAILED:`, error);
        await snapshot.ref.update({
            status: "FAILED",
            error: error.message || String(error),
            failedAt: firestore_2.FieldValue.serverTimestamp()
        });
        // Retry logic could be implemented here or natively via retry config
    }
});
//# sourceMappingURL=jobRunner.js.map