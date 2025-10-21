import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Button } from '../ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSlide {
    id: string;
    image: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
}

const slides: CarouselSlide[] = [
    {
        id: '1',
        image: '/assets/hero-1.jpg',
        title: 'Expert Construction Arbitration',
        subtitle: '32+ years of techno-legal expertise in dispute resolution',
        ctaText: 'Learn About Us',
        ctaLink: '#about',
    },
    {
        id: '2',
        image: '/assets/hero-2.jpeg',
        title: 'Infrastructure Dispute Resolution',
        subtitle: 'Specialized knowledge in engineering and construction law',
        ctaText: 'Our Services',
        ctaLink: '#services',
    },
    {
        id: '3',
        image: '/assets/hero-3.png',
        title: 'Trusted Legal Counsel',
        subtitle: 'Decades of experience in complex construction disputes',
        ctaText: 'Contact Us',
        ctaLink: '/contact',
    },
];

export const HeroCarousel = () => {
    return (
        <div className="relative w-full h-[600px] bg-gray-900">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                    nextEl: '.hero-swiper-button-next',
                    prevEl: '.hero-swiper-button-prev',
                }}
                pagination={{
                    clickable: true,
                    el: '.hero-swiper-pagination',
                }}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: true,
                }}
                loop={true}
                className="h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-full">
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                }}
                            >
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/50" />
                            </div>

                            {/* Content */}
                            <div className="relative h-full flex items-center">
                                <div className="container mx-auto px-4">
                                    <div className="max-w-3xl text-white">
                                        <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4 text-white">
                                            {slide.title}
                                        </h1>
                                        <p className="text-xl md:text-2xl mb-8 text-gray-200">
                                            {slide.subtitle}
                                        </p>
                                        <Button
                                            size="lg"
                                            variant="secondary"
                                            onClick={() => {
                                                if (slide.ctaLink.startsWith('#')) {
                                                    document.querySelector(slide.ctaLink)?.scrollIntoView({ behavior: 'smooth' });
                                                } else {
                                                    window.location.href = slide.ctaLink;
                                                }
                                            }}
                                        >
                                            {slide.ctaText}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button
                className="hero-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
                className="hero-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Custom Pagination */}
            <div className="hero-swiper-pagination absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10"></div>
        </div>
    );
};
