import React from 'react';
import { Container } from './ui/Container';
import { SectionHeading } from './ui/SectionHeading';

const securityFeatures = [
  {
    title: 'Bank-Grade Encryption',
    description: 'All data is encrypted at rest using AES-256 and in transit via TLS 1.3. Your sensitive groundwater data is protected by the same standards used by financial institutions.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: 'Granular Access Control',
    description: 'Define precise roles and permissions for every team member. Ensure staff only access the data they need to do their jobs, maintaining strict internal compliance.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
  },
  {
    title: 'Comprehensive Audit Trails',
    description: 'Every action—view, edit, export, or delete—is logged with a timestamp and user ID. Maintain a complete, searchable history for regulatory audits.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: 'Data Sovereignty & Backups',
    description: 'Your data is hosted exclusively in US-based data centers with redundant daily backups. We ensure your historical records are preserved indefinitely.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
];

export const Security: React.FC = () => {
  return (
    <section className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300 py-20">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Enterprise Grade
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-brand-heading dark:text-white tracking-tight">
                Uncompromising Security & Compliance
              </h2>
              <p className="text-lg text-brand-text/80 dark:text-slate-400 leading-relaxed mb-8">
                We understand that regulatory data is sensitive and critical. AridInsights is built from the ground up to meet the strict security requirements of government agencies and large operators.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-brand-text dark:text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>99.9% Uptime SLA</span>
                </div>
                <div className="flex items-center gap-3 text-brand-text dark:text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>SOC 2 Type II Ready</span>
                </div>
                <div className="flex items-center gap-3 text-brand-text dark:text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>GDPR & CCPA Compliant</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityFeatures.map((feature, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-300">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-4 text-brand-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-heading dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-brand-text/80 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
