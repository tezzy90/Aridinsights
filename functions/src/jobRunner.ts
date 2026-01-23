import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { defineSecret } from "firebase-functions/params";
import * as logger from "firebase-functions/logger";
import { FieldValue } from "firebase-admin/firestore";
import { handleContextPack } from "./handlers/contextHandler";
import { handleScorecardGen, handleAuditGen } from "./handlers/scoreHandler";
import { handleDelivery } from "./handlers/deliveryHandler";
import { db } from "./firebase";
import { handleAtlassianSync } from "./handlers/atlassianHandler";
import { JobData } from "./types";

const atlassianApiToken = defineSecret("ATLASSIAN_API_TOKEN");

/**
 * Job Runner
 * Triggered when a new Job is created in /jobs.
 * Dispatches to the appropriate handler based on jobType.
 * Handles locking ensures serialization if needed (though Firestore trigger is per doc).
 */
export const onJobCreated = onDocumentCreated({
    document: "jobs/{jobId}",
    secrets: [atlassianApiToken]
}, async (event) => {
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
            startedAt: FieldValue.serverTimestamp(),
            lockedAt: FieldValue.serverTimestamp() // Simple lock
        });

        // Dispatch
        let result: any = null;
        switch (jobType) {
            case "CONTEXT_PACK":
                result = await handleContextPack(db, jobId, orderId);
                break;
            case "SCORECARD_GEN":
                result = await handleScorecardGen(db, jobId, orderId);
                break;
            case "AUDIT_GEN":
                result = await handleAuditGen(db, jobId, orderId); // Reusing logic or separate
                break;
            case "DELIVERY":
                result = await handleDelivery(db, jobId, orderId);
                break;
            case "ATLASSIAN_SYNC":
                result = await handleAtlassianSync(db, jobId, jobData as JobData);
                break;
            default:
                logger.warn(`Unknown jobType: ${jobType}`);
                throw new Error(`Unknown jobType: ${jobType}`);
        }

        // Completion
        await snapshot.ref.update({
            status: "SUCCEEDED",
            completedAt: FieldValue.serverTimestamp(),
            resultSummary: result || "Completed"
        });
        logger.info(`Job ${jobId} SUCCEEDED.`);

    } catch (error: any) {
        logger.error(`Job ${jobId} FAILED:`, error);
        await snapshot.ref.update({
            status: "FAILED",
            error: error.message || String(error),
            failedAt: FieldValue.serverTimestamp()
        });
        // Retry logic could be implemented here or natively via retry config
    }
});
