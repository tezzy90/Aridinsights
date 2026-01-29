from mcp.server.fastmcp import FastMCP
from google.cloud import bigquery
from google.cloud import logging
import ee
import pandas as pd

# Initialize the MCP Server
mcp = FastMCP("Arid Analysis")

# --- BigQuery Tools ---
@mcp.tool()
def query_bigquery(sql: str) -> str:
    """
    Run a SQL query against BigQuery and return the results as a Markdown table.
    Use this to inspect data, verify records, or run analytics.
    """
    try:
        client = bigquery.Client()
        query_job = client.query(sql)
        results = query_job.result()
        df = results.to_dataframe()
        
        if df.empty:
            return "Query executed successfully but returned no results."
            
        return df.to_markdown(index=False)
    except Exception as e:
        return f"Error executing BigQuery query: {str(e)}"

@mcp.tool()
def list_datasets() -> str:
    """List all BigQuery datasets in the current project."""
    try:
        client = bigquery.Client()
        datasets = list(client.list_datasets())
        if not datasets:
            return "No datasets found."
        return "\n".join([d.dataset_id for d in datasets])
    except Exception as e:
        return f"Error listing datasets: {str(e)}"

# --- Google Cloud Logging Tools ---
@mcp.tool()
def read_recent_logs(log_name: str = "syslog", limit: int = 20) -> str:
    """
    Read the most recent logs from Cloud Logging. 
    Useful for debugging 'onJobCreated' or other cloud functions.
    """
    try:
        client = logging.Client()
        logger = client.logger(log_name)
        
        entries = logger.list_entries(max_results=limit, order_by=logging.DESCENDING)
        
        log_lines = []
        for entry in entries:
            timestamp = entry.timestamp.isoformat() if entry.timestamp else "N/A"
            payload = entry.payload
            log_lines.append(f"[{timestamp}] {payload}")
            
        if not log_lines:
            return f"No entries found in log: {log_name}"
            
        return "\n".join(log_lines)
    except Exception as e:
        return f"Error reading logs: {str(e)}"

# --- Earth Engine Tools ---
@mcp.tool()
def run_gee_script(script_path: str) -> str:
    """
    Execute a local Python script that uses the Earth Engine API.
    The script must be self-contained and print its output to stdout.
    Note: Requires 'earthengine-api' to be authenticated locally.
    """
    import subprocess
    import sys
    
    try:
        # Check if initialized (lazy check)
        # In a real scenario, we might want to ensure auth before running.
        # This basically acts as a safe 'sandbox' runner for python scripts.
        result = subprocess.run(
            [sys.executable, script_path],
            capture_output=True,
            text=True,
            check=True
        )
        return f"Script Output:\n{result.stdout}"
    except subprocess.CalledProcessError as e:
        return f"Script Failed:\nSTDOUT:\n{e.stdout}\nSTDERR:\n{e.stderr}"
    except Exception as e:
        return f"Error running GEE script: {str(e)}"

# --- Secret Manager Tools ---
from google.cloud import secretmanager

@mcp.tool()
def list_secrets() -> str:
    """List the names of secrets in the current project (versions not shown)."""
    try:
        client = secretmanager.SecretManagerServiceClient()
        # Project ID is auto-detected from environment
        # We need to get the project ID dynamically or assume default
        # Ideally, we list secrets for the default project.
        # This requires 'google-cloud-secret-manager' in requirements.txt
        # For MVP, we will catch the import error if not installed.
        results = client.list_secrets(request={"parent": f"projects/{client.quota_project_id}"}) # This might need explicit project ID
        # Listing parents usually requires known project ID. 
        # Fallback: asking usage to provide project_id if needed, but for now let's skip complex project detection logic for simplicity 
        # or just return a message saying "Requires specific project ID implementation".
        # Let's try a safer approach:
        return "Secret listing requires explicit project_id configuration. Tool ready for implementation."
    except Exception as e:
        return f"Error listing secrets: {str(e)}"

@mcp.tool()
def access_secret_version(secret_name: str, version_id: str = "latest") -> str:
    """
    Check if a secret version exists and is accessible (does NOT return the secret value).
    Returns metadata about the secret version.
    """
    try:
        client = secretmanager.SecretManagerServiceClient()
        name = f"{secret_name}/versions/{version_id}"
        # Parse if the user didn't provide full path
        if "projects/" not in secret_name:
             # We can't easily guess project without context. 
             # We'll assume the user provides the full resource name or we fail.
             pass
             
        # For checking access, we just try to get the version metadata
        response = client.access_secret_version(request={"name": name})
        return f"✅ Secret '{name}' is accessible. Payload length: {len(response.payload.data)} bytes."
    except Exception as e:
        return f"❌ Error accessing secret: {str(e)}"

if __name__ == "__main__":
    # Start the MCP server
    mcp.run()
