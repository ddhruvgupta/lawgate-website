import { HeroCarousel } from '../organisms/HeroCarousel';
import { SpecialtiesBanner } from '../organisms/SpecialtiesBanner';
import { AboutSection } from '../organisms/AboutSection';
import { LatestConstructionCarousel } from '../organisms/LatestConstructionCarousel';
import { EventsSection } from '../organisms/EventsSection';

export const HomePage = () => {
    return (
        <div className="pt-20">
            <HeroCarousel />
            <SpecialtiesBanner />
            <AboutSection />
            <LatestConstructionCarousel />
            <EventsSection />
        </div>
    );
};
