import React from 'react';
import { Container } from './ui/Container';
import { SectionHeading } from './ui/SectionHeading';

const features = [
  {
    title: 'Regulatory Data Summary',
    description: 'Displays permit history, FDEP jurisdiction boundaries, and district allocation zones for any Florida parcel - licensed professionals interpret data for project evaluation.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Permit Management Dashboard',
    description: 'Tracks renewal dates and district announcements - compliance officers determine compliance status. No more spreadsheet management for critical dates.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Data Firehose',
    description: 'We aggregate DBHydro (SFWMD) and E-Permitting data into unified API format - licensed professionals validate data quality for their projects.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
];

export const Features: React.FC = () => {
  return (
    <section className="bg-brand-muted dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <Container>
        <SectionHeading
          title="The Intelligence Grid"
          subtitle="Stop managing water risk in spreadsheets. We provide specialized tools for Developers, Agricultural Operators, and Municipalities navigating the 5 Florida Water Management Districts."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-brand-light dark:bg-brand-primary/20 text-brand-primary dark:text-brand-light rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-brand-heading dark:text-white mb-3">{feature.title}</h3>
              <p className="text-brand-text/80 dark:text-slate-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};