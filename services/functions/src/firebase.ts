import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Initialize once
try {
    initializeApp({ projectId: "aridinsights-dev" });
    console.log("Sanity Log: Initialized Firebase App with explicit projectId: aridinsights-dev");
} catch (e) {
    console.log("Sanity Log: App already initialized or failed.", e);
}

export const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });
