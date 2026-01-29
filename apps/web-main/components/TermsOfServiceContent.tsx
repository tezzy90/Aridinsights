import React from 'react';
import { EMAILS } from '../constants';

export const TermsOfServiceContent: React.FC = () => {
  return (
    <div className="text-brand-text dark:text-slate-300 leading-relaxed transition-colors duration-300">
      <p className="mb-6"><strong>Last updated:</strong> <span data-last-updated="policy"></span></p>

      <p className="mb-4">
        These Terms of Service (“Terms”) govern your access to and use of the website at aridinsights.com
        and any related services provided by AridInsights (“we,” “us,” “our”). By accessing or using the site
        or services, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the site
        or services.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">1. Use of the Service</h2>
      <p className="mb-2">
        You agree to use the site and services only for lawful purposes and in accordance with applicable laws and regulations.
        You agree not to:
      </p>
      <ul className="list-disc pl-5 mb-4 space-y-1">
        <li>Misuse the site or attempt to interfere with its proper functioning.</li>
        <li>Reverse engineer, decompile, or attempt to derive the source code of any part of the services.</li>
        <li>Access the site or services for purposes of building a competing product or service.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">2. Intellectual Property</h2>
      <p className="mb-4">
        All content, software, logos, text, graphics, and other materials on the site are owned by or licensed to
        AridInsights / 321Work Inc., unless otherwise indicated. We reserve all rights not expressly granted in these Terms.
        You may not reproduce, distribute, modify, or create derivative works of any content without our prior written consent.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">3. User Content and Responsibilities</h2>
      <p className="mb-2">
        If you submit information, feedback, or other content to us, you are responsible for ensuring that such content:
      </p>
      <ul className="list-disc pl-5 mb-4 space-y-1">
        <li>Is accurate, complete, and lawful.</li>
        <li>Does not infringe the rights of any third parties.</li>
        <li>Does not include sensitive or confidential information unless explicitly requested in a secure channel.</li>
      </ul>
      <p className="mb-4">
        You grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and analyze anonymized or aggregated
        forms of your submitted data for purposes of improving the site and services.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">4. No Professional Advice</h2>
      <p className="mb-4">
        The information and tools provided through the site are for informational and operational purposes only.
        They do not constitute legal, engineering, or professional advice. You should consult qualified professionals
        before making decisions that carry legal, financial, or operational consequences.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">5. Disclaimer of Warranties</h2>
      <p className="mb-4">
        The site and services are provided on an “as is” and “as available” basis. To the fullest extent permitted by law,
        we disclaim all warranties of any kind, whether express or implied, including, but not limited to, implied warranties
        of merchantability, fitness for a particular purpose, and non-infringement.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">6. Limitation of Liability</h2>
      <p className="mb-2">
        To the maximum extent permitted by law, AridInsights and 321Work Inc. will not be liable for any indirect,
        incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred
        directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
      </p>
      <ul className="list-disc pl-5 mb-4 space-y-1">
        <li>Your access to or use of, or inability to access or use, the site or services.</li>
        <li>Any conduct or content of any third party on the site.</li>
        <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">7. Changes to the Service and Terms</h2>
      <p className="mb-4">
        We may modify or discontinue the site or services at any time, with or without notice. We may also update these Terms
        from time to time. When we make changes, we will revise the “Last updated” date. Your continued use of the site or
        services after the changes take effect constitutes your acceptance of the updated Terms.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">8. Governing Law</h2>
      <p className="mb-4">
        These Terms are governed by the laws of the State of Florida, without regard to its conflict-of-law principles.
        Any disputes arising from or relating to these Terms or the use of the site or services shall be brought in the
        state or federal courts located in Florida, and you agree to submit to the personal jurisdiction of such courts.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">9. Contact</h2>
      <p className="mb-4">
        If you have questions about these Terms, contact us at:
        <br />
        <strong>Email:</strong> {EMAILS.LEGAL}
      </p>
    </div>
  );
};