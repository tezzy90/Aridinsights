'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadIndex, filterDocs, DocEntry } from '@/lib/search';

export default function FeaturesPage() {
    const [docs, setDocs] = useState<DocEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadIndex().then(allDocs => {
            setDocs(filterDocs(allDocs, { category: 'features' }));
            setLoading(false);
        });
    }, []);

    const getStatusColor = (s: string) => {
        switch (s) {
            case 'shipped': return 'bg-green-100 text-green-800 border-green-200';
            case 'building': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'planned': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
            case 'deprecated': return 'bg-gray-100 text-gray-500 border-gray-200 line-through';
            default: return 'bg-gray-50 text-gray-600 border-gray-200';
        }
    }

    return (
        <main>
            <header className="mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold">Feature Registry</h1>
                <p className="text-gray-600">System of Record for shipped and planned capabilities.</p>
            </header>

            {loading ? <p>Loading...</p> : (
                <div className="grid gap-4">
                    {docs.map(f => (
                        <Link key={f.id} href={f.url} className="block group">
                            <div className="border p-4 rounded bg-white hover:border-blue-400 shadow-sm transition flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${getStatusColor(f.status || '')}`}>
                                            {f.status || 'Draft'}
                                        </span>
                                        <span className="text-xs font-mono text-gray-400">{f.id}</span>
                                    </div>
                                    <h2 className="text-xl font-semibold group-hover:text-blue-600">{f.title}</h2>
                                    <div className="mt-1 text-sm text-gray-500 line-clamp-1">{f.excerpt}</div>
                                </div>
                                <div className="text-right text-xs text-gray-400">
                                    <div className="mb-1">Updated {new Date(f.updatedAt).toLocaleDateString()}</div>
                                    <div className="font-mono">{f.components?.join(', ')}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {docs.length === 0 && (
                        <p className="text-gray-500 italic">No feature cards found.</p>
                    )}
                </div>
            )}
        </main>
    );
}
