'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
    const pathname = usePathname();

    const renderLink = (label: string, href: string) => {
        const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
        return (
            <Link
                href={href}
                className={`block rounded px-2 py-1 opacity-90 hover:opacity-100 hover:bg-white/5 transition-colors ${isActive ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-600' : ''
                    }`}
            >
                {label}
            </Link>
        );
    };

    return (
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-xl font-bold text-white tracking-tight">AridDocs</h1>
                <p className="text-xs text-slate-500 mt-1">v2.0 Control Center</p>
            </div>

            <nav className="flex-1 p-4 overflow-y-auto">
                {/* Navigation Section */}
                <div className="mb-6">
                    <h3 className="mb-2 text-xs uppercase opacity-60 tracking-wide text-slate-500">Navigation</h3>
                    <div className="space-y-1 text-sm">
                        {renderLink('Dashboard', '/')}
                        {renderLink('Search', '/search')}
                    </div>
                </div>

                {/* Libraries Section */}
                <div className="mb-6">
                    <h3 className="mb-2 text-xs uppercase opacity-60 tracking-wide text-slate-500">Libraries</h3>
                    <div className="space-y-1 text-sm">
                        {renderLink('Feature Registry', '/features')}
                        {renderLink('Prompt Library', '/prompts')}
                        {renderLink('All Docs', '/docs')}
                        {renderLink('ADRs', '/adrs')}
                        {renderLink('Runbooks', '/runbooks')}
                    </div>
                </div>
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="text-xs text-slate-500">
                    <p>Protected by IAP</p>
                    <p className="mt-1">© 2026 Arid Insights</p>
                </div>
            </div>
        </aside>
    );
}
