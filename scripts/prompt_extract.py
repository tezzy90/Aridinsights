import json
import os
import re

# Config
ROOT_DIR = os.getcwd()
DISCOVERY_FILE = os.path.join(ROOT_DIR, 'prompts/discovery/discovered_prompts_raw.jsonl')
LIBRARY_DIR = os.path.join(ROOT_DIR, 'prompts/library')
REGISTRY_FILE = os.path.join(ROOT_DIR, 'prompts/registry.json')

print("extracting prompts...")

if not os.path.exists(LIBRARY_DIR):
    os.makedirs(LIBRARY_DIR)

registry = []
processed_signatures = set()

if not os.path.exists(DISCOVERY_FILE):
    print("No discovery file found. Run 'npm run prompts:discover' first.")
    exit(0)

with open(DISCOVERY_FILE, 'r') as f:
    for line_num, line in enumerate(f):
        try:
            entry = json.loads(line)
            file_path = entry['file']
            snippet = entry['snippet']
            category = entry['category'] # e.g. "YOU ARE|SYSTEM PROMPT"
            
            # Simple Heuristic: Dedupe by file path
            if file_path in processed_signatures:
                continue
            processed_signatures.add(file_path)

            # Determine a slug
            filename = os.path.basename(file_path).replace('.', '_')
            slug = f"{filename}"
            
            # Classification mapping
            reg_category = "uncategorized"
            if "marketing" in file_path.lower(): reg_category = "marketing"
            elif "product" in file_path.lower(): reg_category = "product"
            elif "agent" in file_path.lower(): reg_category = "agents"
            
            # Ensure category dir exists
            cat_dir = os.path.join(LIBRARY_DIR, reg_category)
            if not os.path.exists(cat_dir):
                os.makedirs(cat_dir)
            
            # Create Markdown Spec
            md_path = os.path.join(cat_dir, f"{slug}.md")
            md_content = f"""---
title: Extracted Prompt from {filename}
category: {reg_category}
source: {file_path}
---

# Context
Extracted from `{file_path}` at line {entry['line']}.

# Snippet
```text
{snippet}
```
"""
            with open(md_path, 'w') as out:
                out.write(md_content)

            # Add to Registry
            registry.append({
                "id": slug,
                "title": f"Prompt from {filename}",
                "category": reg_category,
                "path": os.path.relpath(md_path, ROOT_DIR),
                "source": file_path
            })

        except Exception as e:
            print(f"Skipping line {line_num}: {e}")

# Write Registry
with open(REGISTRY_FILE, 'w') as reg:
    json.dump(registry, reg, indent=2)

print(f"✅ Generated Registry with {len(registry)} items.")
