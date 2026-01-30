# Auto-extracted Prompt 4

## Metadata
- **ID**: 004_prompt_discovery_sh_3f7aeb7d.md
- **Category**: misc
- **Source**: ./scripts/prompt_discovery.sh:2
- **Created**: 2026-01-29T19:19:47.948143

## Prompt Snippet
```text
2-set -e
3-
4-# Output directories
5-RAW_DIR="prompts/discovery/discovered_prompts_raw"
6-INDEX_FILE="$RAW_DIR/index.txt"
7-
8-mkdir -p "$RAW_DIR"
9-
10-echo "Starting Prompt Discovery (using grep)..."
11-
12-# Define patterns to search
13-PATTERNS=(
14:  "ROLE"
15-  "OBJECTIVE"
16-  "CONSTRAINTS"
17-  "system prompt"
18-  "You are a"
19-  "You are an"
20-  "prompt:"
21-)
22-
23-# Clear previous index
24-echo "Discovery Run: $(date)" > "$INDEX_FILE"
25-
26-# Run grep for each pattern

```
