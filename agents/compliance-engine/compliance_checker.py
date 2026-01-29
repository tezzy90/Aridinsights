import os
import logging
from typing import List, Dict, Any

# Optional: Import discovery engine client if available, otherwise mock for now until dependencies installed
try:
    from google.cloud import discoveryengine_v1 as discoveryengine
except ImportError:
    discoveryengine = None

logger = logging.getLogger('ComplianceChecker')

class ComplianceChecker:
    def __init__(self, project_id: str, location: str, data_store_id: str):
        self.project_id = project_id
        self.location = location
        self.data_store_id = data_store_id
        self.client = None
        
        if discoveryengine:
            self.client = discoveryengine.SearchServiceClient()
        else:
            logger.warning("google-cloud-discoveryengine not installed, compliance checks will fail.")

    def check_compliance(self, feature_description: str) -> Dict[str, Any]:
        """
        Checks a feature description against the compliance data store.
        """
        compliance_risk = False
        findings = []

        # 1. Keyword pre-filter (Fast check)
        risk_keywords = ["determine", "certify", "assess risk", "calculate flood", "approve"]
        validation_hits = [kw for kw in risk_keywords if kw in feature_description.lower()]
        
        if validation_hits:
            compliance_risk = True
            findings.append(f"Found risky keywords: {', '.join(validation_hits)}. These often imply licensed professional work.")

        # 2. RAG Search against Regulations (Deep check)
        if self.client and self.data_store_id:
            try:
                search_results = self._search_regulations(f"Is '{feature_description}' a regulated activity?")
                # TODO: Process search results to determine compliance violation
                # For now, just attaching the results
                findings.append({"rag_search_results": [r.document.name for r in search_results]})
            except Exception as e:
                logger.error(f"Failed to search regulations: {e}")
                findings.append(f"Error checking regulations: {str(e)}")

        return {
            "compliant": not compliance_risk,
            "findings": findings
        }

    def _search_regulations(self, query: str) -> List[Any]:
        serving_config = self.client.serving_config_path(
            project=self.project_id,
            location=self.location,
            data_store=self.data_store_id,
            serving_config="default_config",
        )
        request = discoveryengine.SearchRequest(
            serving_config=serving_config,
            query=query,
            page_size=3,
        )
        response = self.client.search(request)
        return list(response.results)
