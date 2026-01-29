from atlassian_agent import AtlassianAgent
import logging
from typing import List, Dict, Any

logger = logging.getLogger('AtlassianKnowledge')

class AtlassianKnowledge:
    def __init__(self, domain: str, email: str, token: str):
        self.agent = None
        if domain and email and token:
            self.agent = AtlassianAgent(domain, email, token)
        else:
            logger.warning("Atlassian credentials missing. Knowledge Module disabled.")

    def search_confluence(self, query: str) -> List[Dict[str, Any]]:
        if not self.agent:
            return []
        
        try:
            # Simple CQL search for title or text
            cql = f'title ~ "{query}" OR text ~ "{query}"'
            results = self.agent.search_pages(cql)
            
            # Format results for consumption
            formatted = []
            for page in results:
                formatted.append({
                    "title": page.get("title"),
                    "link": f"https://{self.agent.domain}/wiki{page.get('_links', {}).get('webui')}",
                    "snippet": "..." # Snippet not easily available in basic search results without extra calls
                })
            return formatted
        except Exception as e:
            logger.error(f"Confluence search failed: {e}")
            return []

    def get_jira_context(self, query: str) -> List[Dict[str, Any]]:
        """Finds relevant Jira tickets."""
        if not self.agent:
            return []
            
        try:
            # JQL search
            jql = f'text ~ "{query}" ORDER BY created DESC'
            results = self.agent.search_issues(jql)
            
            formatted = []
            for issue in results.get("issues", []):
                fields = issue.get("fields", {})
                formatted.append({
                    "key": issue.get("key"),
                    "summary": fields.get("summary"),
                    "status": fields.get("status", {}).get("name"),
                    "link": f"https://{self.agent.domain}/browse/{issue.get('key')}"
                })
            return formatted
        except Exception as e:
            logger.error(f"Jira search failed: {e}")
            return []
    def create_lead(self, summary: str, description: str, topic: str = None) -> str:
        """
        Creates a new lead in the REV (Revenue Engine) Jira project.
        """
        if not self.agent:
            return None
            
        try:
            # Construct description with topic context
            full_description = f"**Topic**: {topic}\n\n{description}" if topic else description
            
            # Use the agent to create the issue in project 'REV'
            # We assume 'REV' exists as we just scaffolded it.
            res = self.agent.create_issue(
                project_key="REV",
                summary=summary,
                description=full_description,
                issue_type="Task" # Default task is safe for Business project
            )
            
            if 'key' in res:
                return f"https://{self.agent.domain}/browse/{res.get('key')}"
            return None
        except Exception as e:
            logger.error(f"Failed to create lead in Jira: {e}")
            return None

    def publish_daily_briefing(self, space_key: str, content: str) -> str:
        """
        Publishes a Daily Briefing as a new page or updates a master page.
        For now, creates a new page with a date stamp.
        """
        if not self.agent:
            return None
            
        from datetime import datetime
        date_str = datetime.now().strftime("%Y-%m-%d %H:%M")
        title = f"Sentinel Briefing - {date_str}"
        
        try:
            # We assume a parent page 'Sentinel Reports' exists, or we create root level.
            # Using V2 API in AtlassianAgent.
            # Note: We need space_id for V2. The agent handles it if we pass ID, but here we pass Key?
            # Let's simple use create_page from agent which implementation we need to verify.
            # Looking at atlassian_agent.py, create_page takes (space_key, title, body).
            # But the implementation inside AtlassianAgent uses space_id lookup.
            
            res = self.agent.create_page(space_key, title, content)
            
            if 'id' in res:
                link = f"https://{self.agent.domain}/wiki{res.get('_links', {}).get('webui')}"
                return link
            return None
        except Exception as e:
            logger.error(f"Failed to publish briefing: {e}")
            return None
