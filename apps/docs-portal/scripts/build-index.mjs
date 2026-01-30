import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { glob } from 'glob';

const REPO_ROOT = path.resolve('../..');
const OUTPUT_FILE = path.join(process.cwd(), 'public/search-index.json');
const MANIFEST_FILE = path.join(process.cwd(), 'public/search-manifest.json');

// Folders to scan relative to repo root
const SCAN_FOLDERS = [
    'docs/**/*.md',
    'docs/**/*.mdx',
    'prompts/**/*.md',
    'prompts/**/*.txt',
    'features/**/*.md', // Added features
    'feature-cards/**/*.md' // Legacy support
];

async function buildIndex() {
    console.log('🏗️  Building Docs Index...');
    const docs = [];
    const categories = {};
    const tagsCount = {};

    for (const pattern of SCAN_FOLDERS) {
        const files = await glob(pattern, { cwd: REPO_ROOT, ignore: '**/node_modules/**' });

        for (const file of files) {
            const fullPath = path.join(REPO_ROOT, file);
            const content = fs.readFileSync(fullPath, 'utf8');
            const relPath = file;

            let title = path.basename(file);
            let body = content;
            let tags = [];

            // Heuristic Category
            let category = 'docs';
            if (relPath.startsWith('prompts')) category = 'prompts';
            if (relPath.startsWith('features') || relPath.startsWith('feature-cards')) category = 'features';

            try {
                const { data, content: mdContent } = matter(content);
                if (data.title) title = data.title;
                if (data.tags) tags = data.tags;
                if (data.category) category = data.category;
                body = mdContent;
            } catch (e) {
                // Plain text or error
            }

            // Strip markdown for search body (simple regex)
            const cleanBody = body.replace(/[*#`]/g, '');

            const doc = {
                id: relPath,
                title,
                category,
                tags,
                body: cleanBody.substring(0, 5000), // Limit size
                sourcePath: relPath
            };

            docs.push(doc);
            categories[category] = (categories[category] || 0) + 1;
            tags.forEach(t => tagsCount[t] = (tagsCount[t] || 0) + 1);
        }
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(docs, null, 2));
    fs.writeFileSync(MANIFEST_FILE, JSON.stringify({ categories, tags: tagsCount }, null, 2));

    console.log(`✅ Index generated: ${docs.length} documents.`);
    console.log(`   Written to ${OUTPUT_FILE}`);
}

buildIndex();
