import fs from 'fs';
import path from 'path';

const featuresDir = path.join(process.cwd(), 'features');

if (!fs.existsSync(featuresDir)) {
    console.log("No features/ directory found.");
    process.exit(0);
}

console.log("\n🃏 Feature Registry");
console.log("===================");

const files = fs.readdirSync(featuresDir).filter(f => f.endsWith('.md'));

if (files.length === 0) {
    console.log("No feature cards found.");
} else {
    files.forEach(file => {
        const content = fs.readFileSync(path.join(featuresDir, file), 'utf8');
        const match = content.match(/status:\s*(\w+)/);
        const status = match ? match[1] : 'unknown';

        // Colorize status
        let icon = '⚪';
        if (status === 'shipped') icon = '🟢';
        if (status === 'building') icon = '🔵';
        if (status === 'planned') icon = '🟡';
        if (status === 'deprecated') icon = 'aaa';

        console.log(`${icon} ${file.replace('.md', '')} [${status}]`);
    });
}
console.log("");
