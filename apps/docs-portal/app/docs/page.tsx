'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { loadIndex, filterDocs, DocEntry } from '../../lib/search';

export default function DocsBrowser() {
    const searchParams = useSearchParams();
    const [docs, setDocs] = useState<DocEntry[]>([]);
    const [loading, setLoading] = useState(true);

    const category = 'docs';
    const subtype = searchParams.get('subtype') || undefined;

    useEffect(() => {
        loadIndex().then(allDocs => {
            const filtered = filterDocs(allDocs, { category, subtype });
            setDocs(filtered);
            setLoading(false);
        });
    }, [category, subtype]);

    return (
        <div>
            <header className="mb-6 flex justify-between items-end border-b pb-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center">
                        📚 {subtype ? `${capitalize(subtype)}s` : 'All Documentation'}
                    </h1>
                    <p className="text-gray-500 mt-1">Repository knowledge base</p>
                </div>
                {!subtype && (
                    <div className="space-x-2 text-sm">
                        <Link href="/adrs" className="text-blue-600 hover:underline">Viewing decisions?</Link>
                        <span className="text-gray-300">|</span>
                        <Link href="/runbooks" className="text-blue-600 hover:underline">Runbooks?</Link>
                    </div>
                )}
            </header>

            {loading ? <p>Loading...</p> : (
                <div className="grid gap-3">
                    {docs.map(doc => (
                        <Link key={doc.id} href={doc.url} className="block group">
                            <div className="p-4 bg-white border rounded hover:border-blue-400 hover:shadow-sm transition">
                                <div className="flex justify-between">
                                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600">{doc.title}</h3>
                                    <span className="text-xs text-gray-400">{new Date(doc.updatedAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{doc.excerpt}</p>
                                <div className="mt-2 flex gap-2">
                                    {doc.tags.map(t => (
                                        <span key={t} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">#{t}</span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                    {docs.length === 0 && <p className="text-gray-500 p-4">No documents found.</p>}
                </div>
            )}
        </div>
    );
}

function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
