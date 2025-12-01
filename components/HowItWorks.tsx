import React from 'react';
import { Container } from './ui/Container';
import { HOW_IT_WORKS_STEPS } from '../constants';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="bg-white dark:bg-slate-950 transition-colors duration-300">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-brand-heading dark:text-white tracking-tight transition-colors duration-300">How WellFlow Works</h2>
          <p className="text-lg text-brand-text/80 dark:text-slate-300 leading-relaxed transition-colors duration-300">
            WellFlow is the workflow engine at the center of our groundwater compliance product.
            It reduces manual research, standardizes information across 98+ Texas districts,
            and makes groundwater compliance more predictable—whether you're a consultant managing multiple clients,
            an operator tracking permits, or a public agency overseeing districts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div
              key={step.number}
              className="relative p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg dark:hover:shadow-slate-800 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 -mt-3 -mr-3 w-12 h-12 bg-brand-light dark:bg-slate-800 text-brand-dark dark:text-brand-primary font-bold rounded-xl flex items-center justify-center shadow-sm border border-brand-primary/10 dark:border-slate-700 text-xl z-10 transition-colors duration-300">
                {step.number}
              </div>

              <h3 className="text-xl font-bold mb-4 text-brand-heading dark:text-white pr-8 transition-colors duration-300">{step.title}</h3>
              <p className="text-brand-text/80 dark:text-slate-400 leading-relaxed transition-colors duration-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};