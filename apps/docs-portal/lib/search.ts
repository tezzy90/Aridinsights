export type DocEntry = {
    id: string;
    title: string;
    category: string; // docs, prompts, features
    subtype?: string; // adr, runbook, marketing, etc.
    tags: string[];
    status?: string;
    components?: string[];
    excerpt: string;
    updatedAt: string;
    url: string;
};

export type FilterOptions = {
    category?: string;
    subtype?: string;
    tags?: string[];
    status?: string;
    search?: string;
};

// Client-side loader (since we use json)
export async function loadIndex(): Promise<DocEntry[]> {
    try {
        const res = await fetch('/search-index.json?v=' + Date.now(), { cache: 'no-store' });
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error("Failed to load search index", e);
        return [];
    }
}

export function filterDocs(docs: DocEntry[], opts: FilterOptions): DocEntry[] {
    return docs.filter(doc => {
        if (opts.category && doc.category !== opts.category) return false;

        if (opts.subtype && doc.subtype !== opts.subtype) return false;

        if (opts.status && doc.status !== opts.status) return false;

        if (opts.tags && opts.tags.length > 0) {
            // OR logic by default: match ANY tag
            const hasTag = opts.tags.some(t => doc.tags.includes(t));
            if (!hasTag) return false;
        }

        if (opts.search) {
            const q = opts.search.toLowerCase();
            return doc.title.toLowerCase().includes(q) ||
                doc.excerpt.toLowerCase().includes(q) ||
                (doc.id && doc.id.toLowerCase().includes(q));
        }

        return true;
    }).sort((a, b) => {
        // Default sort: UpdatedAt desc
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
}
