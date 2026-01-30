#!/bin/bash
set -e

# Output directories
RAW_DIR="prompts/discovery/discovered_prompts_raw"
INDEX_FILE="$RAW_DIR/index.txt"

mkdir -p "$RAW_DIR"

echo "Starting Prompt Discovery (using grep)..."

# Define patterns to search
PATTERNS=(
  "ROLE"
  "OBJECTIVE"
  "CONSTRAINTS"
  "system prompt"
  "You are a"
  "You are an"
  "prompt:"
)

# Clear previous index
echo "Discovery Run: $(date)" > "$INDEX_FILE"

# Run grep for each pattern
for PATTERN in "${PATTERNS[@]}"; do
  SAFE_NAME=$(echo "$PATTERN" | tr ' ' '_')
  OUT_FILE="$RAW_DIR/${SAFE_NAME}.txt"
  
  echo "Searching for '$PATTERN'..."
  # Use grep -rn with exclude-dir
  grep -rn "$PATTERN" . \
    --exclude-dir=node_modules \
    --exclude-dir=.git \
    --exclude-dir=prompts/discovery \
    --exclude-dir=.next \
    > "$OUT_FILE" || true # grep returns 1 if no match, don't fail script
    
  COUNT=$(wc -l < "$OUT_FILE")
  echo "$PATTERN: $COUNT matches" >> "$INDEX_FILE"
done

echo "Discovery complete. Results in $RAW_DIR"
cat "$INDEX_FILE"
