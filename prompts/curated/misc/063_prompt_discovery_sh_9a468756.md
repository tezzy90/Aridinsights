# Auto-extracted Prompt 63

## Metadata
- **ID**: 063_prompt_discovery_sh_9a468756.md
- **Category**: misc
- **Source**: ./scripts/prompt_discovery.sh:8
- **Created**: 2026-01-29T19:19:47.958635

## Prompt Snippet
```text
8-mkdir -p "$RAW_DIR"
9-
10-echo "Starting Prompt Discovery (using grep)..."
11-
12-# Define patterns to search
13-PATTERNS=(
14-  "ROLE"
15-  "OBJECTIVE"
16-  "CONSTRAINTS"
17-  "system prompt"
18-  "You are a"
19-  "You are an"
20:  "prompt:"
21-)
22-
23-# Clear previous index
24-echo "Discovery Run: $(date)" > "$INDEX_FILE"
25-
26-# Run grep for each pattern
27-for PATTERN in "${PATTERNS[@]}"; do
28-  SAFE_NAME=$(echo "$PATTERN" | tr ' ' '_')
29-  OUT_FILE="$RAW_DIR/${SAFE_NAME}.txt"
30-  
31-  echo "Searching for '$PATTERN'..."
32-  # Use grep -rn with exclude-dir

```
