import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { glob } from 'glob';

const REPO_ROOT = path.resolve('../..'); // Assuming running from apps/docs-portal
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'search-index.json');
const MANIFEST_FILE = path.join(process.cwd(), 'public', 'search-manifest.json');

// Folders to scan relative to repo root
const SCAN_FOLDERS = [
    'docs',
    'prompts',
    'feature-cards',
    'features',
    'cards',
    'jira-export',
    'products'
];

// Extensions to include
const EXTENSIONS = ['.md', '.mdx', '.txt'];

function getExcerpt(content) {
    // Remove markdown syntax roughly
    const plain = content
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
        .replace(/[#*`_]/g, '') // formatting
        .replace(/\n+/g, ' ')
        .trim();
    return plain.slice(0, 200) + (plain.length > 200 ? '...' : '');
}

function getCategory(relPath) {
    const parts = relPath.split(path.sep);
    return parts[0] || 'misc';
}

async function buildIndex() {
    console.log('🏗️  Building Docs Index...');
    const docs = [];
    const categories = {};
    const tagsCount = {};

    for (const folder of SCAN_FOLDERS) {
        const folderPath = path.join(REPO_ROOT, folder);
        if (!fs.existsSync(folderPath)) continue;

        console.log(`Scanning ${folder}...`);
        const files = await glob('**/*.{md,mdx,txt}', { cwd: folderPath });

        for (const file of files) {
            // Only allowing txt for prompts folder specifically per requirements?
            // Requirement: "txt only for prompts folder".
            // Glob above matches txt everywhere in scan folder. Let's filter.
            const ext = path.extname(file);
            if (ext === '.txt' && folder !== 'prompts') continue;

            const fullPath = path.join(folderPath, file);
            const content = fs.readFileSync(fullPath, 'utf8');

            let data = {};
            let contentBody = content;

            try {
                const parsed = matter(content);
                data = parsed.data;
                contentBody = parsed.content;
            } catch (e) {
                // Plain text or frontmatter error
            }

            const relPath = path.join(folder, file);
            const category = getCategory(relPath);

            const title = data.title ||
                (contentBody.match(/^#\s+(.+)$/m) || [])[1] ||
                path.basename(file, ext);

            const tags = data.tags || [];
            const excerpt = data.excerpt || getExcerpt(contentBody);

            // Stats
            categories[category] = (categories[category] || 0) + 1;
            tags.forEach(t => tagsCount[t] = (tagsCount[t] || 0) + 1);

            docs.push({
                id: relPath, // Use path as ID
                title,
                category,
                tags,
                excerpt,
                body: contentBody, // Full body for search
                sourcePath: relPath
            });
        }
    }

    // Create public dir if not exists
    if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
        fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    }

    // Write Search Index (optimize by removing body if using flexsearch document server-side, 
    // but for client-side load, we keep body or use a pre-built index.
    // Requirement: "index generated at build time to a JSON file". 
    // Flexsearch can ingest this JSON.

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(docs, null, 2));
    fs.writeFileSync(MANIFEST_FILE, JSON.stringify({ categories, tags: tagsCount }, null, 2));

    console.log(`✅ Index generated: ${docs.length} documents.`);
    console.log(`   Written to ${OUTPUT_FILE}`);
}

buildIndex().catch(console.error);
