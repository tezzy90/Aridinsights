import { Hero } from '../components/Hero';
import { ValueProp } from '../components/ValueProp';
import { Features } from '../components/Features';
import { About } from '../components/About';
import { EarlyAccessForm } from '../components/EarlyAccessForm';

export default function Home() {
    return (
        <>
            <Hero />
            <ValueProp />
            <Features />
            <About />
            <EarlyAccessForm />
        </>
    );
}
