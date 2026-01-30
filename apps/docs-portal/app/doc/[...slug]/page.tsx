import React from 'react';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import matter from 'gray-matter';
import Link from 'next/link';
import { execSync } from 'child_process';

function getGitDate(fullPath: string) {
    try {
        const repoRoot = path.resolve('../..');
        return execSync(`git log -1 --format=%cI -- "${fullPath}"`, { cwd: repoRoot, encoding: 'utf8' }).trim();
    } catch {
        return null; // Fallback
    }
}

// Server Component
export default async function DocPage({ params }: { params: { slug: string[] } }) {
    const relPath = params.slug.join('/');
    const repoRoot = path.resolve('../..');

    // Security Check
    const allowedRoots = ['docs', 'prompts', 'features', 'product', 'prompts'];
    const rootDir = relPath.split('/')[0];

    if (!allowedRoots.includes(rootDir) || relPath.includes('..')) {
        return (
            <div className="p-8 text-red-600 bg-red-50 rounded border border-red-200">
                <h1 className="text-xl font-bold">Access Denied</h1>
                <p>Path unauthorized or traversal attempt detected.</p>
            </div>
        );
    }

    const fullPath = path.join(repoRoot, relPath);

    if (!fs.existsSync(fullPath) || fs.lstatSync(fullPath).isDirectory()) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold text-gray-800">404 - Document Not Found</h1>
                <p className="mt-2 text-gray-600">Could not locate: <code className="bg-gray-100 px-1 py-0.5 rounded">{relPath}</code></p>
                <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">← Back to Dashboard</Link>
            </div>
        );
    }

    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const { content, data } = matter(fileContent);
    const htmlContent = await marked(content);

    // Metadata Resolution
    const gitDate = getGitDate(fullPath);
    const stat = fs.statSync(fullPath);
    const updatedAt = gitDate || stat.mtime.toISOString();

    // Back Link Logic
    let backLink = '/docs';
    let backLabel = 'Docs';
    if (relPath.startsWith('prompts')) { backLink = '/prompts'; backLabel = 'Prompts'; }
    if (relPath.startsWith('features')) { backLink = '/features'; backLabel = 'Registry'; }
    if (relPath.includes('adrs')) { backLink = '/adrs'; backLabel = 'ADRs'; }

    return (
        <article className="max-w-4xl mx-auto">
            {/* Metadata Header */}
            <header className="mb-8 border-b pb-6">
                <Link href={backLink} className="text-sm text-gray-500 hover:text-blue-600 mb-4 inline-block transition">
                    ← Back to {backLabel}
                </Link>

                <div className="flex items-center gap-3 mb-3">
                    {data.status && (
                        <span className="px-2 py-0.5 rounded text-xs font-bold uppercase bg-blue-100 text-blue-800">
                            {data.status}
                        </span>
                    )}
                    <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded border">
                        {relPath}
                    </span>
                </div>

                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    {data.title || path.basename(relPath)}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center">
                        📅 Updated {new Date(updatedAt).toLocaleDateString()}
                    </span>
                    {data.tags && (
                        <div className="flex gap-2">
                            {data.tags.map((t: string) => (
                                <span key={t} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">#{t}</span>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            {/* Content */}
            <div
                className="prose prose-blue max-w-none prose-headings:font-bold prose-h1:text-3xl prose-a:text-blue-600"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </article>
    );
}
