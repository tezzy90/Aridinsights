import os
import sys

CURATED_DIR = "prompts/curated"
VALID_CATEGORIES = [
    "build_and_ci", "cloud_run", "cloud_build", 
    "firebase_functions", "agents_python", "architecture", 
    "governance", "marketing_content", "recruiting_dei", "misc"
]

def validate_prompts():
    print("Validating Prompts...")
    errors = []
    
    for root, dirs, files in os.walk(CURATED_DIR):
        for file in files:
            if not file.endswith(".md"): continue
            if file.startswith("."): 
                errors.append(f"Hidden file found: {file}")
                continue
                
            filepath = os.path.join(root, file)
            category = os.path.basename(root)
            
            if category not in VALID_CATEGORIES:
                errors.append(f"Invalid category folder: {category} for file {file}")
                
            with open(filepath, 'r') as f:
                content = f.read()
                
            if "- **ID**:" not in content:
                errors.append(f"Missing Metadata ID in {file}")
            if "- **Category**:" not in content:
                errors.append(f"Missing Metadata Category in {file}")
                
    if errors:
        print("Validation FAILED:")
        for e in errors:
            print(f"- {e}")
        sys.exit(1)
    else:
        print("Validation PASSED.")

if __name__ == "__main__":
    validate_prompts()
