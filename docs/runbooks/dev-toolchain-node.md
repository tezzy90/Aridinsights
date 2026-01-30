# Developer Toolchain: Node.js standard

## Overview
We enforce **Node.js v20** across all environments (Local, CI, Cloud Build) to prevent "works on my machine" issues.

**Standard:** [Volta](https://volta.sh/) (Primary)
**Compatibility:** `.nvmrc` (Legacy/Optional)

## 1. Quick Setup (Recommended)
Install Volta. It will automatically detect the pinned version in `package.json` (`20.20.0`).

```bash
# MacOS / Linux
curl https://get.volta.sh | bash

# Refresh shell
source ~/.bashrc # or ~/.zshrc

# Verify
node -v 
# Should match "volta" config in package.json
```

## 2. Validation
Run the repo health check:
```bash
npm run doctor
```

## 3. Troubleshooting
- **Command not found (volta)**: Restart your terminal or add `export VOLTA_HOME="$HOME/.volta"; export PATH="$VOLTA_HOME/bin:$PATH"` to your RC file.
- **Wrong Version**: Ensure you are in the repo root. Volta switches versions based on `package.json`.
