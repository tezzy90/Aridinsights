import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';

// Re-use logic or read from index. For now, reading file system directly for "source of truth" page.
// Or better, read from search-index.json? No, server components should read files.

async function getFeatures() {
    const repoRoot = path.resolve('../..');
    const featuresDir = path.join(repoRoot, 'features');

    if (!fs.existsSync(featuresDir)) return [];

    const files = fs.readdirSync(featuresDir).filter(f => f.endsWith('.md'));
    const cards = files.map(file => {
        const content = fs.readFileSync(path.join(featuresDir, file), 'utf8');
        const { data } = matter(content);
        return {
            id: data.id || file.replace('.md', ''),
            title: data.title || file,
            status: data.status || 'unknown',
            owner: data.owner,
            slug: `features/${file}`
        };
    });
    return cards;
}

export default async function FeaturesPage() {
    const features = await getFeatures();

    return (
        <main className="max-w-4xl mx-auto p-8">
            <header className="mb-8 border-b pb-4">
                <Link href="/" className="text-blue-600 hover:underline mb-4 block">← Back</Link>
                <h1 className="text-3xl font-bold">Feature Registry</h1>
                <p className="text-gray-600">System of Record for shipped and planned capabilities.</p>
            </header>

            <div className="grid gap-4">
                {features.map(f => (
                    <Link key={f.id} href={`/doc/${f.slug}`} className="block group">
                        <div className="border p-4 rounded bg-white hover:border-blue-400 shadow-sm transition">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-xs font-mono text-gray-500 mr-2">{f.id}</span>
                                    <h2 className="text-xl font-semibold inline group-hover:text-blue-600">{f.title}</h2>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs uppercase font-bold ${f.status === 'shipped' ? 'bg-green-100 text-green-800' :
                                        f.status === 'building' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {f.status}
                                </span>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                                Owner: {f.owner || 'Unassigned'}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {features.length === 0 && (
                <p className="text-gray-500 italic">No feature cards found in <code>features/</code>.</p>
            )}
        </main>
    );
}
