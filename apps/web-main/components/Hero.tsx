'use client';

import React from 'react';
import { Button } from './ui/Button';
import { Container } from './ui/Container';
import { WaterBackground } from './WaterBackground';

export const Hero: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative overflow-hidden bg-brand-muted dark:bg-slate-950 transition-colors duration-300 pb-32">
      {/* Animated Water Background */}
      <WaterBackground />

      <Container className="relative z-10 pt-24 pb-32 md:pt-36 md:pb-48 text-center">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white/50 backdrop-blur-sm text-brand-dark border border-white/60 dark:bg-slate-800/50 dark:text-brand-light dark:border-slate-700 mb-8 shadow-sm transition-colors duration-300">
          AridInsights · Florida Water Intelligence
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-brand-heading dark:text-white leading-[1.1] tracking-tight transition-colors duration-300">
          Stop Searching Five Databases <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-dark to-brand-primary dark:from-sky-300 dark:to-cyan-200">
            for Water Data.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-brand-text/80 dark:text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed transition-colors duration-300">
          AridInsights aggregates permit records, jurisdiction boundaries, and regulatory calendars from Florida&apos;s 5 Water Management Districts - organized data for licensed professionals and informed stakeholders.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href="#early-access"
            variant="primary"
            className="w-full sm:w-auto shadow-xl shadow-brand-dark/10 dark:shadow-none"
            onClick={(e) => scrollToSection(e, 'early-access')}
          >
            Get Early Access
          </Button>
          <Button
            href="#platform-overview"
            variant="secondary"
            className="w-full sm:w-auto backdrop-blur-sm bg-white/80 dark:bg-slate-800/80"
            onClick={(e) => scrollToSection(e, 'platform-overview')}
          >
            View Platform Overview
          </Button>
        </div>
      </Container>
    </header>
  );
};