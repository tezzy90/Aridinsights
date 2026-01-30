import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '../components/sidebar';
import { Topbar } from '../components/topbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'AridDocs Portal',
    description: 'Internal Control Center for Arid Insights.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-gray-50 flex min-h-screen text-slate-900`}>
                <Sidebar />
                <div className="flex-1 ml-64 flex flex-col min-h-screen">
                    <Topbar />
                    <main className="flex-1 p-8 overflow-y-auto">
                        {/* Security Banner */}
                        <div className="mb-8 bg-amber-50 border-l-4 border-amber-400 p-4 text-sm text-amber-800 rounded-r shadow-sm flex items-start justify-between">
                            <div>
                                <p className="font-bold mb-1">🔒 Internal – Protected by IAP</p>
                                <p>Access governed by <a href="/doc/docs/decisions/ADR-001-internal-docs-access.md" className="underline hover:text-amber-900">ADR-001</a>. Do not share credentials or screenshots externally.</p>
                            </div>
                        </div>
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
