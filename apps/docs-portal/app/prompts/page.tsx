'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadIndex, filterDocs, DocEntry } from '../../lib/search';

export default function PromptsPage() {
    const [docs, setDocs] = useState<DocEntry[]>([]);
    const [filterTag, setFilterTag] = useState('');

    useEffect(() => {
        loadIndex().then(allDocs => {
            let res = filterDocs(allDocs, { category: 'prompts' });
            if (filterTag) {
                res = res.filter(d => d.tags.includes(filterTag) || d.subtype === filterTag);
            }
            setDocs(res);
        });
    }, [filterTag]);

    return (
        <div>
            <header className="mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    🤖 Prompt Library
                </h1>
                <p className="text-gray-600 mt-1">Curated agents and system instructions.</p>

                {/* Simple Filter */}
                <div className="mt-4 flex gap-2">
                    {['marketing', 'devex', 'governance'].map(tag => (
                        <button
                            key={tag}
                            onClick={() => setFilterTag(filterTag === tag ? '' : tag)}
                            className={`px-3 py-1 rounded-full text-xs font-bold border ${filterTag === tag ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-white border-gray-200 text-gray-600'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {docs.map(doc => (
                    <Link key={doc.id} href={doc.url} className="block group">
                        <div className="h-full p-6 bg-white border rounded-xl hover:shadow-md hover:border-purple-300 transition flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${doc.subtype === 'marketing' ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {doc.subtype || 'PROMPT'}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 mb-2">{doc.title}</h3>
                            <p className="text-sm text-gray-500 mb-4 flex-1 line-clamp-3">{doc.excerpt}</p>
                            <div className="pt-4 border-t flex items-center justify-between text-xs text-gray-400">
                                <span>v{new Date(doc.updatedAt).toLocaleDateString()}</span>
                                <span className="group-hover:translate-x-1 transition">View →</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
