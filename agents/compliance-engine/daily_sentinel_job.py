"""
Daily Sentinel Job - Orchestrates regulatory monitoring and lead generation.

Refactored for Single Responsibility Principle compliance.
Each class has one well-defined responsibility.
"""

import os
import logging
import sys
from pathlib import Path
from datetime import datetime
from dataclasses import dataclass
from typing import List, Dict, Any, Optional

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from secret_manager import get_secret
from exceptions import SecretFetchError, APIRateLimitError
from rate_limiter import RateLimiter, vertex_limiter

from sentinel import Sentinel
from external_search import ExternalSearch
from atlassian_knowledge import AtlassianKnowledge
from intel_analyst import IntelAnalyst

# Setup Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('DailySentinel')


@dataclass
class SentinelConfig:
    """Configuration for Sentinel components."""
    google_api_key: str
    google_cse_id: str
    atlassian_domain: str
    atlassian_email: str
    atlassian_token: str
    project_id: str = "work-corporate"
    
    @classmethod
    def from_secrets(cls) -> 'SentinelConfig':
        """Factory method to load config from Secret Manager."""
        return cls(
            google_api_key=get_secret("google-search-api-key"),
            google_cse_id=get_secret("google-search-cse-id"),
            atlassian_domain=get_secret("atlassian-domain"),
            atlassian_email=get_secret("atlassian-user-email"),
            atlassian_token=get_secret("atlassian-api-token")
        )


class AlertScanner:
    """Responsible for scanning and fetching alerts."""
    
    def __init__(self, sentinel: Sentinel):
        self.sentinel = sentinel
    
    def scan(self) -> List[Dict[str, Any]]:
        """Scans for new alerts."""
        logger.info("🔍 Scanning for regulatory updates...")
        alerts = self.sentinel.check_for_updates()
        
        if not alerts:
            logger.info("✅ No new alerts found.")
            return []
        
        logger.info(f"⚠️ Found {len(alerts)} alerts.")
        return alerts


class AlertAnalyzer:
    """Responsible for AI analysis of alerts."""
    
    def __init__(self, analyst: IntelAnalyst, rate_limiter: Optional[RateLimiter] = None, max_workers: int = 5):
        self.analyst = analyst
        self.rate_limiter = rate_limiter
        self.max_workers = max_workers
    
    def analyze_single_alert(self, alert: Dict) -> Dict:
        """Helper for single alert analysis to be called by worker."""
        try:
            # Apply rate limiting if configured
            if self.rate_limiter:
                with self.rate_limiter:
                    analysis = self.analyst.analyze_alert(alert)
            else:
                analysis = self.analyst.analyze_alert(alert)
                
            return {
                **alert,
                'analysis': analysis
            }
        except APIRateLimitError as e:
            logger.error(f"Rate limit exceeded for {alert['topic']}: {e}")
            return {
                **alert,
                'analysis': {"is_lead": False, "analysis": "Skipped due to rate limit", "confidence": "LOW"}
            }
        except Exception as e:
            logger.error(f"Error analyzing {alert['topic']}: {e}")
            return {
                **alert,
                'analysis': {"is_lead": False, "analysis": f"Error: {e}", "confidence": "LOW"}
            }

    def analyze_batch(self, alerts: List[Dict]) -> List[Dict]:
        """Analyzes a batch of alerts with AI concurrently."""
        from concurrent.futures import ThreadPoolExecutor, as_completed
        
        analyzed_alerts = []
        logger.info(f"Starting concurrent analysis for {len(alerts)} alerts with {self.max_workers} workers...")
        
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            future_to_alert = {executor.submit(self.analyze_single_alert, alert): alert for alert in alerts}
            
            for i, future in enumerate(as_completed(future_to_alert)):
                alert = future_to_alert[future]
                try:
                    result = future.result()
                    analyzed_alerts.append(result)
                    logger.info(f"[{i+1}/{len(alerts)}] Completed: {alert['topic']}")
                except Exception as e:
                    logger.error(f"Worker failure for {alert['topic']}: {e}")
                    analyzed_alerts.append(alert) # Return original on crash
        
        return analyzed_alerts


class BriefingReportGenerator:
    """Responsible for generating HTML briefing reports."""
    
    @staticmethod
    def generate(analyzed_alerts: List[Dict]) -> str:
        """Generates HTML report from analyzed alerts."""
        html = "<h1>🛡️ Daily Sentinel Briefing</h1>"
        html += f"<p><strong>Date:</strong> {datetime.now().strftime('%Y-%m-%d')}</p>"
        html += "<p>The following regulatory changes or news items were detected and analyzed:</p>"
        
        for alert in analyzed_alerts:
            html += BriefingReportGenerator._render_alert(alert)
        
        html += "<p><em>Generated by AridInsights Research Agent</em></p>"
        return html
    
    @staticmethod
    def _render_alert(alert: Dict) -> str:
        """Renders a single alert to HTML."""
        analysis = alert.get('analysis', {})
        is_opportunity = analysis.get('is_opportunity', False)
        action = analysis.get('recommended_action', 'IGNORE')
        reason = analysis.get('reasoning', 'No analysis')
        
        category = alert.get('category', 'GENERAL')
        topic = alert['topic']
        result = alert['top_result']
        
        # Icon mapping
        icon_map = {
            "REGULATORY_SHIELD": "🛡️",
            "GROWTH_SWORD": "⚔️",
            "MARKET_GAME": "🎲"
        }
        icon = icon_map.get(category, "📋")
        
        highlight = "background-color: #e6fffa; border-left: 5px solid #00bfa5; padding: 10px;" if is_opportunity else ""
        
        html = f"<div style='{highlight}'>"
        html += f"<h3>{icon} [{category}] {topic}</h3>"
        html += f"<blockquote><a href='{result['link']}'>{result['title']}</a></blockquote>"
        html += f"<p>{result['snippet']}</p>"
        html += f"<p><strong>🧠 Gemini Insight:</strong> {reason} <br/>"
        html += f"<strong>🎯 Recommendation:</strong> {action}</p>"
        html += "</div><hr/>"
        
        return html


class LeadGenerator:
    """Responsible for creating Jira leads from high-value alerts."""
    
    def __init__(self, knowledge_base: AtlassianKnowledge):
        self.knowledge_base = knowledge_base
    
    def process_opportunities(self, analyzed_alerts: List[Dict]) -> Dict[str, str]:
        """Creates Jira leads for qualifying alerts."""
        jira_links = {}
        
        for alert in analyzed_alerts:
            analysis = alert.get('analysis', {})
            action = analysis.get('recommended_action')
            
            if action == 'CREATE_JIRA_LEAD':
                topic = alert['topic']
                logger.info(f"🎯 High Value Lead Detected: {topic}. Creating Jira Card...")
                
                summary = f"Lead: {topic}"
                description = (
                    f"AI Reason: {analysis.get('reasoning')}\n\n"
                    f"Original Source: {alert['top_result']['link']}\n\n"
                    f"Category: {alert.get('category')}"
                )
                
                jira_link = self.knowledge_base.create_lead(summary, description, topic)
                if jira_link:
                    logger.info(f"✅ Jira Lead Created: {jira_link}")
                    jira_links[topic] = jira_link
        
        return jira_links


class BriefingPublisher:
    """Responsible for publishing briefings to Confluence."""
    
    def __init__(self, knowledge_base: AtlassianKnowledge):
        self.knowledge_base = knowledge_base
    
    def publish(self, html_content: str, space_key: str = "COMP") -> Optional[str]:
        """Publishes briefing to Confluence."""
        logger.info(f"Publishing briefing to {space_key}...")
        link = self.knowledge_base.publish_daily_briefing(space_key, html_content)
        
        if link:
            logger.info(f"✅ Briefing published: {link}")
        else:
            logger.error("❌ Failed to publish briefing.")
        
        return link


class SentinelOrchestrator:
    """Orchestrates the daily sentinel workflow."""
    
    def __init__(self, config: SentinelConfig):
        # Initialize components
        search_engine = ExternalSearch(config.google_api_key, config.google_cse_id)
        knowledge_base = AtlassianKnowledge(
            config.atlassian_domain,
            config.atlassian_email,
            config.atlassian_token
        )
        sentinel = Sentinel(search_engine)
        analyst = IntelAnalyst(project_id=config.project_id, location="global")
        
        # Initialize services
        self.scanner = AlertScanner(sentinel)
        self.analyzer = AlertAnalyzer(analyst, rate_limiter=vertex_limiter)
        self.report_gen = BriefingReportGenerator()
        self.lead_gen = LeadGenerator(knowledge_base)
        self.publisher = BriefingPublisher(knowledge_base)
    
    def run(self) -> bool:
        """Executes the full sentinel pipeline."""
        try:
            # 1. Scan
            alerts = self.scanner.scan()
            if not alerts:
                return True
            
            # 2. Analyze
            analyzed_alerts = self.analyzer.analyze_batch(alerts)
            
            # 3. Generate Lead Opportunities
            jira_links = self.lead_gen.process_opportunities(analyzed_alerts)
            
            # 4. Generate Report
            html_report = self.report_gen.generate(analyzed_alerts)
            
            # 5. Publish
            link = self.publisher.publish(html_report)
            
            return link is not None
        
        except Exception as e:
            logger.error(f"Sentinel pipeline failed: {e}", exc_info=True)
            return False


def main():
    logger.info("🛡️ Starting Daily Sentinel Job...")
    
    try:
        config = SentinelConfig.from_secrets()
    except SecretFetchError as e:
        logger.error(f"❌ Failed to load required secrets: {e}")
        return
    
    orchestrator = SentinelOrchestrator(config)
    success = orchestrator.run()
    
    if success:
        logger.info("✅ Sentinel job completed successfully.")
    else:
        logger.error("❌ Sentinel job failed.")


if __name__ == "__main__":
    main()
