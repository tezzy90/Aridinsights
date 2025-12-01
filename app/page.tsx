import { Hero } from '../components/Hero';
import { ProductPreview } from '../components/ProductPreview';
import { WhyTexas } from '../components/WhyTexas';
import { Features } from '../components/Features';
import { Security } from '../components/Security';
import { Integrations } from '../components/Integrations';
import { HowItWorks } from '../components/HowItWorks';
import { FAQ } from '../components/FAQ';
import { About } from '../components/About';
import { EarlyAccessForm } from '../components/EarlyAccessForm';

export default function Home() {
    return (
        <>
            <Hero />
            <ProductPreview />
            <WhyTexas />
            <Features />
            <Security />
            <Integrations />
            <HowItWorks />
            <About />
            <FAQ />
            <EarlyAccessForm />
        </>
    );
}
