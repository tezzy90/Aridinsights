import React from 'react';
import { Hero } from '../components/Hero';
import { ProductPreview } from '../components/ProductPreview';
import { WhyTexas } from '../components/WhyTexas';
import { Features } from '../components/Features';
import { HowItWorks } from '../components/HowItWorks';
import { FAQ } from '../components/FAQ';
import { About } from '../components/About';
import { EarlyAccessForm } from '../components/EarlyAccessForm';

const LandingPage: React.FC = () => {
  return (
    <>
      <Hero />
      <ProductPreview />
      <WhyTexas />
      <Features />
      <HowItWorks />
      <About />
      <FAQ />
      <EarlyAccessForm />
    </>
  );
};

export default LandingPage;