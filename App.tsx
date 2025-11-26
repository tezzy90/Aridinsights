import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LegalPage from './pages/LegalPage';
import { PrivacyPolicyContent } from './components/PrivacyPolicyContent';
import { TermsOfServiceContent } from './components/TermsOfServiceContent';
import { CookiePolicyContent } from './components/CookiePolicyContent';
import { DisclaimerContent } from './components/DisclaimerContent';
import { Footer } from './components/Footer';
import { ThemeProvider } from './components/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { POLICY_LAST_UPDATED } from './constants';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Handle dynamic date replacements
const DynamicDates = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Helper to update elements
    const updateDates = () => {
      // Update Policy Last Updated Date
      const policyElements = document.querySelectorAll('[data-last-updated="policy"]');
      policyElements.forEach(el => {
        el.textContent = POLICY_LAST_UPDATED;
      });

      // Update Today's Date
      const todayElements = document.querySelectorAll('[data-date="today"]');
      const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      todayElements.forEach(el => {
        el.textContent = today;
      });
    };

    // Run immediately
    updateDates();

    // Small timeout to ensure DOM is ready after route transition if needed
    const timer = setTimeout(updateDates, 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <DynamicDates />
        <div className="min-h-screen flex flex-col font-sans bg-brand-muted dark:bg-slate-950 transition-colors duration-300">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route 
                path="/privacy-policy" 
                element={
                  <LegalPage title="Privacy Policy">
                    <PrivacyPolicyContent />
                  </LegalPage>
                } 
              />
              <Route 
                path="/terms-of-service" 
                element={
                  <LegalPage title="Terms of Service">
                    <TermsOfServiceContent />
                  </LegalPage>
                } 
              />
              <Route 
                path="/cookie-policy" 
                element={
                  <LegalPage title="Cookie Policy">
                    <CookiePolicyContent />
                  </LegalPage>
                } 
              />
              <Route 
                path="/disclaimer" 
                element={
                  <LegalPage title="Disclaimer">
                    <DisclaimerContent />
                  </LegalPage>
                } 
              />
            </Routes>
          </main>
          <Footer />
          <ThemeToggle />
        </div>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;