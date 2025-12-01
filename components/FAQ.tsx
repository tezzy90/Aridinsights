import React from 'react';
import { Container } from './ui/Container';
import { SectionHeading } from './ui/SectionHeading';

const faqs = [
  {
    question: "Which Texas districts do you support?",
    answer: "We are rolling out support starting with the Hill Country and Trinity Aquifer regions (e.g., HTGCD, BSEACD, Middle Trinity). We add new district rule-sets based on user demand. If your active districts aren't listed yet, you can request priority access."
  },
  {
    question: "Is my client data secure?",
    answer: "Absolutely. We use enterprise-grade encryption for all data at rest and in transit. Your proprietary client data is isolated and never shared with third parties or other users. We treat data privacy as a critical compliance requirement."
  },
  {
    question: "What does 'Early Access' mean?",
    answer: "Early Access means the platform is functional but we are still refining features. Partners who join now get locked-in early pricing and direct influence over the roadmap (e.g., asking for specific permit types or district forms)."
  },
  {
    question: "Do you offer API access?",
    answer: "API access for integration with internal GIS or SCADA systems is on our roadmap for the Enterprise tier. If this is a critical need, please mention it in your access request."
  },
  {
    question: "Is AridInsights only building tools for Texas groundwater?",
    answer: "Texas groundwater compliance is our validation market and current focus. We're testing whether fragmented regulatory landscapes create repeatable business opportunities in water intelligence. If our Texas validation succeeds, we'll expand to corporate water risk reporting (ESG compliance), municipal infrastructure finance, and other fragmented water markets. WellFlow will remain our strongest product."
  },
];

export const FAQ: React.FC = () => {
  return (
    <section className="bg-white dark:bg-slate-950 transition-colors duration-300 border-t border-slate-200 dark:border-slate-800">
      <Container>
        <SectionHeading title="Common Questions" />

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-slate-100 dark:border-slate-800 pb-6 last:border-0">
              <h3 className="text-lg font-semibold text-brand-heading dark:text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-brand-text/80 dark:text-slate-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};