"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
// Initialize once
try {
    (0, app_1.initializeApp)({ projectId: "aridinsights-dev" });
    console.log("Sanity Log: Initialized Firebase App with explicit projectId: aridinsights-dev");
}
catch (e) {
    console.log("Sanity Log: App already initialized or failed.", e);
}
exports.db = (0, firestore_1.getFirestore)();
exports.db.settings({ ignoreUndefinedProperties: true });
//# sourceMappingURL=firebase.js.map