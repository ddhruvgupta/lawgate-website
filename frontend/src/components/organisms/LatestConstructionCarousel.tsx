import { useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button } from '../ui';
import { VideoPlayerModal } from './VideoPlayerModal';
import { getYouTubeThumbnailWithFallback } from '../../utils';

// Types
interface ContentItem {
    id: string;
    type: 'video' | 'article' | 'opinion';
    title: string;
    description: string;
    thumbnail: string;
    url: string;
    date: string;
}

// Constants
const ARTICLE_THUMBNAIL = '/assets/articles_thumbnail.png';

const CONTENT_ITEMS: ContentItem[] = [
    {
        id: '1',
        type: 'video',
        title: 'An Introduction to Claim Management for the Construction Industry',
        description: 'An overview of the arbitration process in construction disputes',
        thumbnail: getYouTubeThumbnailWithFallback('https://www.youtube.com/watch?v=oO_LYayA8nk').src,
        url: 'https://www.youtube.com/watch?v=oO_LYayA8nk',
        date: '2024-01-15',
    },
    {
        id: '2',
        type: 'article',
        title: 'An Introduction to Claim Management for the Construction Industry',
        description: 'Comprehensive guide to effective claim management in construction projects',
        thumbnail: ARTICLE_THUMBNAIL,
        url: '/latest-in-construction/article/claim-management',
        date: '2024-01-15',
    },
    {
        id: '3',
        type: 'article',
        title: 'Essential Guide to Construction Contract Management',
        description: 'Best practices for managing construction contracts effectively',
        thumbnail: ARTICLE_THUMBNAIL,
        url: '/latest-in-construction/article/contract-management',
        date: '2024-01-10',
    },
    {
        id: '4',
        type: 'video',
        title: 'What is Completion of Work in Construction Contracts?',
        description: 'Understanding completion criteria in construction projects',
        thumbnail: getYouTubeThumbnailWithFallback('https://www.youtube.com/watch?v=Pq3676lC1Nw').src,
        url: 'https://www.youtube.com/watch?v=Pq3676lC1Nw',
        date: '2023-07-22',
    },
    {
        id: '5',
        type: 'video',
        title: 'Discussion on Contract Management at CIAC',
        description: 'Expert panel discussion on contract management best practices',
        thumbnail: getYouTubeThumbnailWithFallback('https://www.youtube.com/watch?v=sPV9b10X6eU').src,
        url: 'https://www.youtube.com/watch?v=sPV9b10X6eU',
        date: '2023-07-22',
    },
    {
        id: '6',
        type: 'article',
        title: 'Understanding the Arbitration Process in Construction Disputes',
        description: 'Complete guide to arbitration in construction law',
        thumbnail: ARTICLE_THUMBNAIL,
        url: '/latest-in-construction/article/arbitration-process',
        date: '2024-01-05',
    },
];

const SWIPER_CONFIG = {
    spaceBetween: 30,
    slidesPerView: 1,
    breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    },
} as const;

const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225"%3E%3Crect fill="%23f3f4f6" width="400" height="225"/%3E%3Ctext fill="%236b7280" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E%3C/text%3E%3C/svg%3E';

// Utility functions
const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

// Sub-components
interface ContentCardProps {
    item: ContentItem;
    onVideoClick: (item: ContentItem) => void;
}

const ContentCard = ({ item, onVideoClick }: ContentCardProps) => {
    const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = PLACEHOLDER_IMAGE;
    }, []);

    const handleArticleClick = useCallback(() => {
        window.location.href = item.url;
    }, [item.url]);

    const handleVideoClick = useCallback(() => {
        onVideoClick(item);
    }, [item, onVideoClick]);

    return (
        <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
                <div className="relative aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                    <img
                        src={item.thumbnail}
                        alt={item.title}
                        className={`w-full h-full ${item.type === 'video' ? 'object-cover' : 'object-contain'}`}
                        onError={handleImageError}
                    />

                    {item.type === 'video' && (
                        <button
                            onClick={handleVideoClick}
                            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
                            aria-label={`Play ${item.title}`}
                        >
                            <div className="w-16 h-16 rounded-full bg-secondary/90 group-hover:bg-secondary flex items-center justify-center transition-all group-hover:scale-110">
                                <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                            </div>
                        </button>
                    )}

                    <div className="absolute top-2 right-2">
                        <span className="px-3 py-1 bg-secondary text-primary-dark text-xs font-semibold rounded-full capitalize">
                            {item.type}
                        </span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6">
                <CardTitle className="text-xl mb-2 line-clamp-2">
                    {item.title}
                </CardTitle>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {item.description}
                </p>

                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                        {formatDate(item.date)}
                    </span>
                    {item.type !== 'video' && (
                        <Button variant="outline" size="sm" onClick={handleArticleClick}>
                            Read More
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

// Main component
export const LatestConstructionCarousel = () => {
    const [selectedVideo, setSelectedVideo] = useState<ContentItem | null>(null);

    const handleVideoClick = useCallback((item: ContentItem) => {
        setSelectedVideo(item);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedVideo(null);
    }, []);

    const handleViewAll = useCallback(() => {
        window.location.href = '/latest-in-construction';
    }, []);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-heading font-bold text-primary mb-4">
                        Latest in Construction Law
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Stay updated with the latest insights, articles, and videos on construction arbitration
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        {...SWIPER_CONFIG}
                        navigation={{
                            nextEl: '.latest-swiper-button-next',
                            prevEl: '.latest-swiper-button-prev',
                        }}
                        pagination={{
                            clickable: true,
                            el: '.latest-swiper-pagination',
                        }}
                    >
                        {CONTENT_ITEMS.map((item) => (
                            <SwiperSlide key={item.id}>
                                <ContentCard item={item} onVideoClick={handleVideoClick} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Buttons */}
                    <button
                        className="latest-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-10 h-10 flex items-center justify-center bg-primary hover:bg-primary-light text-white rounded-full transition-all shadow-lg"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        className="latest-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-10 h-10 flex items-center justify-center bg-primary hover:bg-primary-light text-white rounded-full transition-all shadow-lg"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Pagination */}
                    <div className="latest-swiper-pagination flex justify-center gap-2 mt-8" />
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Button variant="primary" size="lg" onClick={handleViewAll}>
                        View All Content
                    </Button>
                </div>
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <VideoPlayerModal
                    url={selectedVideo.url}
                    title={selectedVideo.title}
                    isOpen={!!selectedVideo}
                    onClose={handleCloseModal}
                />
            )}
        </section>
    );
};
