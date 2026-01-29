import logging
import os
from typing import List, Dict, Any
from googleapiclient.discovery import build

logger = logging.getLogger('ExternalSearch')

class ExternalSearch:
    def __init__(self, api_key: str, cse_id: str):
        self.api_key = api_key
        self.cse_id = cse_id
        if api_key and cse_id:
            self.service = build("customsearch", "v1", developerKey=api_key)
        else:
            self.service = None
            logger.warning("External Search API Key or CSE ID not configured.")

    def search_web(self, query: str) -> List[Dict[str, Any]]:
        if not self.service:
            return []
        
        try:
            res = self.service.cse().list(q=query, cx=self.cse_id).execute()
            items = res.get('items', [])
            return [
                {
                    "title": item.get("title"),
                    "link": item.get("link"),
                    "snippet": item.get("snippet")
                }
                for item in items
            ]
        except Exception as e:
            logger.error(f"External search failed: {e}")
            return []
