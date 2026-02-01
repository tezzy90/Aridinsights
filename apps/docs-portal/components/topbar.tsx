'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function Topbar() {
    const router = useRouter();
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 w-full">
            <div className="flex items-center flex-1 gap-8">
                <form onSubmit={handleSearch} className="w-full max-w-sm relative">
                    <input
                        type="text"
                        placeholder="Search docs..."
                        className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </form>

                <nav className="flex flex-wrap items-center gap-4 text-sm hidden md:flex">
                    <a className="opacity-90 hover:opacity-100 hover:underline hover:text-blue-600" href="/">Dashboard</a>
                    <a className="opacity-90 hover:opacity-100 hover:underline hover:text-blue-600" href="/search">Search</a>
                    <a className="opacity-90 hover:opacity-100 hover:underline hover:text-blue-600" href="/docs">Docs</a>
                    <a className="opacity-90 hover:opacity-100 hover:underline hover:text-blue-600" href="/adrs">ADRs</a>
                    <a className="opacity-90 hover:opacity-100 hover:underline hover:text-blue-600" href="/runbooks">Runs</a>
                    <a className="opacity-90 hover:opacity-100 hover:underline hover:text-blue-600" href="/features">Features</a>
                    <a className="opacity-90 hover:opacity-100 hover:underline hover:text-blue-600" href="/prompts">Prompts</a>
                </nav>
            </div>

            <div className="flex items-center gap-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                    Internal System
                </span>
                <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs ring-2 ring-white shadow-sm">
                    AI
                </span>
            </div>
        </header>
    );
}
