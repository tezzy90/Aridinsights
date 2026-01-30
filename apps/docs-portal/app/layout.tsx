import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AridInsights Internal Docs',
    description: 'Internal documentation and prompt library.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#f9fafb', color: '#111827' }}>
                <header style={{ borderBottom: '1px solid #e5e7eb', background: '#fff', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <a href="/" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.25rem', color: '#000' }}>AridInsights Docs</a>
                    <nav style={{ display: 'flex', gap: '1rem' }}>
                        <a href="/search" style={{ color: '#4b5563', textDecoration: 'none' }}>Search</a>
                        <a href="/browse" style={{ color: '#4b5563', textDecoration: 'none' }}>Browse</a>
                    </nav>
                </header>
                <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                    {children}
                </main>
            </body>
        </html>
    );
}
