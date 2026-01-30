'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
    { label: 'Dashboard', href: '/' },
    { label: 'Search', href: '/search' },
    { label: 'All Docs', href: '/docs' },
    { label: 'ADRs', href: '/adrs' },
    { label: 'Runbooks', href: '/runbooks' },
    { label: 'Feature Registry', href: '/features' },
    { label: 'Prompt Library', href: '/prompts' },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-xl font-bold text-white tracking-tight">AridDocs</h1>
                <p className="text-xs text-slate-500 mt-1">v2.0 Control Center</p>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            {item.label}
                        </Link>
                    );
                })}
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
