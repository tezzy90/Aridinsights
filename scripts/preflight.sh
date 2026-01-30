#!/bin/bash
# scripts/preflight.sh
# Enforces Node.js v20.x environment.

REQUIRED_MAJOR="20"

# Get current node version (e.g., v20.11.0 -> 20)
CURRENT_NODE_VERSION=$(node -v 2>&1)
CURRENT_MAJOR=$(echo "$CURRENT_NODE_VERSION" | cut -d. -f1 | tr -d 'v')

if [[ "$CURRENT_MAJOR" != "$REQUIRED_MAJOR" ]]; then
  echo "❌ Error: Node.js version mismatch."
  echo "   Required: v$REQUIRED_MAJOR.x"
  echo "   Current:  $CURRENT_NODE_VERSION"
  echo ""
  echo "👉 Fix: Install/Use Volta (Recommended)"
  echo "   curl https://get.volta.sh | bash"
  echo "   volta install node@20"
  echo ""
  echo "   (Or use nvm: nvm use)"
  exit 1
fi

# Detect system node usage (warning only)
NODE_PATH=$(command -v node)
if [[ "$NODE_PATH" == "/usr/bin/node" || "$NODE_PATH" == "/bin/node" ]]; then
    echo "⚠️  Warning: You are using System Node ($NODE_PATH)."
    echo "   This is fragile. Please switch to Volta or NVM."
fi

echo "✅ Preflight Passed: Node $CURRENT_NODE_VERSION"
exit 0
