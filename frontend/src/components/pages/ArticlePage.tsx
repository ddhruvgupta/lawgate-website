import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { Button, Card, CardContent } from '../ui';
import { getArticleById, getPopularArticles } from '../../data/articles';
import ReactMarkdown from 'react-markdown';

export const ArticlePage = () => {
    const { articleId } = useParams<{ articleId: string }>();
    const article = articleId ? getArticleById(articleId) : null;
    const popularArticles = getPopularArticles(5);

    if (!article) {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-heading font-bold text-primary mb-4">
                        Article Not Found
                    </h1>
                    <p className="text-gray-600 mb-8">
                        The article you're looking for doesn't exist.
                    </p>
                    <Button asChild>
                        <Link to="/latest-in-construction">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Articles
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-20 bg-gray-50">
            <article className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Main Content */}
                        <div className="lg:w-2/3">
                            <div className="bg-white rounded-lg shadow-sm p-8">
                                {/* Back Button */}
                                <Button
                                    variant="ghost"
                                    asChild
                                    className="mb-8"
                                >
                                    <Link to="/latest-in-construction">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back to All Content
                                    </Link>
                                </Button>

                                {/* Article Header */}
                                <header className="mb-8">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {article.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                                        {article.title}
                                    </h1>

                                    <div className="flex flex-wrap items-center gap-6 text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <User className="w-5 h-5" />
                                            {article.authorLinkedIn ? (
                                                <a
                                                    href={article.authorLinkedIn}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:text-primary-light underline transition-colors"
                                                >
                                                    {article.author}
                                                </a>
                                            ) : (
                                                <span>{article.author}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-5 h-5" />
                                            <span>
                                                {new Date(article.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-5 h-5" />
                                            <span>{article.readTime}</span>
                                        </div>
                                    </div>
                                </header>

                                {/* Article Content */}
                                <div className="prose prose-lg prose-primary max-w-none mb-12">
                                    <ReactMarkdown>{article.content}</ReactMarkdown>
                                </div>

                                {/* Footer CTA */}
                                <div className="mt-16 p-8 bg-primary/5 rounded-lg">
                                    <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                                        Need Expert Advice?
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        If you have questions about construction disputes or need professional
                                        assistance, our team is here to help.
                                    </p>
                                    <Button asChild size="lg">
                                        <Link to="/contact">
                                            Contact Us Today
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:w-1/3">
                            <div className="sticky top-24 space-y-6">
                                {/* Popular Articles */}
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-heading font-bold text-primary mb-4">
                                            Popular Articles
                                        </h3>
                                        <div className="space-y-4">
                                            {popularArticles.map((popularArticle) => (
                                                <Link
                                                    key={popularArticle.id}
                                                    to={`/latest-in-construction/article/${popularArticle.id}`}
                                                    className={`block group ${popularArticle.id === article.id ? 'pointer-events-none' : ''
                                                        }`}
                                                >
                                                    <div className="flex gap-3">
                                                        <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                                            <img
                                                                src={popularArticle.thumbnail}
                                                                alt={popularArticle.title}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                                onError={(e) => {
                                                                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect fill="%23e5e7eb" width="80" height="80"/%3E%3C/svg%3E';
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className={`font-semibold text-sm line-clamp-2 mb-1 ${popularArticle.id === article.id
                                                                ? 'text-secondary'
                                                                : 'text-primary group-hover:text-secondary'
                                                                }`}>
                                                                {popularArticle.title}
                                                            </h4>
                                                            <p className="text-xs text-gray-500">
                                                                {new Date(popularArticle.date).toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric',
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        <Button asChild variant="outline" className="w-full mt-6">
                                            <Link to="/latest-in-construction">
                                                View All Articles
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Contact CTA */}
                                <Card className="bg-primary text-white">
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-heading font-bold mb-3">
                                            Have a Question?
                                        </h3>
                                        <p className="text-gray-200 mb-4 text-sm">
                                            Get in touch with our experts for personalized advice on your construction dispute.
                                        </p>
                                        <Button asChild variant="secondary" className="w-full">
                                            <Link to="/contact">
                                                Contact Us
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </aside>
                    </div>
                </div>
            </article>
        </div>
    );
};
