import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './ui/Container';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-heading text-slate-400 py-12 border-t border-brand-heading">
      <Container className="!py-0">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm font-medium">
            <span className="text-white">AridInsights</span> · Water Intelligence
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-xs text-slate-500">
          © {currentYear} AridInsights, a division and DBA of 321Work Inc. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};