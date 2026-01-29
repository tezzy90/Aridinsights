from google.cloud import secretmanager
import google.auth
import sys

def list_secrets():
    print("--- Checking Secret Manager ---")
    try:
        # 1. Get Project ID
        _, project_id = google.auth.default()
        if not project_id:
            print("❌ Could not determine Project ID from default credentials.")
            print("   (Run 'gcloud auth application-default login')")
            return

        print(f"Target Project: {project_id}")
        
        # 2. List Secrets
        client = secretmanager.SecretManagerServiceClient()
        parent = f"projects/{project_id}"
        
        results = client.list_secrets(request={"parent": parent})
        
        secrets_found = []
        for secret in results:
            secrets_found.append(secret.name)

        if not secrets_found:
            print(f"✅ Connected to {project_id}, but NO secrets found (List is empty).")
        else:
            print(f"✅ Connected to {project_id}. Found {len(secrets_found)} secrets:")
            for s in secrets_found:
                print(f"   - {s.split('/')[-1]}") # Print just the secret name

    except Exception as e:
        print(f"❌ Error listing secrets: {e}")

if __name__ == "__main__":
    list_secrets()
