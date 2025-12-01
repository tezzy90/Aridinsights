import React from 'react';
import Link from 'next/link';
import { Container } from './ui/Container';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-heading text-slate-400 py-12 border-t border-brand-heading">
      <Container className="!py-0">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm font-medium">
            <span className="text-white">AridInsights</span> · Water Intelligence
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-slate-400 max-w-3xl mx-auto mb-6 leading-relaxed">
            AridInsights is a division of <strong>321Work Inc.</strong>, a climate intelligence studio focused on software infrastructure for fragmented water markets.
            <a href="https://321work.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-primary transition-colors ml-1 font-medium">
              Learn about our broader platform vision →
            </a>
          </p>
          <p className="text-xs text-slate-500">
            © {currentYear} AridInsights, a division and DBA of 321Work Inc. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};