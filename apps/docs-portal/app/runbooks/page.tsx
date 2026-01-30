'use client';
import { useEffect, useState } from 'react';
import { loadIndex, filterDocs, DocEntry } from '@/lib/search';
import Link from 'next/link';

export default function RunbooksPage() {
    const [docs, setDocs] = useState<DocEntry[]>([]);

    useEffect(() => {
        loadIndex().then(allDocs => {
            setDocs(filterDocs(allDocs, { category: 'docs', subtype: 'runbook' }));
        });
    }, []);

    return (
        <div className="max-w-4xl">
            <h1 className="text-2xl font-bold mb-4">🛠️ Runbooks</h1>
            <div className="grid gap-4">
                {docs.map(doc => (
                    <Link key={doc.id} href={doc.url} className="block p-4 border rounded bg-white hover:border-green-400">
                        <div className="font-bold text-green-800">{doc.title}</div>
                        <div className="text-sm text-gray-500">{doc.excerpt}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
