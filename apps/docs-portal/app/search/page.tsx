'use client';

import React, { useEffect, useState } from 'react';
import FlexSearch from 'flexsearch';

// Types for our index
type Doc = {
    id: string; // sourcePath
    title: string;
    category: string;
    excerpt: string;
    tags: string[];
    sourcePath: string;
    body?: string;
};

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [index, setIndex] = useState<any>(null);
    const [docs, setDocs] = useState<Record<string, Doc>>({});
    const [results, setResults] = useState<Doc[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load index on mount
        async function loadIndex() {
            try {
                const res = await fetch('/search-index.json');
                const data: Doc[] = await res.json();

                // Build FlexSearch index
                // Using "Document" index type for field search if needed, but simple "Index" is often enough for body.
                // Using Document to search across title/body/tags.
                const idx = new FlexSearch.Document({
                    document: {
                        id: "id",
                        index: ["title", "body", "tags"],
                        store: true // We already have the data in 'docs' map, but flexsearch store is convenient
                    },
                    tokenize: "forward",
                });

                const docMap: Record<string, Doc> = {};
                data.forEach(d => {
                    idx.add(d);
                    docMap[d.id] = d;
                });

                setIndex(idx);
                setDocs(docMap);
                setResults(data); // Show all initially? Or verified none.
            } catch (e) {
                console.error("Failed to load index", e);
            } finally {
                setLoading(false);
            }
        }
        loadIndex();
    }, []);

    useEffect(() => {
        if (!index) return;
        if (!query.trim()) {
            setResults(Object.values(docs));
            return;
        }

        // Search
        const searchRes = index.search(query, { limit: 50, enrich: true });
        // Flexsearch "enrich: true" returns [{ field: 'title', result: [doc, doc] }, ...]
        // We need to deduplicate.

        const uniqueIds = new Set<string>();
        const hits: Doc[] = [];

        searchRes.forEach((fieldRes: any) => {
            fieldRes.result.forEach((doc: Doc) => {
                if (!uniqueIds.has(doc.id)) {
                    uniqueIds.add(doc.id);
                    hits.push(docs[doc.id]);
                }
            });
        });

        setResults(hits);

    }, [query, index, docs]);

    if (loading) return <div>Loading index...</div>;

    return (
        <div>
            <h1 style={{ marginBottom: '1.5rem' }}>Search Documentation</h1>

            <input
                type="text"
                placeholder="Search docs, prompts, ADRs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', marginBottom: '2rem' }}
                autoFocus
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {results.length === 0 && <p>No results found.</p>}
                {results.map(doc => (
                    <div key={doc.id} style={{ background: '#fff', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                        <h3 style={{ margin: '0 0 0.5rem 0' }}>
                            <a href={`/doc/${doc.sourcePath}`} style={{ color: '#2563eb', textDecoration: 'none' }}>{doc.title}</a>
                            <span style={{ marginLeft: '1rem', fontSize: '0.75rem', background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', color: '#6b7280' }}>{doc.category}</span>
                        </h3>
                        <p style={{ fontSize: '0.9rem', color: '#4b5563', margin: '0 0 0.5rem 0' }}>{doc.excerpt}</p>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{doc.sourcePath}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
