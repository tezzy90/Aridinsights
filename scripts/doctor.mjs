import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT = process.cwd();
const DOCTORS = [];

function check(name, fn) {
    DOCTORS.push({ name, fn });
}

console.log("\n🏥 ARIDINSIGHTS REPO DOCTOR\n=============================");

// 1. Environment Checks
check("Environment", () => {
    let nodeVer = process.version;
    if (!nodeVer.startsWith('v20.')) {
        throw new Error(`Node version mismatch. Found ${nodeVer}, expected v20.x.\n   👉 Run: 'volta install node@20' or 'nvm use'`);
    } else {
        console.log(`   ✅ Node ${nodeVer}`);
    }

    try {
        execSync('npm -v', { stdio: 'ignore' });
        console.log("   ✅ npm detected");
    } catch {
        throw new Error("npm not found.");
    }
});

// 2. Repo Hygiene
check("Repo Structure", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
    if (!pkg.workspaces) throw new Error("Root package.json missing 'workspaces' config.");
    console.log("   ✅ Workspaces configured");

    const requiredDirs = ['apps/web-main', 'apps/docs-portal', 'services/functions'];
    const missing = requiredDirs.filter(d => !fs.existsSync(path.join(ROOT, d)));

    if (missing.length) throw new Error(`Missing required directories: ${missing.join(', ')}`);
    console.log("   ✅ Core applications present");
});

// 3. PromptOps
check("PromptOps", () => {
    const registryPath = path.join(ROOT, 'prompts/registry.json');
    if (!fs.existsSync(registryPath)) {
        console.warn("   ⚠️  Prompts Registry missing. (Safe if new repo)");
        console.warn("      👉 Run: 'npm run prompts:sync'");
    } else {
        // Check age
        const stats = fs.statSync(registryPath);
        const hours = (new Date() - stats.mtime) / 36e5;
        if (hours > 24) {
            console.warn(`   ⚠️  Prompts Registry is stale (${Math.round(hours)}h old). Run 'npm run prompts:sync'`);
        } else {
            console.log("   ✅ Prompts Registry active");
        }
    }
});

// 4. Docs Portal Index
check("Docs Portal", () => {
    const indexParams = path.join(ROOT, 'apps/docs-portal/public/search-index.json');
    if (!fs.existsSync(indexParams)) {
        throw new Error("Docs Portal search index missing.\n      👉 Run: 'npm run index:docs'");
    }
    console.log("   ✅ Search Index present");
});

// 5. Feature Registry
check("Feature Registry", () => {
    const featsDir = path.join(ROOT, 'features');
    if (!fs.existsSync(featsDir)) {
        console.warn("   ⚠️  features/ directory missing. Run feature init?");
    } else {
        const files = fs.readdirSync(featsDir).filter(f => f.endsWith('.md'));
        console.log(`   ✅ ${files.length} Feature Cards found`);
    }
});

// Run All
let fail = false;
for (const d of DOCTORS) {
    try {
        d.fn();
    } catch (e) {
        console.error(`❌ ${d.name} FAILED:`);
        console.error(`   ${e.message}`);
        fail = true;
    }
}

console.log("=============================");
if (fail) {
    console.log("❌ Doctor found issues to fix.");
    process.exit(1);
} else {
    console.log("✅ All Systems Operational.");
    process.exit(0);
}
