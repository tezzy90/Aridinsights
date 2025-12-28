import { About } from '../components/About';
import { EarlyAccessForm } from '../components/EarlyAccessForm';
import { Features } from '../components/Features';
import { Hero } from '../components/Hero';
import { ProductPreview } from '../components/ProductPreview';
import { ValueProp } from '../components/ValueProp';

export default function Home() {
    return (
        <>
            <Hero />
            <ProductPreview />
            <ValueProp />
            <Features />
            <About />
            <EarlyAccessForm />
        </>
    );
}
