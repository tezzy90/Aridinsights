import React from 'react';
import { Container } from './ui/Container';

export const WhyTexas: React.FC = () => {
  return (
    <section id="why-texas" className="bg-brand-muted dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <Container>
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-brand-heading dark:text-white tracking-tight transition-colors duration-300">Why Texas First?</h2>
          <p className="text-lg text-brand-text/90 dark:text-slate-300 leading-relaxed transition-colors duration-300">
            Texas presents one of the clearest groundwater challenges in the country.
            With over ninety local Groundwater Conservation Districts (GCDs), the regulatory landscape is fragmented, creating immense pressure on compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1 */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-card dark:shadow-none hover:shadow-lg dark:hover:bg-slate-750 transition-all duration-300 border border-slate-100 dark:border-slate-700 group">
            <div className="w-12 h-12 bg-blue-50 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-6 text-brand-dark dark:text-brand-light group-hover:bg-brand-dark group-hover:text-white dark:group-hover:bg-brand-primary transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-brand-heading dark:text-white transition-colors duration-300">Predictable Complexity</h3>
            <p className="text-brand-text dark:text-slate-300 leading-relaxed transition-colors duration-300">
              Districts publish clear rules and update them on a steady cadence. 
              This gives us a solid basis for standardization without needing to change the law.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-card dark:shadow-none hover:shadow-lg dark:hover:bg-slate-750 transition-all duration-300 border border-slate-100 dark:border-slate-700 group">
            <div className="w-12 h-12 bg-blue-50 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-6 text-brand-dark dark:text-brand-light group-hover:bg-brand-dark group-hover:text-white dark:group-hover:bg-brand-primary transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-brand-heading dark:text-white transition-colors duration-300">Market Scale</h3>
            <p className="text-brand-text dark:text-slate-300 leading-relaxed transition-colors duration-300">
              Consultants handle hundreds of wells, permits, notices, and transfers every year. 
              Small manual errors create outsized delays in this high-volume environment.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-card dark:shadow-none hover:shadow-lg dark:hover:bg-slate-750 transition-all duration-300 border border-slate-100 dark:border-slate-700 group">
            <div className="w-12 h-12 bg-blue-50 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-6 text-brand-dark dark:text-brand-light group-hover:bg-brand-dark group-hover:text-white dark:group-hover:bg-brand-primary transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-brand-heading dark:text-white transition-colors duration-300">Solvable Data Gap</h3>
            <p className="text-brand-text dark:text-slate-300 leading-relaxed transition-colors duration-300">
              Inconsistent forms and district-specific workflows can be mapped into a single structured framework, reducing friction instantly.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-card dark:shadow-none hover:shadow-lg dark:hover:bg-slate-750 transition-all duration-300 border border-slate-100 dark:border-slate-700 group">
             <div className="w-12 h-12 bg-blue-50 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-6 text-brand-dark dark:text-brand-light group-hover:bg-brand-dark group-hover:text-white dark:group-hover:bg-brand-primary transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-brand-heading dark:text-white transition-colors duration-300">Rising Risk</h3>
            <p className="text-brand-text dark:text-slate-300 leading-relaxed transition-colors duration-300">
              Growth, water stress, and regional disputes are pushing toward stronger oversight. 
              Consistent documentation is no longer optional.
            </p>
          </div>
        </div>

        <div className="mt-12 p-6 bg-brand-dark/5 dark:bg-slate-800 rounded-xl border border-brand-dark/10 dark:border-slate-700">
           <p className="text-brand-dark dark:text-brand-light font-medium text-center max-w-4xl mx-auto transition-colors duration-300">
            "Texas gives us the right conditions to build durable infrastructure.
            What we build here can scale to other fragmented groundwater states and regions like Florida where pressure continues to rise."
          </p>
        </div>
      </Container>
    </section>
  );
};