import DocsBrowser from '../docs/page';
export default function ADRPage() {
    // Hack: We can just redirect or re-use component. 
    // Since page components in App Router can't easily pass props if they are page roots receiving search params, 
    // we need to set the query param or create a wrapper. 
}

// Actually, better to just make a distinct page that forces subtype='adr' in the filter logic
// But for speed, let's just make /adrs redirect to /docs?subtype=adr or duplicate the component logic with fixed filter.
// I will create a redirect for now, or a simple wrapper.

'use client';
import { useEffect, useState } from 'react';
import { loadIndex, filterDocs, DocEntry } from '../../lib/search';
import Link from 'next/link';

export default function ADRPageReal() {
    const [docs, setDocs] = useState<DocEntry[]>([]);

    useEffect(() => {
        loadIndex().then(allDocs => {
            setDocs(filterDocs(allDocs, { category: 'docs', subtype: 'adr' }));
        });
    }, []);

    return (
        <div className="max-w-4xl">
            <h1 className="text-2xl font-bold mb-4">🏛️ Architecture Decision Records</h1>
            <div className="grid gap-4">
                {docs.map(doc => (
                    <Link key={doc.id} href={doc.url} className="block p-4 border rounded bg-white hover:border-amber-400">
                        <div className="font-bold">{doc.title}</div>
                        <div className="text-sm text-gray-500">{doc.excerpt}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
