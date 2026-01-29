"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertCustomer = upsertCustomer;
const firestore_1 = require("firebase-admin/firestore");
const crypto = require("crypto");
const firebase_1 = require("../firebase");
/**
 * Upsert Customer
 * - Hashes email to create a consistent ID (or uses provided ID if internal)
 * - Updates lastSeenAt
 * - Merges new info
 */
async function upsertCustomer(email, extraData = {}) {
    if (!email)
        return null;
    // Use a hash of the email as the customer ID to ensure uniqueness without exposing email in ID if preferred,
    // or just use email as key if safe. Here we use a hash for consistency.
    const customerId = crypto.createHash("sha256").update(email.toLowerCase().trim()).digest("hex");
    const customerRef = firebase_1.db.collection("customers").doc(customerId);
    const updateData = Object.assign({ email: email.toLowerCase().trim(), lastSeenAt: firestore_1.FieldValue.serverTimestamp() }, extraData);
    // Use set with merge: true to create or update
    // We only set createdAt if it doesn't exist (handled by merge logic? No, merge overwrites.
    // We need to verify existence if we want strict createdAt preservation, or just ignore it/set it once.
    // Firestore merge will preserve fields not mentioned.
    // But to set createdAt ONLY on creation, we might need a check.
    // Optimization: Just set it. If it exists, we don't want to overwrite provided createdAt?
    // Actually, standard pattern:
    const doc = await customerRef.get();
    if (!doc.exists) {
        await customerRef.set(Object.assign(Object.assign({}, updateData), { createdAt: firestore_1.FieldValue.serverTimestamp() }));
    }
    else {
        await customerRef.set(updateData, { merge: true });
    }
    return customerId;
}
//# sourceMappingURL=customerUtils.js.map