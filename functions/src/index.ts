import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { FieldValue } from "firebase-admin/firestore";
import { upsertCustomer } from "./utils/customerUtils";
import { db } from "./firebase";

import * as crypto from "crypto";

// user-generated signing secret
const SIGNING_SECRET = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

/**
 * 1. Webhook: createOrder
 * Publicly accessible webhook to ingest new orders.
 * Validates payload, ensures idempotency, and writes to /orders.
 */
export const createOrder = onRequest(async (req, res) => {
    try {
        if (req.method !== "POST") {
            res.status(405).send("Method Not Allowed");
            return;
        }

        // Capture raw body for signature verification
        const rawBody = req.rawBody;
        const signature = req.headers["x-signature"] as string || "";

        if (!SIGNING_SECRET) {
            logger.error("Server misconfigured: missing signing secret");
            res.status(500).send("Server Error");
            return;
        }

        const hmac = crypto.createHmac("sha256", SIGNING_SECRET);
        const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
        const signatureBuffer = Buffer.from(signature, "utf8");

        if (!signature || signatureBuffer.length !== digest.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
            logger.warn("Invalid signature attempt.");
            res.status(401).send("Invalid signature");
            return;
        }

        const payload = req.body;

        // Handling LemonSqueezy Payload Structure
        // Payload might be wrapped in 'data' or flat/mixed depending on source/test.
        // We prioritize the structure implied by "Extract: lemonSqueezyOrderId..."
        const data = payload.data || {};
        const attributes = data.attributes || payload;
        const meta = payload.meta || {};
        const customData = meta.custom_data || attributes.custom_data || {};

        const lemonSqueezyOrderId = attributes.order_number ? String(attributes.order_number) : (payload.lemonSqueezyOrderId || "");
        const email = attributes.user_email || payload.email || payload.customerEmail;
        const productType = customData.productType || payload.productType || "SCORECARD";

        if (!lemonSqueezyOrderId || !email) {
            logger.warn("Missing critical order info", { lemonSqueezyOrderId, email });
            res.status(400).send("Missing order details");
            return;
        }

        // Idempotency Key
        const idempotencyKey = `${lemonSqueezyOrderId}_${productType}`;
        const orderId = idempotencyKey;

        // Idempotency Check
        const orderRef = db.collection("orders").doc(orderId);
        const doc = await orderRef.get();
        if (doc.exists) {
            logger.info(`Idempotent: Order ${orderId} exists.`);
            // Return 200 to acknowledge webhook (prevents LS retries)
            res.status(200).json({ status: "EXISTING", message: "Order processed." });
            return;
        }

        // Upsert Customer
        const customerId = await upsertCustomer(email, {
            company: customData.company || "",
            role: customData.role || "OTHER"
        });

        // Prepare Inputs
        const inputs = {
            metro: customData.metro || attributes.metro,
            address: customData.address || attributes.address,
            parcel_polygon_geojson: customData.parcel_polygon_geojson || attributes.parcel_polygon_geojson,
            it_load_mw_current: Number(customData.it_load_mw_current || attributes.it_load_mw_current || 0),
            cooling_profile: customData.cooling_profile || attributes.cooling_profile || "DEFAULT",
            cooling_profile_source: customData.cooling_profile_source || "USER_INPUT",
            it_load_mw_planned: customData.it_load_mw_planned ? Number(customData.it_load_mw_planned) : undefined,
            planned_window: customData.planned_window || "24_MONTHS",
            reclaimed_interest: customData.reclaimed_interest === "true" || customData.reclaimed_interest === true,
        };

        const orderData = {
            orderId,
            customerId,
            lemonSqueezyOrderId,
            productType,
            status: "RECEIVED",
            inputs,
            idempotencyKey,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        };

        await orderRef.set(orderData);
        logger.info(`Order ${orderId} created.`);

        // Dispatch Initial Job
        const jobId = `job_${orderId}`;
        const initialJobType = "CONTEXT_PACK";
        // Note: product logic handles next steps in handlers. 
        // MONITORING might skip Context Pack? Usually not.

        await db.collection("jobs").doc(jobId).set({
            orderId,
            jobType: initialJobType,
            status: "QUEUED",
            attempts: 0,
            maxAttempts: 3,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp()
        });
        logger.info(`Initial Job ${jobId} queued.`);

        res.status(200).send("Order Processed");

    } catch (error) {
        logger.error("Error creating order:", error);
        res.status(500).send("Internal Server Error");
    }
});

/**
 * 2. Job Runner Trigger: onOrderCreated
 * Triggered when a new document is added to /orders.
 * Creates a corresponding job in /jobs to start processing.
 */
// Export Job Runner Trigger (replaces local onOrderCreated relative to functionality)
// The Job Runner triggers on /jobs creation.
export { onJobCreated } from "./jobRunner";

// Note: We removed the local 'onOrderCreated' because the webhook now dispatches jobs
// (Wait, previous webhook code didn't dispatch job, it said "Trigger handles it")
// If we remove 'onOrderCreated', who creates the first job?
// The Plan said: "Dispatch CONTEXT_PACK job immediately" in Webhook.
// BUT I implemented the Webhook (refined version) saying: "// The 'onOrderCreated' trigger handles job creation."
// So I need a trigger that listens to /orders and creates the first job.
// OR I update the webhook to create the first job directly.
// Direct creation is faster and cheaper (no extra function execution).
// Let's UPDATE the webhook in `index.ts` to create the job, AND export `onJobCreated`.
// AND remove `onOrderCreated`.

/**
 * 2. Job Runner (dispatched via Firestore /jobs trigger)
 */
