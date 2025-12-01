import React from 'react';
import { Container } from './ui/Container';

export const About: React.FC = () => {
  return (
    <section id="about" className="dark:bg-slate-950 transition-colors duration-300">
      <Container className="!pt-0">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-brand-dark dark:text-white transition-colors duration-300">About AridInsights</h2>
        <div className="space-y-4 text-brand-text dark:text-slate-300 leading-relaxed transition-colors duration-300">
          <p>
            <strong>AridInsights is a water intelligence platform</strong> built for compliance-driven industries where regulation is fragmented and data is inconsistent.
          </p>
          <p>
            Our first product, <strong>WellFlow</strong>, solves groundwater compliance in Texas. The state's 98 Groundwater Conservation Districts
            create a complex, district-by-district compliance landscape that slows down consultants, operators, landowners, and public agencies.
            WellFlow reduces that friction through structured data, automated workflows, and tools built for accuracy and accountability.
          </p>
          <p>
            AridInsights operates as a division and DBA of <strong>321Work Inc.</strong>, a Florida S corporation.
            321Work is the platform company behind ventures that tackle real operational problems in regulated environments.
            AridInsights is its water-intelligence arm.
          </p>
          <p>
            Our long-term platform vision extends beyond groundwater. We're building infrastructure for corporate water risk reporting (ESG compliance),
            municipal infrastructure finance, and climate resilience intelligence—anywhere regulatory fragmentation creates operational friction.
          </p>
          <p>
            Based in Orlando, Florida, we work at the intersection of water risk, regulation, and technology. Texas is our validation market
            and strongest starting point. Over time, the lessons we learn in Texas will scale to other fragmented water markets and regulatory domains.
          </p>
          <p>
            Our core belief: everyone benefits when fragmented water governance becomes transparent, consistent, and easy to follow.
            AridInsights exists to build that infrastructure—beginning with Texas groundwater and expanding wherever water risk creates opportunity.
          </p>
        </div>
      </Container>
    </section>
  );
};