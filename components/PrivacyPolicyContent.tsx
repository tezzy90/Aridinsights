import React from 'react';
import { EMAILS } from '../constants';

export const PrivacyPolicyContent: React.FC = () => {
  return (
    <div className="text-brand-text dark:text-slate-300 leading-relaxed transition-colors duration-300">
      <p className="mb-6"><strong>Last updated:</strong> <span data-last-updated="policy"></span></p>

      <p className="mb-4">
        This Privacy Policy describes how AridInsights (“we,” “us,” “our”) collects, uses, stores, and discloses
        information when you visit or use our website or services, including any early access forms, beta programs,
        or related tools.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">1. Information We Collect</h2>
      <p className="mb-2">We may collect the following categories of information:</p>
      <ul className="list-disc pl-5 mb-4 space-y-1">
        <li>
          <strong>Information you provide directly:</strong> name, email address, company, role, and any other details
          you choose to submit in forms, surveys, or correspondence.
        </li>
        <li>
          <strong>Usage data and analytics:</strong> IP address, browser type, device information, pages viewed,
          time spent on pages, and interactions (if analytics tools are enabled).
        </li>
        <li>
          <strong>Technical metadata:</strong> timestamps, form submission data, error logs, and similar diagnostic data.
        </li>
      </ul>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">2. How We Collect Information</h2>
      <p className="mb-2">We collect information in several ways:</p>
      <ul className="list-disc pl-5 mb-4 space-y-1">
        <li>When you submit forms (e.g., early access, contact, feedback).</li>
        <li>When you communicate with us via email or other channels.</li>
        <li>Automatically through cookies or similar technologies used on the site, if enabled.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">3. How We Use Information</h2>
      <p className="mb-2">We use the information we collect to:</p>
      <ul className="list-disc pl-5 mb-4 space-y-1">
        <li>Respond to your inquiries and manage early access or beta participation.</li>
        <li>Operate, maintain, and improve our website and services.</li>
        <li>Understand how visitors use the site and inform product development decisions.</li>
        <li>Communicate with you about updates, changes, or opportunities related to AridInsights.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">4. Data Sharing and Third Parties</h2>
      <p className="mb-2">
        We do not sell your personal information. We may share information with:
      </p>
      <ul className="list-disc pl-5 mb-4 space-y-1">
        <li>
          <strong>Service providers</strong> who assist with hosting, analytics, email delivery, or other operational needs,
          under agreements that require them to protect your data.
        </li>
        <li>
          <strong>Legal or regulatory authorities</strong> when required to comply with applicable laws, regulations,
          legal processes, or enforceable governmental requests.
        </li>
      </ul>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">5. Data Retention</h2>
      <p className="mb-4">
        We retain personal information only as long as necessary for the purposes described in this Policy, unless a
        longer period is required or permitted by law. When information is no longer needed, we may delete it or
        de-identify it in accordance with our data retention practices.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">6. Your Rights</h2>
      <p className="mb-4">
        Depending on your jurisdiction, you may have rights regarding your personal information, including the right to
        access, update, or request deletion of your data. To exercise these rights, contact us using the information below.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">7. Cookies and Tracking Technologies</h2>
      <p className="mb-4">
        We may use cookies or similar technologies to collect usage data and improve the site. You can control cookies
        through your browser settings. Disabling cookies may affect certain site functionality.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">8. Security</h2>
      <p className="mb-4">
        We use reasonable technical and organizational measures to help protect personal information. However, no method
        of transmission over the internet or electronic storage is fully secure, and we cannot guarantee absolute security.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">9. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. When we do, we will revise the “Last updated” date at the top
        of this page. Your continued use of the site after changes become effective indicates your acceptance of the updated Policy.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">10. Contact Us</h2>
      <p className="mb-4">
        If you have questions about this Privacy Policy or wish to exercise your data rights, contact us at:
        <br />
        <strong>Email:</strong> {EMAILS.PRIVACY}
      </p>
    </div>
  );
};