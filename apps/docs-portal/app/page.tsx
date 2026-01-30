'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { loadIndex, DocEntry } from '../../lib/search';

export default function Dashboard() {
    const [docs, setDocs] = useState<DocEntry[]>([]);
    const [recents, setRecents] = useState<DocEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        loadIndex().then(data => {
            if (!data || data.length === 0) {
                setError(true);
            } else {
                setDocs(data);
                // Sort by updatedAt desc, take top 8
                const sorted = [...data].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
                setRecents(sorted.slice(0, 8));
            }
            setLoading(false);
        });
    }, []);

    if (error) {
        return (
            <div className="p-8 border-l-4 border-yellow-500 bg-yellow-50">
                <h3 className="text-lg font-bold text-yellow-800">Search Index Missing</h3>
                <p className="mt-2 text-yellow-700">The portal needs a rebuild. Run this in your terminal:</p>
                <code className="block bg-black text-white p-3 mt-4 rounded">npm run index:docs</code>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Quick Links */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <QuickTile title="Browse Docs" href="/docs" icon="📚" color="bg-blue-50 text-blue-700 hover:bg-blue-100" />
                <QuickTile title="Prompt Library" href="/prompts" icon="🤖" color="bg-purple-50 text-purple-700 hover:bg-purple-100" />
                <QuickTile title="Feature Registry" href="/features" icon="🚀" color="bg-green-50 text-green-700 hover:bg-green-100" />
                <QuickTile title="Runbooks" href="/runbooks" icon="🛠️" color="bg-orange-50 text-orange-700 hover:bg-orange-100" />
            </section>

            {/* Recents */}
            <section>
                <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                    <span className="mr-2">🕒</span> Recently Updated
                </h2>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-gray-400">Loading index...</div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recents.map(doc => (
                                    <tr key={doc.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link href={doc.url} className="text-sm font-medium text-blue-600 hover:underline block truncate max-w-lg">
                                                {doc.title}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                {doc.category === 'features' ? 'Feature' :
                                                    doc.category === 'prompts' ? 'Prompt' :
                                                        doc.subtype || 'Doc'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                            {formatDate(doc.updatedAt)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </div>
    );
}

function QuickTile({ title, href, icon, color }: any) {
    return (
        <Link href={href} className={`p-6 rounded-lg border border-transparent transition shadow-sm ${color}`}>
            <div className="text-2xl mb-2">{icon}</div>
            <div className="font-semibold">{title}</div>
        </Link>
    );
}

function formatDate(iso: string) {
    if (!iso) return '-';
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}
