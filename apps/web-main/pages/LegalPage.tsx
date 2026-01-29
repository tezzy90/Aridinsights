import React from 'react';
import Link from 'next/link';
import { Container } from '../components/ui/Container';
import { EMAILS } from '../constants';

interface LegalPageProps {
  title: string;
  children?: React.ReactNode;
}

const LegalPage: React.FC<LegalPageProps> = ({ title, children }) => {
  return (
    <div className="pt-16 pb-24 bg-brand-muted dark:bg-slate-950 transition-colors duration-300">
      <Container>
        <div className="mb-8">
          <Link href="/" className="text-brand-dark dark:text-brand-light font-medium hover:underline transition-colors duration-300">← Back to Home</Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white mb-8 transition-colors duration-300">{title}</h1>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 text-brand-text dark:text-slate-300 transition-colors duration-300">
          {children ? (
            children
          ) : (
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                This is a placeholder for the <strong>{title}</strong> of AridInsights.
              </p>
              <p>
                In a production environment, the full legal text prepared by counsel would reside here.
                Given the nature of compliance infrastructure, accurate legal documentation regarding data handling,
                service terms, and liability is critical.
              </p>
              <h3 className="text-lg font-semibold mt-6 mb-2 text-brand-heading dark:text-white">Contact Us</h3>
              <p>
                If you have specific questions about our legal policies, please contact us at {EMAILS.LEGAL}.
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default LegalPage;