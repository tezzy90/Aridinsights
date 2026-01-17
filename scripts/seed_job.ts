import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

initializeApp();
const db = getFirestore();

async function createManualJob() {
    const orderId = "MANUAL_TEST_ORDER_001";
    const jobId = `job_${orderId}`;

    console.log(`Creating manual job ${jobId}...`);

    // Create Dummy Order First (needed by Context Handler)
    await db.collection("orders").doc(orderId).set({
        orderId,
        productType: "SCORECARD",
        inputs: {
            metro: "ORLANDO",
            cooling_profile: "TEST_PROFILE"
        },
        status: "RECEIVED_MANUAL",
        createdAt: FieldValue.serverTimestamp()
    });

    // Create Job
    await db.collection("jobs").doc(jobId).set({
        orderId,
        jobType: "CONTEXT_PACK",
        status: "QUEUED",
        createdAt: FieldValue.serverTimestamp()
    });

    console.log("Manual Job Created.");
}

createManualJob().catch(console.error);
