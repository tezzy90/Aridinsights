#!/bin/bash
set -e

# Configuration
RAW_DIR="prompts/discovery/discovered_raw"
CTX_DIR="prompts/discovery/discovered_context"
RUNLOG="prompts/discovery/runlog.md"

mkdir -p "$RAW_DIR" "$CTX_DIR"

echo "### Discovery Run: $(date)" >> "$RUNLOG"
echo "Starting Discovery..."

# Define search patterns
PATTERNS=(
  "ROLE"
  "OBJECTIVE"
  "CONSTRAINTS"
  "SYSTEM"
  "system prompt"
  "You are a"
  "You are an"
  "prompt:"
  "PROMPT"
  "instructions"
  "agent"
  "persona"
  "BEGIN PROMPT"
  "END PROMPT"
)

# Function to run search
run_search() {
  local PATTERN="$1"
  local SAFE_NAME=$(echo "$PATTERN" | tr ' ' '_')
  
  echo "Scanning for '$PATTERN'..."
  
  # Basic match list (filenames only)
  if command -v rg &> /dev/null; then
    rg -l "$PATTERN" . \
      -g '!node_modules/**' -g '!.next/**' -g '!.git/**' -g '!dist/**' -g '!build/**' -g '!coverage/**' -g '!.vercel/**' -g '!prompts/discovery/**' \
      > "$RAW_DIR/${SAFE_NAME}.txt" || true
  else
    grep -rl "$PATTERN" . \
      --exclude-dir={node_modules,.next,.git,dist,build,coverage,.vercel,prompts} \
      > "$RAW_DIR/${SAFE_NAME}.txt" || true
  fi

  # Context extraction (lines around match)
  # Using grep -C 12 and custom formatting
  if command -v rg &> /dev/null; then
     rg -C 12 --heading --line-number "$PATTERN" . \
      -g '!node_modules/**' -g '!.next/**' -g '!.git/**' -g '!dist/**' -g '!build/**' -g '!coverage/**' -g '!.vercel/**' -g '!prompts/discovery/**' \
      > "$CTX_DIR/${SAFE_NAME}.txt" || true
  else
     grep -rnC 12 "$PATTERN" . \
      --exclude-dir={node_modules,.next,.git,dist,build,coverage,.vercel,prompts} \
      > "$CTX_DIR/${SAFE_NAME}.txt" || true
  fi

  COUNT=$(wc -l < "$RAW_DIR/${SAFE_NAME}.txt")
  echo "- **$PATTERN**: $COUNT files matched" >> "$RUNLOG"
}

# Execute searches
for PATTERN in "${PATTERNS[@]}"; do
  run_search "$PATTERN"
done

echo "Discovery complete. Logs updated."
