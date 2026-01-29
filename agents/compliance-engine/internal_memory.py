from google.cloud import discoveryengine_v1 as discoveryengine
import logging
from typing import List, Dict, Any

logger = logging.getLogger('InternalMemory')

class InternalMemory:
    def __init__(self, project_id: str, location: str, data_store_id: str):
        self.project_id = project_id
        self.location = location
        self.data_store_id = data_store_id
        self.client = discoveryengine.SearchServiceClient()

    def search_internal_docs(self, query: str) -> List[Any]:
        """
        Searches internal documentation (Drive, Notion, etc) via Vertex AI.
        """
        if not self.data_store_id:
            logger.warning("No Internal Memory Data Store ID configured.")
            return []

        try:
            serving_config = self.client.serving_config_path(
                project=self.project_id,
                location=self.location,
                data_store=self.data_store_id,
                serving_config="default_config",
            )
            request = discoveryengine.SearchRequest(
                serving_config=serving_config,
                query=query,
                page_size=5,
            )
            response = self.client.search(request)
            return list(response.results)
        except Exception as e:
            logger.error(f"Internal memory search failed: {e}")
            return []
