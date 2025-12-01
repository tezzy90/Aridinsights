import React from 'react';
import { Container } from './ui/Container';
import { SectionHeading } from './ui/SectionHeading';

const features = [
  {
    title: 'Unified GIS Mapping',
    description: 'Visualize well locations against GCD boundaries, management zones, and aquifers in a single interactive map layer.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    title: 'Smart Deadline Tracking',
    description: 'Never miss a production report or renewal. The system tracks different rules for 98+ districts and alerts you automatically.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Automated Form Generation',
    description: 'Stop re-typing data. Generate district-specific PDF applications populated with your stored project data in one click.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Portfolio Management',
    description: 'Manage unlimited wells and clients. Filter by status, district, or owner to get a high-level view of your compliance risk.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: 'Secure Document Vault',
    description: 'Store permits, logs, and correspondence securely linked to each well. Audit-ready and accessible from anywhere.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: 'Team Collaboration',
    description: 'Assign tasks to team members. Track who filed what and when, ensuring accountability across your organization.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export const Features: React.FC = () => {
  return (
    <section className="bg-brand-muted dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <Container>
        <SectionHeading
          title="WellFlow: Built for the Regulatory Professional"
          subtitle="Stop managing groundwater compliance in spreadsheets. Our first product provides specialized tools for consultants, operators, and landowners managing Texas GCD compliance at scale."
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