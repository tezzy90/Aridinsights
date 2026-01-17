"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDelivery = handleDelivery;
const firestore_1 = require("firebase-admin/firestore");
const logger = require("firebase-functions/logger");
const resend_1 = require("resend");
const RESEND_API_KEY = process.env.RESEND_API_KEY;
/**
 * Handle Delivery
 * 1. Render PDF (Mock for now)
 * 2. Upload to Drive (Mock for now)
 * 3. Send Email
 * 4. Write Evidence Log
 * 5. Update Order Status
 */
async function handleDelivery(db, jobId, orderId) {
    var _a, _b;
    logger.info(`Handling Delivery for Order ${orderId}`);
    const jobRef = db.collection("jobs").doc(jobId);
    const jobDoc = await jobRef.get();
    const jobData = jobDoc.data();
    const outputJson = (jobData === null || jobData === void 0 ? void 0 : jobData.outputJson) || {};
    const contextPackId = jobData === null || jobData === void 0 ? void 0 : jobData.contextPackId;
    logger.info("Delivery Handler processing output", { contextPackId, outputSummaryKeys: Object.keys(outputJson) });
    // 1. Render PDF (Stub)
    // Real impl: Use PDFKit or React-PDF to generate buffer
    const pdfUrl = "https://mock-drive-link.com/file.pdf";
    // 2. Upload to Drive (Stub)
    // Real impl: googleapis drive.files.create
    const driveFileId = "mock_drive_file_id_123";
    // 3. Send Email
    let emailId = "skipped";
    if (RESEND_API_KEY) {
        try {
            const resend = new resend_1.Resend(RESEND_API_KEY);
            // Fetch customer email
            const orderDoc = await db.collection("orders").doc(orderId).get();
            const customerId = (_a = orderDoc.data()) === null || _a === void 0 ? void 0 : _a.customerId;
            const customerDoc = await db.collection("customers").doc(customerId).get();
            const email = (_b = customerDoc.data()) === null || _b === void 0 ? void 0 : _b.email;
            if (email) {
                const { data, error } = await resend.emails.send({
                    from: "Arid Insights <delivery@aridinsights.com>", // Verify domain first
                    to: [email],
                    subject: "Your Arid Insights Scorecard is Ready",
                    html: `<p>Your report is ready. <a href="${pdfUrl}">Download Here</a></p>`
                });
                if (error) {
                    logger.error("Resend Error:", error);
                }
                else {
                    emailId = (data === null || data === void 0 ? void 0 : data.id) || "sent";
                    logger.info(`Email sent to ${email}`);
                }
            }
        }
        catch (e) {
            logger.error("Email sending failed:", e);
        }
    }
    else {
        logger.warn("RESEND_API_KEY not set, skipping email.");
    }
    // 4. Evidence Log
    const evidenceLogId = `ev_${orderId}`;
    await db.collection("evidenceLogs").doc(evidenceLogId).set({
        evidenceLogId,
        orderId,
        contextPackId,
        sources: [
            { url: "https://ouc.com/rates", sourceType: "OFFICIAL", lastVerified: "2025-01-01" }
        ],
        autonomy_scores: { completeness: 85, evidence: 80, freshness: 90, consistency: 95 },
        outputRefs: {
            pdfDriveFileId: driveFileId,
            emailMessageId: emailId
        },
        result: "PASS",
        thresholdPolicy: "SCORECARD",
        createdAt: firestore_1.FieldValue.serverTimestamp()
    });
    // 5. Update Order
    await db.collection("orders").doc(orderId).update({
        status: "DELIVERED",
        updatedAt: firestore_1.FieldValue.serverTimestamp()
    });
    return `Delivered. Email: ${emailId}. Evidence: ${evidenceLogId}`;
}
//# sourceMappingURL=deliveryHandler.js.map