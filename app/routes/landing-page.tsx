import type { Route } from './+types/landing-page';
import FeatureSection from '~/components/feature-section';
import ResourseSection from '~/components/resourse-section';
import PriceSection from '~/components/price-section';
import CallToAction from '~/components/call-to-action';
import FaqSection from '~/components/faq-section';
import HeroSection from '~/components/hero-section';
import Footer from '~/components/footer';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'FeedbackLoop' },
        { name: 'description', content: 'Welcome to React Router!' },
    ];
}

export default function LandingPage() {
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
