import logging
from typing import List, Dict, Any
from external_search import ExternalSearch

logger = logging.getLogger('Sentinel')

class Sentinel:
    def __init__(self, external_search: ExternalSearch):
        self.search_engine = external_search
        # Tri-Sector Radar Configuration
        self.watch_topics = {
            "REGULATORY_SHIELD": [
                "SFWMD Governing Board Agenda Water Shortage",
                "FDEP Rule Development Water Resource",
                "Florida Consumptive Use Permit Moratorium"
            ],
            "GROWTH_SWORD": [
                "Florida County Comprehensive Plan Amendment Water Supply",
                "Large Scale Residential Rezoning Florida 2025",
                "Central Florida Water Initiative Expansion"
            ],
            "MARKET_GAME": [
                "Florida Water Resource Engineering RFP",
                "Kimley-Horn Florida Water Contract Award",
                "Tetra Tech Florida Project News"
            ],
            "RESORT_RADAR (DARBONNE GATE)": [
                "Union Parish Police Jury Meeting Minutes 2024 2025",
                "Ouachita Parish Police Jury Meeting Minutes 2024 2025",
                "Lincoln Parish Police Jury Meeting Minutes 2024 2025",
                "Union Parish Waterworks District 1 Meeting Minutes",
                "SWFWMD Environmental Resource Permit applications",
                "Louisiana RV Resort Market Trends 2026",
                "Hwy 552 Downsville LA infrastructure projects"
            ],
            "GRANTS_ENGINE": [
                "USDA Rural Business Development Grant Louisiana 2025",
                "Louisiana LED FastSites program updates 2026",
                "NRCS Wetlands Reserve Easements Louisiana funding",
                "EPA Innovative Water Technology Grant 2025 2026",
                "Louisiana Community Development Block Grant LCDBG Public Facilities 2026",
                "Louisiana wetlands mitigation funding for private land",
                "Delta Regional Authority grants Louisiana infrastructure"
            ]
        }

    def check_for_updates(self) -> List[Dict[str, Any]]:
        """
        Scans for updates on watched topics.
        """
        alerts = []
        alerts = []
        
        for category, topics in self.watch_topics.items():
            for topic in topics:
                # Add "last week" to keep it fresh
                query = f"{topic} after:2025-01-01" 
                # Note: 'after:YYYY-MM-DD' is a Google Search Operator. 
                # Ideally we use dynamic date, but for now let's just use the query text "last week" 
                # or let the API return whatever is relevant.
                # Let's stick to simple "News" style query suffix.
                
                results = self.search_engine.search_web(f"{topic} last month")
                
                if results:
                    # Only take top 2 results per topic to avoid spam
                    for res in results[:2]:
                        alerts.append({
                            "category": category,
                            "topic": topic,
                            "top_result": res
                        })
        
        return alerts
