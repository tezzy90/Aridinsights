import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { glob } from 'glob';
import { execSync } from 'child_process';

const REPO_ROOT = path.resolve('../..');
const OUTPUT_FILE = path.join(process.cwd(), 'public/search-index.json');
const MANIFEST_FILE = path.join(process.cwd(), 'public/search-manifest.json');

const SCAN_FOLDERS = [
    'docs',
    'prompts',
    'features',
    'feature-cards'
];

function getGitUpdateDate(filePath) {
    try {
        const date = execSync(`git log -1 --format=%cI -- "${filePath}"`, { cwd: REPO_ROOT, encoding: 'utf8', stdio: 'pipe' }).trim();
        if (date) return date;
    } catch (e) {
        return null; // Fallback to fs
    }
    return null;
}

function getSubtype(relPath, category) {
    if (category === 'features') return 'feature-card';
    if (relPath.includes('docs/decisions') || relPath.includes('docs/adrs')) return 'adr';
    if (relPath.includes('docs/runbooks')) return 'runbook';

    if (category === 'prompts') {
        const parts = relPath.split(path.sep);
        // prompts/library/<category>/<file>
        if (parts.length > 2) return parts[2];
        return 'general_prompt';
    }
    return 'general_doc';
}

function getCategory(relPath) {
    const parts = relPath.split(path.sep);
    const top = parts[0];
    if (top === 'feature-cards') return 'features';
    return top || 'misc';
}

function getExcerpt(content) {
    const plain = content
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[#*`_]/g, '')
        .replace(/\n+/g, ' ')
        .trim();
    return plain.slice(0, 200) + (plain.length > 200 ? '...' : '');
}

async function buildIndex() {
    console.log('🏗️  Building Docs Index (v2)...');
    const docs = [];
    const categories = {};
    const subtypes = {};
    const tagsCount = {};

    for (const folder of SCAN_FOLDERS) {
        const folderPath = path.join(REPO_ROOT, folder);
        if (!fs.existsSync(folderPath)) continue;

        console.log(`Scanning ${folder}...`);
        const files = await glob('**/*.{md,mdx,txt}', { cwd: folderPath, ignore: ['**/node_modules/**'] });

        for (const file of files) {
            const ext = path.extname(file);
            if (ext === '.txt' && folder !== 'prompts') continue;

            const fullPath = path.join(folderPath, file);
            const content = fs.readFileSync(fullPath, 'utf8');
            const relPath = path.join(folder, file);

            let data = {};
            let contentBody = content;

            try {
                const parsed = matter(content);
                data = parsed.data;
                contentBody = parsed.content;
            } catch (e) {
                console.warn(`⚠️ Failed to parse frontmatter for ${relPath}:`, e.message);
            }

            const category = getCategory(relPath);
            const subtype = getSubtype(relPath, category);

            const title = data.title ||
                (contentBody.match(/^#\s+(.+)$/m) || [])[1] ||
                path.basename(file, ext);

            const tags = data.tags || [];
            if (data.status) tags.push(`status:${data.status}`);

            const excerpt = data.excerpt || getExcerpt(contentBody);

            let updatedAt = getGitUpdateDate(relPath);
            if (!updatedAt) {
                const stats = fs.statSync(fullPath);
                updatedAt = stats.mtime.toISOString();
            }

            // Feature metadata
            const status = data.status || null;
            const components = data.components || [];

            categories[category] = (categories[category] || 0) + 1;
            subtypes[subtype] = (subtypes[subtype] || 0) + 1;
            tags.forEach(t => tagsCount[t] = (tagsCount[t] || 0) + 1);

            docs.push({
                id: relPath,
                title,
                category,
                subtype,
                tags,
                status,
                components,
                excerpt,
                body: contentBody,
                sourcePath: relPath,
                updatedAt,
                url: `/doc/${relPath}`
            });
        }
    }

    if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
        fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(docs, null, 2));
    fs.writeFileSync(MANIFEST_FILE, JSON.stringify({ categories, subtypes, tags: tagsCount }, null, 2));

    console.log(`✅ Index generated: ${docs.length} documents.`);
    console.log(`   Written to ${OUTPUT_FILE}`);
}

buildIndex();
