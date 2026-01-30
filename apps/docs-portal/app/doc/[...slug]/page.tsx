import React from 'react';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import matter from 'gray-matter';

// Server Component
export default async function DocPage({ params }: { params: { slug: string[] } }) {
    const relPath = params.slug.join('/');

    // Security Check: Ensure path is within allowed roots
    const allowedRoots = ['docs', 'prompts', 'features', 'product'];
    const rootDir = relPath.split('/')[0];

    if (!allowedRoots.includes(rootDir) || relPath.includes('..')) {
        return (
            <div style={{ padding: '2rem', color: 'red' }}>
                <h1>Access Denied</h1>
                <p>Path unauthorized or traversal attempt detected.</p>
            </div>
        );
    }

    // Resolve file
    const repoRoot = path.resolve('../..');
    const fullPath = path.join(repoRoot, relPath);

    if (!fs.existsSync(fullPath) || fs.lstatSync(fullPath).isDirectory()) {
        return (
            <div style={{ padding: '2rem' }}>
                <h1>Document Not Found</h1>
                <p>Could not locate: <code>{relPath}</code></p>
            </div>
        );
    }

    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const { content, data } = matter(fileContent);
    const htmlContent = await marked(content);

    return (
        <div className="doc-content">
            <div style={{ marginBottom: '2rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
                <h1 style={{ marginBottom: '0.5rem' }}>{data.title || path.basename(relPath)}</h1>
                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    <span>{relPath}</span>
                    {data.status && <span style={{ background: '#f3f4f6', padding: '0 0.5rem', borderRadius: '4px' }}>{data.status}</span>}
                </div>
                {data.tags && (
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        {data.tags.map((t: string) => (
                            <span key={t} style={{ background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem' }}>{t}</span>
                        ))}
                    </div>
                )}
            </div>

            <div
                style={{ lineHeight: 1.6 }}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </div>
    );
}
