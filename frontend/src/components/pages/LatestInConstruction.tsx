import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, Button } from '../ui';
import { Calendar, Clock, Play } from 'lucide-react';
import { articles } from '../../data/articles';
import { VideoPlayerModal } from '../organisms/VideoPlayerModal';
import { getYouTubeThumbnailWithFallback, handleYouTubeThumbnailError } from '../../utils';

type FilterType = 'all' | 'video' | 'article' | 'opinion';

interface ContentItem {
    id: string;
    type: 'video' | 'article' | 'opinion';
    title: string;
    description: string;
    thumbnail: string;
    url: string;
    date: string;
    readTime?: string;
}

// Combine articles with video content
const allContent: ContentItem[] = [
    // Videos
    {
        id: 'video-1',
        type: 'video',
        title: 'An Introduction to Claim Management for the Construction Industry',
        description: 'An overview of the arbitration process in construction disputes',
        thumbnail: getYouTubeThumbnailWithFallback('https://www.youtube.com/watch?v=oO_LYayA8nk').src,
        url: 'https://www.youtube.com/watch?v=oO_LYayA8nk',
        date: '2024-01-15',
    },
    {
        id: 'video-2',
        type: 'video',
        title: 'What is Completion of Work in Construction Contracts?',
        description: 'Understanding completion criteria in construction projects',
        thumbnail: getYouTubeThumbnailWithFallback('https://www.youtube.com/watch?v=Pq3676lC1Nw').src,
        url: 'https://www.youtube.com/watch?v=Pq3676lC1Nw',
        date: '2023-07-22',
    },
    {
        id: 'video-3',
        type: 'video',
        title: 'Discussion on Contract Management at CIAC',
        description: 'Expert panel discussion on contract management best practices',
        thumbnail: getYouTubeThumbnailWithFallback('https://www.youtube.com/watch?v=sPV9b10X6eU').src,
        url: 'https://www.youtube.com/watch?v=sPV9b10X6eU',
        date: '2023-07-22',
    },
    // Articles
    ...articles.map(article => ({
        id: article.id,
        type: 'article' as const,
        title: article.title,
        description: article.excerpt,
        thumbnail: article.thumbnail,
        url: `/latest-in-construction/article/${article.id}`,
        date: article.date,
        readTime: article.readTime,
    })),
];

export const LatestInConstruction = () => {
    const [filter, setFilter] = useState<FilterType>('all');
    const [selectedVideo, setSelectedVideo] = useState<ContentItem | null>(null);

    const filteredContent = filter === 'all'
        ? allContent
        : allContent.filter(item => item.type === filter);

    // Sort by date (newest first)
    const sortedContent = [...filteredContent].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="pt-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
                        Latest in Construction Law
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Stay updated with the latest insights, videos, articles, and opinion pieces on construction arbitration and dispute resolution
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <Button
                        variant={filter === 'all' ? 'primary' : 'outline'}
                        onClick={() => setFilter('all')}
                        size="lg"
                    >
                        All Content
                    </Button>
                    <Button
                        variant={filter === 'video' ? 'primary' : 'outline'}
                        onClick={() => setFilter('video')}
                        size="lg"
                    >
                        Videos
                    </Button>
                    <Button
                        variant={filter === 'article' ? 'primary' : 'outline'}
                        onClick={() => setFilter('article')}
                        size="lg"
                    >
                        Articles
                    </Button>
                    <Button
                        variant={filter === 'opinion' ? 'primary' : 'outline'}
                        onClick={() => setFilter('opinion')}
                        size="lg"
                    >
                        Opinions
                    </Button>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedContent.map((item) => (
                        <Card key={item.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                            <CardHeader className="p-0">
                                <div className="relative aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className={`w-full h-full ${item.type === 'video' ? 'object-cover' : 'object-contain'}`}
                                        onError={(e) => {
                                            // For videos, try fallback to lower quality YouTube thumbnails
                                            if (item.type === 'video') {
                                                handleYouTubeThumbnailError(e, item.url);
                                            } else {
                                                // For articles, use placeholder
                                                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225"%3E%3Crect fill="%23f3f4f6" width="400" height="225"/%3E%3Ctext fill="%236b7280" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E%3C/text%3E%3C/svg%3E';
                                            }
                                        }}
                                    />
                                    {item.type === 'video' && (
                                        <button
                                            onClick={() => setSelectedVideo(item)}
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
                            <CardContent className="p-6 flex flex-col flex-1">
                                <CardTitle className="text-xl mb-3 line-clamp-2">
                                    {item.title}
                                </CardTitle>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                                    {item.description}
                                </p>
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            {new Date(item.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    {item.readTime && (
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>{item.readTime}</span>
                                        </div>
                                    )}
                                </div>
                                {item.type !== 'video' && (
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        asChild
                                    >
                                        <Link to={item.url}>
                                            Read More
                                        </Link>
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* No results message */}
                {sortedContent.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">
                            No content found for this filter. Try selecting a different category.
                        </p>
                    </div>
                )}

                {/* CTA Section */}
                <div className="mt-16 text-center bg-white rounded-lg shadow-sm p-8">
                    <h2 className="text-3xl font-heading font-bold text-primary mb-4">
                        Need Expert Legal Advice?
                    </h2>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Our team of experienced construction arbitration specialists is ready to assist
                        you with your dispute resolution needs.
                    </p>
                    <Button asChild size="lg">
                        <Link to="/contact">
                            Contact Us Today
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Video Player Modal */}
            {selectedVideo && (
                <VideoPlayerModal
                    url={selectedVideo.url}
                    title={selectedVideo.title}
                    isOpen={!!selectedVideo}
                    onClose={() => setSelectedVideo(null)}
                />
            )}
        </div>
    );
};
