import os
import logging
from flask import Flask, request, jsonify
from compliance_checker import ComplianceChecker

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('AridComplianceService')

app = Flask(__name__)

# Initialize Checker
# We rely on env vars injected by Cloud Run
PROJECT_ID = os.environ.get("GCP_PROJECT_ID", "aridinsights-prod") # Fallback to prod or safe default
LOCATION = os.environ.get("GCP_LOCATION", "global")
DATA_STORE_ID = os.environ.get("DATA_STORE_ID", "regulations-store")

checker = ComplianceChecker(
    project_id=PROJECT_ID,
    location=LOCATION,
    data_store_id=DATA_STORE_ID
)

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "service": "arid-compliance-engine"}), 200

@app.route("/check", methods=["POST"])
def check_compliance():
    """
    Endpoint to check text against compliance rules.
    Expects JSON: {"text": "feature description params"}
    """
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify({"error": "Missing 'text' field in JSON body"}), 400

    feature_text = data["text"]
    logger.info(f"Received compliance check request for: {feature_text[:50]}...")

    try:
        result = checker.check_compliance(feature_text)
        return jsonify(result), 200
    except Exception as e:
        logger.error(f"Error processing request: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Local dev support
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
