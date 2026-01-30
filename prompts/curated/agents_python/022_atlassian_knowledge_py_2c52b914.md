# Auto-extracted Prompt 22

## Metadata
- **ID**: 022_atlassian_knowledge_py_2c52b914.md
- **Category**: agents_python
- **Source**: ./agents/compliance-engine/atlassian_knowledge.py:1
- **Created**: 2026-01-29T19:19:47.951654

## Prompt Snippet
```text
1:from atlassian_agent import AtlassianAgent
2-import logging
3-from typing import List, Dict, Any
4-
5-logger = logging.getLogger('AtlassianKnowledge')
6-
7-class AtlassianKnowledge:
8-    def __init__(self, domain: str, email: str, token: str):
9:        self.agent = None
10-        if domain and email and token:
11:            self.agent = AtlassianAgent(domain, email, token)
12-        else:
13-            logger.warning("Atlassian credentials missing. Knowledge Module disabled.")
14-
15-    def search_confluence(self, query: str) -> List[Dict[str, Any]]:
16:        if not self.agent:
17-            return []
18-        
19-        try:
20-            # Simple CQL search for title or text
21-            cql = f'title ~ "{query}" OR text ~ "{query}"'
22:            results = self.agent.search_pages(cql)
23-            
24-            # Format results for consumption
25-            formatted = []
26-            for page in results:
27-                formatted.append({
28-                    "title": page.get("title"),
29:                    "link": f"https://{self.agent.domain}/wiki{page.get('_links', {}).get('webui')}",
30-                    "snippet": "..." # Snippet not easily available in basic search results without extra calls
31-                })
32-            return formatted
33-        except Exception as e:
34-            logger.error(f"Confluence search failed: {e}")
35-            return []
36-
37-    def get_jira_context(self, query: str) -> List[Dict[str, Any]]:
38-        """Finds relevant Jira tickets."""
39:        if not self.agent:
40-            return []
41-            
42-        try:
43-            # JQL search
44-            jql = f'text ~ "{query}" ORDER BY created DESC'
45:            results = self.agent.search_issues(jql)
46-            
47-            formatted = []
48-            for issue in results.get("issues", []):
49-                fields = issue.get("fields", {})
50-                formatted.append({
51-                    "key": issue.get("key"),
52-                    "summary": fields.get("summary"),
53-                    "status": fields.get("status", {}).get("name"),
54:                    "link": f"https://{self.agent.domain}/browse/{issue.get('key')}"
55-                })
56-            return formatted
57-        except Exception as e:
58-            logger.error(f"Jira search failed: {e}")
59-            return []
60-    def create_lead(self, summary: str, description: str, topic: str = None) -> str:
61-        """
62-        Creates a new lead in the REV (Revenue Engine) Jira project.
63-        """
64:        if not self.agent:
65-            return None
66-            
67-        try:
68-            # Construct description with topic context
69-            full_description = f"**Topic**: {topic}\n\n{description}" if topic else description
70-            
71:            # Use the agent to create the issue in project 'REV'
72-            # We assume 'REV' exists as we just scaffolded it.
73:            res = self.agent.create_issue(
74-                project_key="REV",
75-                summary=summary,
76-                description=full_description,
77-                issue_type="Task" # Default task is safe for Business project
78-            )
79-            
80-            if 'key' in res:
81:                return f"https://{self.agent.domain}/browse/{res.get('key')}"
82-            return None
83-        except Exception as e:
84-            logger.error(f"Failed to create lead in Jira: {e}")
85-            return None
86-
87-    def publish_daily_briefing(self, space_key: str, content: str) -> str:
88-        """
89-        Publishes a Daily Briefing as a new page or updates a master page.
90-        For now, creates a new page with a date stamp.
91-        """
92:        if not self.agent:
93-            return None
94-            
95-        from datetime import datetime
96-        date_str = datetime.now().strftime("%Y-%m-%d %H:%M")
97-        title = f"Sentinel Briefing - {date_str}"
98-        
99-        try:
100-            # We assume a parent page 'Sentinel Reports' exists, or we create root level.
101-            # Using V2 API in AtlassianAgent.
102:            # Note: We need space_id for V2. The agent handles it if we pass ID, but here we pass Key?
103:            # Let's simple use create_page from agent which implementation we need to verify.
104:            # Looking at atlassian_agent.py, create_page takes (space_key, title, body).
105-            # But the implementation inside AtlassianAgent uses space_id lookup.
106-            
107:            res = self.agent.create_page(space_key, title, content)
108-            
109-            if 'id' in res:
110:                link = f"https://{self.agent.domain}/wiki{res.get('_links', {}).get('webui')}"
111-                return link
112-            return None
113-        except Exception as e:
114-            logger.error(f"Failed to publish briefing: {e}")
115-            return None

```
