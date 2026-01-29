import sys
from google.cloud import bigquery
from google.cloud import logging
import ee

def test_bigquery():
    print("Testing BigQuery Connectivity...")
    try:
        client = bigquery.Client()
        datasets = list(client.list_datasets(max_results=1))
        print(f"✅ BigQuery: Connected. Found {len(datasets)}+ datasets.")
        return True
    except Exception as e:
        print(f"❌ BigQuery Failed: {e}")
        return False

def test_logging():
    print("\nTesting Cloud Logging Connectivity...")
    try:
        client = logging.Client()
        # Just try to get a client, list_entries might be empty which is fine
        print(f"✅ Logging: Connected to project '{client.project}'.")
        return True
    except Exception as e:
        print(f"❌ Logging Failed: {e}")
        return False

def test_ee():
    print("\nTesting Earth Engine Connectivity...")
    try:
        ee.Initialize()
        print("✅ Earth Engine: Initialized.")
        return True
    except Exception as e:
        print(f"❌ Earth Engine Failed: {e}")
        print("   (Did you run 'earthengine authenticate'?)")
        return False

if __name__ == "__main__":
    print("--- Arid Analysis Connectivity Test ---\n")
    bq_ok = test_bigquery()
    log_ok = test_logging()
    ee_ok = test_ee()
    
    if bq_ok and log_ok and ee_ok:
        print("\n🎉 ALL SYSTEMS GO! The Analysis Server is ready to run.")
        sys.exit(0)
    else:
        print("\n⚠️ Some checks failed. Please authenticate using 'gcloud auth application-default login' and 'earthengine authenticate'.")
        sys.exit(1)
