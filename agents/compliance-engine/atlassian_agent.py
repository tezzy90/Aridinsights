import os
import requests
import json
import base64
import logging
from typing import List, Dict, Any, Optional

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class AtlassianAgent:
    def __init__(self, domain: str, email: str, token: str):
        self.domain = domain
        self.email = email
        self.auth_str = f"{email}:{token}"
        self.headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": f"Basic {base64.b64encode(self.auth_str.encode()).decode()}"
        }
    
    def _request(self, method: str, endpoint: str, **kwargs) -> Dict[str, Any]:
        """Internal helper for handling requests and basic error checking."""
        url = f"https://{self.domain}/{endpoint}"
        try:
            response = requests.request(method, url, headers=self.headers, **kwargs)
            response.raise_for_status()
            
            # Handle 204 No Content
            if response.status_code == 204:
                return {}
            
            return response.json()
        except requests.exceptions.HTTPError as e:
            logger.error(f"HTTP Error {e.response.status_code} for {method} {url}: {e.response.text}")
            raise
        except Exception as e:
            logger.error(f"Request failed: {e}")
            raise

    # -------------------------------------------------------------------------
    # JIRA CORE
    # -------------------------------------------------------------------------

    def get_projects(self) -> List[Dict[str, Any]]:
        return self._request("GET", "rest/api/3/project")

    def search_issues(self, jql: str, fields: List[str] = ["summary", "status", "assignee", "description"]) -> Dict[str, Any]:
        """Searches Jira issues using JQL."""
        payload = {
            "jql": jql,
            "fields": fields,
            "maxResults": 10
        }
        return self._request("POST", "rest/api/3/search/jql", json=payload)

    def get_issue(self, issue_key: str) -> Dict[str, Any]:
        return self._request("GET", f"rest/api/3/issue/{issue_key}")

    def create_issue(self, project_key: str, summary: str, description: str = "", issue_type: str = "Task", parent_key: str = None) -> Dict[str, Any]:
        """Creates a Jira issue or sub-task."""
        payload = {
            "fields": {
                "project": {"key": project_key},
                "summary": summary,
                "description": self._adf_paragraph(description),
                "issuetype": {"name": issue_type}
            }
        }
        if parent_key:
            payload["fields"]["parent"] = {"key": parent_key}
            
        return self._request("POST", "rest/api/3/issue", json=payload)

    def add_comment(self, issue_key: str, body: str) -> Dict[str, Any]:
        """Adds a comment to an issue."""
        payload = {
            "body": self._adf_paragraph(body)
        }
        return self._request("POST", f"rest/api/3/issue/{issue_key}/comment", json=payload)

    # -------------------------------------------------------------------------
    # JIRA PRODUCT DISCOVERY (JPD)
    # -------------------------------------------------------------------------

    def create_idea(self, project_key: str, summary: str, description: str = "") -> Dict[str, Any]:
        """
        Creates an Idea in a Product Discovery project.
        Note: The default issue type for JPD is usually "Idea".
        """
        return self.create_issue(project_key, summary, description, issue_type="Idea")

    def add_insight(self, issue_key: str, insight_text: str, url: str = None) -> Dict[str, Any]:
        """
        Simulates adding an Insight by adding a rich comment or remote link.
        Real JPD Insights API is complex/internal; comments are the safest proxy.
        """
        if url:
            self.add_remote_link(issue_key, "Supporting Insight", url)
            insight_text += f"\n\nSource: {url}"
            
        return self.add_comment(issue_key, f"💡 **Insight**: {insight_text}")

    # -------------------------------------------------------------------------
    # CONFLUENCE (KNOWLEDGE)
    # -------------------------------------------------------------------------

    def search_pages(self, cql: str) -> List[Dict[str, Any]]:
        """Searches Confluence pages using CQL."""
        # Using V2 API? V2 search is limited. V1 cql search is still robust.
        # Fallback to V1 for CQL support.
        params = {"cql": cql, "limit": 5}
        res = self._request("GET", "wiki/rest/api/content/search", params=params)
        return res.get("results", [])

    def get_page_content(self, page_id: str) -> str:
        """Retrieves storage format (HTML-like) content of a page."""
        params = {"expand": "body.storage"}
        res = self._request("GET", f"wiki/rest/api/content/{page_id}", params=params)
        try:
            return res["body"]["storage"]["value"]
        except KeyError:
            return ""
            
    def create_page(self, space_key: str, title: str, body: str, parent_id: str = None) -> Dict[str, Any]:
        """Creates a page in Confluence (V2 API)."""
        space_id = self._get_space_id(space_key)
        if not space_id:
            raise ValueError(f"Space {space_key} not found")

        payload = {
            "spaceId": space_id,
            "status": "current",
            "title": title,
            "body": {
                "representation": "storage",
                "value": body
            }
        }
        if parent_id:
            payload["parentId"] = str(parent_id)
            
        return self._request("POST", "wiki/api/v2/pages", json=payload)

    def add_remote_link(self, issue_key, title, url):
        """Links a Confluence page (or any URL) to a Jira issue."""
        payload = {
            "object": {
                "url": url,
                "title": title
            }
        }
        return self._request("POST", f"rest/api/3/issue/{issue_key}/remotelink", json=payload)

    # -------------------------------------------------------------------------
    # HELPERS
    # -------------------------------------------------------------------------

    def _adf_paragraph(self, text: str) -> Dict[str, Any]:
        """Wraps text in Atlassian Document Format (ADF) paragraph node."""
        return {
            "type": "doc",
            "version": 1,
            "content": [
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "text",
                            "text": text
                        }
                    ]
                }
            ]
        }

    def _get_space_id(self, space_key: str) -> Optional[str]:
        """Resolved Space Key to Space ID (needed for V2 API)."""
        try:
            res = self._request("GET", "wiki/api/v2/spaces", params={"keys": space_key})
            if res.get("results"):
                return res["results"][0]["id"]
            
            # Fallback to V1
            res = self._request("GET", f"wiki/rest/api/space/{space_key}")
            return res.get("id")
        except:
            return None

if __name__ == "__main__":
    # Test execution
    pass
