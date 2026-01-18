const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

try { initializeApp(); } catch (e) { }

const db = getFirestore();

async function verifyOutput() {
    const orderId = "MANUAL_TEST_ORDER_001";
    const contextPackId = `cp_${orderId}`;

    console.log("Checking Context Pack...");
    const cpDoc = await db.collection("contextPacks").doc(contextPackId).get();
    if (cpDoc.exists) {
        console.log("SUCCESS: Context Pack found:", cpDoc.data());
    } else {
        console.log("FAIL: Context Pack NOT found.");
    }

    // Check for next jobs
    const scoreJobId = `job_${orderId}_scorecard_gen`;
    const scoreJobDoc = await db.collection("jobs").doc(scoreJobId).get();
    if (scoreJobDoc.exists) {
        console.log("SUCCESS: Scorecard Job found:", scoreJobDoc.data().status);
    } else {
        console.log(`NOTE: Scorecard Job ${scoreJobId} not found (might be named differently or not created yet).`);
    }

    console.log("Done.");
}

verifyOutput().catch(console.error);
