import React from 'react';
import { EMAILS } from '../constants';

export const CookiePolicyContent: React.FC = () => {
  return (
    <div className="text-brand-text dark:text-slate-300 leading-relaxed transition-colors duration-300">
      <p className="mb-6"><strong>Last updated:</strong> <span data-last-updated="policy"></span></p>

      <p className="mb-4">
        This Cookie Policy explains how AridInsights (“we,” “us,” “our”) uses cookies and similar technologies on
        aridinsights.com and related services.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">1. What Are Cookies?</h2>
      <p className="mb-4">
        Cookies are small text files placed on your device when you visit a website.
        They are widely used to make websites work, improve user experience, and provide usage information.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">2. Types of Cookies We May Use</h2>
      <ul className="list-disc pl-5 mb-4 space-y-1">
        <li>
          <strong>Essential cookies:</strong> Needed for the website to function, such as maintaining session state
          or handling form submissions.
        </li>
        <li>
          <strong>Analytics cookies:</strong> Help us understand how visitors use the site,
          such as which pages are visited and how long users stay on the site (if analytics are enabled).
        </li>
      </ul>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">3. Why We Use Cookies</h2>
      <p className="mb-2">We may use cookies to:</p>
      <ul className="list-disc pl-5 mb-4 space-y-1">
        <li>Keep the site running securely and reliably.</li>
        <li>Remember certain preferences where appropriate.</li>
        <li>Analyze site traffic and usage trends to improve our services.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">4. Your Choices</h2>
      <p className="mb-4">
        Most web browsers allow you to manage or disable cookies through settings.
        If you choose to disable cookies, some features of the site may not function as intended.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">5. Updates to This Policy</h2>
      <p className="mb-4">
        We may update this Cookie Policy from time to time. Changes will be posted on this page with a revised “Last updated” date.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">6. Contact</h2>
      <p className="mb-4">
        If you have questions about this Cookie Policy, contact us at:
        <br />
        <strong>Email:</strong> {EMAILS.PRIVACY}
      </p>
    </div>
  );
};