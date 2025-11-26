import React from 'react';
import { Container } from './ui/Container';

export const About: React.FC = () => {
  return (
    <section id="about" className="dark:bg-slate-950 transition-colors duration-300">
      <Container className="!pt-0">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-brand-dark dark:text-white transition-colors duration-300">About AridInsights</h2>
        <div className="space-y-4 text-brand-text dark:text-slate-300 leading-relaxed transition-colors duration-300">
          <p>
            AridInsights builds groundwater compliance infrastructure for regions where regulation is fragmented
            and data is inconsistent. Texas is our starting point. The state’s Groundwater Conservation Districts
            create a complex, district-by-district compliance landscape that slows down consultants, operators,
            landowners, and public agencies. We focus on reducing that friction through structured data,
            automated workflows, and a platform built for accuracy and accountability.
          </p>
          <p>
            AridInsights operates as a division and DBA of <strong>321Work Inc.</strong>, a Florida S corporation.
            321Work is the platform company behind ventures that tackle real operational problems in regulated environments.
            AridInsights is its water-intelligence arm.
          </p>
          <p>
            Based in Orlando, Florida, we work at the intersection of water risk, regulation, and technology.
            Starting in Texas is a strategic choice: its regulatory structure allows us to build a clean, repeatable
            backbone for groundwater workflows. Over time, the lessons we learn in Texas will support expansion into
            other regions, including Florida, where stronger visibility and compliance tools are urgently needed.
          </p>
          <p>
            Our view is simple: everyone benefits when groundwater governance is transparent, consistent,
            and easy to follow. AridInsights exists to make that practical—beginning in Texas and expanding
            wherever fragmented water governance creates risk and opportunity.
          </p>
        </div>
      </Container>
    </section>
  );
};