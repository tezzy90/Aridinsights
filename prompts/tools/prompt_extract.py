import os
import re
import hashlib
import json
import datetime

# Config
CTX_DIR = "prompts/discovery/discovered_context"
CURATED_DIR = "prompts/curated"
CATALOG_FILE = "prompts/catalog/prompts.json"
CATALOG_MD = "prompts/catalog/prompts.md"

# Categorization Rules
CATEGORY_MAP = {
    "cloudbuild": "cloud_build",
    "Dockerfile": "cloud_run",
    "deploy": "cloud_run",
    "service.yaml": "cloud_run",
    "functions/": "firebase_functions",
    "services/functions/": "firebase_functions",
    "agents/": "agents_python",
    "docs/architecture/": "architecture",
    "docs/governance/": "governance",
    "docs/content/": "marketing_content",
    "docs/hiring/": "recruiting_dei"
}

def sanitize_slug(text):
    return re.sub(r'[^a-z0-9_-]', '', text.lower().replace('/', '_').replace('.', '_'))

def get_category(filepath):
    for key, cat in CATEGORY_MAP.items():
        if key in filepath:
            return cat
    return "misc"

def parse_grep_output(content):
    # Simplistic parser for grep/rg context output
    # Returns list of {file, line, content_block}
    # This is a heuristic parser.
    blocks = []
    current_block = []
    current_file = None
    current_line = 0
    
    # Simple regex for rg/grep header matches (File: or File- or File)
    # But grep output varies. Let's assume standard grep -rnC output where file-line-content
    
    lines = content.split('\n')
    for line in lines:
        if not line.strip(): 
            continue
        # Heuristic: Detect filename at start of line
        # grep: file:line:content
        # rg --heading: filename \n line content
        
        # We will treat non-indented lines that look like paths as separators if using rg --heading
        # For now, let's just create a raw dump block per file if we can identify it.
        
        # ACTUALLY, to be safer and avoid complex parsing of grep output formats:
        # We will treat the entire file content as a source of text blocks and try to extract "Prompt-like" paragraphs.
        blocks.append(line)
        
    return blocks

def generate_curated_prompts():
    catalog_entries = []
    
    # Ensure directories exist
    os.makedirs(CURATED_DIR, exist_ok=True)
    
    files = sorted([f for f in os.listdir(CTX_DIR) if f.endswith(".txt")])
    global_counter = 0

    seen_hashes = set()

    for fname in files:
        fpath = os.path.join(CTX_DIR, fname)
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            raw_content = f.read()
            
        # Parse logic: Identify "File:" blocks (ripgrep/grep specific)
        # This is tricky without strict structure.
        # Strategy: processing the whole raw text as one "discovery source" and extracting anything that looks like a prompt.
        
        # Simplified: Split by "--" (common context separator)
        chunks = raw_content.split('--\n')
        
        for chunk in chunks:
            if len(chunk) < 50: continue # Skip tiny chunks
            
            # extract basic metadata (filename matches)
            # Find the first line that looks like a file path
            match = re.search(r'^([./a-zA-Z0-9_-]+)[:\-](\d+)', chunk, re.MULTILINE)
            if not match: continue
            
            source_path = match.group(1)
            source_line = match.group(2)
            
            # Skip noise
            if "node_modules" in source_path or ".git" in source_path: continue
            
            category = get_category(source_path)
            
            # Content cleanup
            clean_content = chunk.replace(f"{source_path}-", "").replace(f"{source_path}:", "")
            
            # Generate ID
            content_hash = hashlib.sha1(chunk.encode()).hexdigest()[:8]
            if content_hash in seen_hashes: continue
            seen_hashes.add(content_hash)
            
            global_counter += 1
            file_slug = sanitize_slug(os.path.basename(source_path))
            
            # Ensure category dir
            cat_dir = os.path.join(CURATED_DIR, category)
            os.makedirs(cat_dir, exist_ok=True)
            
            filename = f"{global_counter:03d}_{file_slug}_{content_hash}.md"
            full_path = os.path.join(cat_dir, filename)
            
            # Write Curated File
            with open(full_path, 'w') as out:
                out.write(f"# Auto-extracted Prompt {global_counter}\n\n")
                out.write(f"## Metadata\n")
                out.write(f"- **ID**: {filename}\n")
                out.write(f"- **Category**: {category}\n")
                out.write(f"- **Source**: {source_path}:{source_line}\n")
                out.write(f"- **Created**: {datetime.datetime.now().isoformat()}\n\n")
                out.write(f"## Prompt Snippet\n")
                out.write("```text\n")
                out.write(clean_content)
                out.write("\n```\n")
                
            catalog_entries.append({
                "id": filename,
                "category": category,
                "path": full_path,
                "source": source_path
            })

    # Write Catalog JSON
    with open(CATALOG_FILE, 'w') as f:
        json.dump(catalog_entries, f, indent=2)
        
    # Write Catalog MD wrapper
    with open(CATALOG_MD, 'w') as f:
        f.write("# Discovered Prompts Catalog\n\n")
        f.write("| ID | Category | Source | Link |\n")
        f.write("|---|---|---|---|\n")
        for entry in catalog_entries:
            link = os.path.relpath(entry['path'], os.path.dirname(CATALOG_MD))
            f.write(f"| {entry['id']} | {entry['category']} | {entry['source']} | [View]({link}) |\n")

    print(f"Generated {len(catalog_entries)} curated prompts.")

if __name__ == "__main__":
    generate_curated_prompts()
