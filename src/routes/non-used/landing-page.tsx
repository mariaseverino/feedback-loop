import type { Route } from './+types/landing-page';
import FeatureSection from 'src/components/feature-section';
import ResourseSection from 'src/components/resourse-section';
import PriceSection from 'src/components/price-section';
import CallToAction from 'src/components/call-to-action';
import FaqSection from 'src/components/faq-section';
import HeroSection from 'src/components/hero-section';
import Footer from 'src/components/footer';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'FeedbackLoop' },
        { name: 'description', content: 'Welcome to React Router!' },
    ];
}

// export async function action({ request }: { request: Request }) {
//     const session = await getSession(request.headers.get('Cookie'));

//     session.set('user', {
//         id: '1',
//         name: 'Maria Severino',
//         email: 'maria@email.com',
//         role: 'tenant',
//         organization: 'Motiro',
//     });

//     return redirect('/dashboard', {
//         headers: {
//             'Set-Cookie': await commitSession(session),
//         },
//     });
// }

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
