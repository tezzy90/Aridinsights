import React from 'react';
import { Container } from './ui/Container';

export const About: React.FC = () => {
  return (
    <section id="about" className="dark:bg-slate-950 transition-colors duration-300">
      <Container className="!pt-0">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-brand-dark dark:text-white transition-colors duration-300">About AridInsights</h2>
        <div className="space-y-4 text-brand-text dark:text-slate-300 leading-relaxed transition-colors duration-300">
          <p>
            <strong>AridInsights is a water intelligence platform</strong> built for compliance-driven markets where regulation is fragmented and data is difficult to access.
          </p>
          <p>
            Florida's 5 Water Management Districts (WMDs) manage the most complex hydrological system in the world. Yet, the data remains siloed in legacy databases (DBHydro, E-Permitting),
            making it nearly impossible for developers and engineers to get a clear picture of water risk.
          </p>
          <p>
            AridInsights operates as a division of <strong>321Work Inc.</strong> We are building the infrastructure to make this data transparent, consistent, and actionable.
          </p>
          <p>
            Our mission: Transform raw government data into a "Carfax for Land"—giving every stakeholder instant visibility into flood zones, aquifer capacity, and regulatory constraints.
          </p>
        </div>
      </Container>
    </section>
  );
};