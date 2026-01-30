import os
import re

RAW_DIR = "prompts/discovery/discovered_prompts_raw"
CURATED_DIR = "prompts/discovery/discovered_prompts_curated"

os.makedirs(CURATED_DIR, exist_ok=True)

def parse_line(line):
    # Ripgrep parsing: file:line:col:content
    parts = line.split(':', 3)
    if len(parts) < 4:
        return None
    return {
        'file': parts[0],
        'line': parts[1],
        'content': parts[3].strip()
    }

def main():
    print(f"Reading from {RAW_DIR}...")
    
    unique_files = set()
    
    for filename in os.listdir(RAW_DIR):
        if not filename.endswith(".txt") or filename == "index.txt":
            continue
            
        category = filename.replace(".txt", "")
        filepath = os.path.join(RAW_DIR, filename)
        
        with open(filepath, 'r') as f:
            for line in f:
                match = parse_line(line)
                if match:
                    unique_files.add(match['file'])
                    
                    # Create a basic curated entry
                    safe_filename = match['file'].replace('/', '_')
                    out_path = os.path.join(CURATED_DIR, f"{safe_filename}.md")
                    
                    with open(out_path, 'a') as out:
                        out.write(f"## Candidate: {match['file']}:{match['line']} ({category})\n")
                        out.write(f"```text\n{match['content']}\n```\n\n")

    print(f"Curated candidates from {len(unique_files)} files written to {CURATED_DIR}")

if __name__ == "__main__":
    main()
