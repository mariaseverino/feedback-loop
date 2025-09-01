import { createFileRoute } from '@tanstack/react-router';
import CallToAction from '~/components/call-to-action';
import FaqSection from '~/components/faq-section';
import FeatureSection from '~/components/feature-section';
import Footer from '~/components/footer';
import HeroSection from '~/components/hero-section';
import PriceSection from '~/components/price-section';
import ResourseSection from '~/components/resourse-section';

export const Route = createFileRoute('/')({
    component: Index,
});

function Index() {
    return (
        <div className="w-full flex flex-col font-sans">
            <HeroSection />
            <FeatureSection />
            <ResourseSection />
            <PriceSection />
            <CallToAction />
            <FaqSection />
            <Footer />
        </div>
    );
}
