import React from 'react';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

async function getInternalBanner() {
    // Read the banner partial from repo root
    // Only in Node environment (server component)
    try {
        const repoRoot = path.resolve('../..');
        const bannerPath = path.join(repoRoot, 'docs/_partials/banner_internal.md');
        if (fs.existsSync(bannerPath)) {
            const content = fs.readFileSync(bannerPath, 'utf8');
            return marked(content);
        }
    } catch (e) {
        console.error("Could not read banner", e);
    }
    return "<p><strong>Internal Documentation</strong> (Banner missing)</p>";
}

export default async function Home() {
    const bannerHtml = await getInternalBanner();

    return (
        <div>
            <div
                style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.5rem', padding: '1rem', marginBottom: '2rem', color: '#1e3a8a' }}
                dangerouslySetInnerHTML={{ __html: bannerHtml }}
            />

            <h1>Welcome to AridInsights Internal Docs</h1>
            <p style={{ fontSize: '1.1rem', color: '#4b5563', maxWidth: '600px' }}>
                This portal provides searchable access to all internal documentation, architectural decisions, and prompt libraries.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                <Card title="Search" href="/search" desc="Find docs, prompts, and decisions." />
                <Card title="Browse Prompts" href="/search?category=prompts" desc="Explore the prompt catalog." />
                <Card title="Architecture Decisions" href="/doc/docs/decisions/index.md" desc="View ADRs and technical stacks. (If index exists)" />
                <Card title="Runbooks" href="/search?category=docs&q=runbook" desc="Operational guides." />
            </div>
        </div>
    );
}

function Card({ title, href, desc }: { title: string, href: string, desc: string }) {
    return (
        <a href={href} style={{ display: 'block', padding: '1.5rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.75rem', textDecoration: 'none', color: 'inherit', transition: 'box-shadow 0.2s' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#2563eb' }}>{title} &rarr;</h3>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>{desc}</p>
        </a>
    )
}
