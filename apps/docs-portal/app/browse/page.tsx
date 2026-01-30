import React from 'react';
import fs from 'fs';
import path from 'path';

async function getCategories() {
    const repoRoot = path.resolve('../..');
    const indexFile = path.join(repoRoot, 'apps/docs-portal/public/search-manifest.json');
    if (!fs.existsSync(indexFile)) return { categories: {}, tags: {} };
    return JSON.parse(fs.readFileSync(indexFile, 'utf8'));
}

export default async function BrowsePage() {
    // Since we build index at build time, we can read the manifest
    const { categories, tags } = await getCategories();

    return (
        <div>
            <h1>Browse Categories</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                <section>
                    <h2>By Folder</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {Object.entries(categories).map(([cat, count]) => (
                            <li key={cat} style={{ marginBottom: '0.5rem' }}>
                                <a href={`/search?category=${cat}`} style={{ color: '#2563eb', textDecoration: 'none', fontSize: '1.1rem' }}>
                                    {cat} <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>({String(count)})</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2>Top Tags</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {Object.entries(tags).map(([tag, count]) => (
                            <a key={tag} href={`/search?q=${tag}`} style={{ background: '#f3f4f6', padding: '4px 12px', borderRadius: '16px', textDecoration: 'none', color: '#374151', fontSize: '0.9rem' }}>
                                {tag} ({String(count)})
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
