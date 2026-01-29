import React from 'react';
import { EMAILS } from '../constants';

export const DisclaimerContent: React.FC = () => {
  return (
    <div className="text-brand-text dark:text-slate-300 leading-relaxed transition-colors duration-300">
      <p className="mb-6"><strong>Last updated:</strong> <span data-last-updated="policy"></span></p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">1. Informational Purposes Only</h2>
      <p className="mb-4">
        The content provided on aridinsights.com and any related materials is for informational purposes only.
        It does not constitute legal, engineering, financial, or professional advice.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">2. No Guarantee of Outcomes</h2>
      <p className="mb-4">
        While our tools are designed to support groundwater compliance workflows, we do not guarantee that use of the site
        or services will result in any specific regulatory outcome, permit approval, or decision by a Groundwater Conservation
        District or other regulatory body.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">3. External Links</h2>
      <p className="mb-4">
        The site may contain links to external websites or resources.
        AridInsights is not responsible for the content, accuracy, or policies of any third-party sites.
        Accessing those sites is at your own risk and subject to their terms and policies.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">4. Limitation of Liability</h2>
      <p className="mb-4">
        To the fullest extent permitted by law, AridInsights and 321Work Inc. shall not be liable for any direct or indirect
        losses or damages arising from your use of, or inability to use, the site or services, or reliance on any content
        provided via the site.
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mt-8 mb-3 transition-colors duration-300">5. Contact</h2>
      <p className="mb-4">
        If you have questions about this Disclaimer, contact us at:
        <br />
        <strong>Email:</strong> {EMAILS.LEGAL}
      </p>
    </div>
  );
};