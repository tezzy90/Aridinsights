import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT = process.cwd();
const OUTPUT_FILE = path.join(ROOT, 'prompts/discovery/discovered_prompts_raw.jsonl');
const EXCLUDE_DIRS = ['node_modules', '.next', '.git', 'dist', 'build', 'coverage', '.vercel', 'public', '.ds_store'];
const PATTERNS = [
    "ROLE", "OBJECTIVE", "CONSTRAINTS", "SYSTEM", "system prompt",
    "You are a", "You are an", "prompt:", "PROMPT", "instructions",
    "agent", "persona", "BEGIN PROMPT", "END PROMPT"
];

// Ensure output dir
if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
}
// Clear file
fs.writeFileSync(OUTPUT_FILE, '');

console.log("🔎 Scanning for prompts...");

function scanDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const relPath = path.relative(ROOT, fullPath);

        if (EXCLUDE_DIRS.some(ignored => relPath.split(path.sep).includes(ignored))) continue;

        try {
            const stat = fs.lstatSync(fullPath);
            if (stat.isDirectory()) {
                scanDir(fullPath);
            } else if (stat.isFile()) {
                // Read text files only (heuristic)
                const ext = path.extname(file).toLowerCase();
                if (!['.md', '.txt', '.py', '.js', '.ts', '.tsx', '.json'].includes(ext)) continue;
                if (file === 'discovered_prompts_raw.jsonl') continue;

                const content = fs.readFileSync(fullPath, 'utf8');
                const lines = content.split('\n');

                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    for (const pattern of PATTERNS) {
                        if (line.includes(pattern)) {
                            const entry = {
                                file: relPath,
                                line: i + 1,
                                category: pattern,
                                snippet: line.trim()
                            };
                            fs.appendFileSync(OUTPUT_FILE, JSON.stringify(entry) + '\n');
                            break; // Avoid double-counting same line
                        }
                    }
                }
            }
        } catch (e) {
            // Ignore perm errors
        }
    }
}

scanDir(ROOT);
console.log(`✅ Discovery complete. Written to ${OUTPUT_FILE}`);
