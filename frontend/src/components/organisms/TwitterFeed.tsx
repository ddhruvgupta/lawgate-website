import { useEffect } from 'react';
import { Twitter, ExternalLink } from 'lucide-react';
import { Card, CardContent, Button } from '../ui';

export const TwitterFeed = () => {
    // Load Taggbox widget script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://widget.taggbox.com/embed-lite.min.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Cleanup: remove script when component unmounts
            const existingScript = document.querySelector('script[src="https://widget.taggbox.com/embed-lite.min.js"]');
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
        };
    }, []);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-heading font-bold text-primary mb-4">
                            Follow Us on X
                        </h2>
                        <p className="text-lg text-gray-600">
                            Stay connected with our latest updates and insights
                        </p>
                    </div>

                    <Card className="overflow-hidden">
                        <CardContent className="p-0">
                            {/* Taggbox Widget Integration */}
                            <div className="relative bg-white" style={{ minHeight: '600px' }}>
                                {/* Placeholder for Taggbox Widget */}
                                <div className="p-8 text-center">
                                    <Twitter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                                        Taggbox Widget Setup Required
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        To complete the setup:
                                    </p>
                                    
                                    <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                                        <h4 className="font-semibold text-gray-800 mb-3">Setup Steps:</h4>
                                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                                            <li>Go to <a href="https://taggbox.com/widget/twitter" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">taggbox.com/widget/twitter</a></li>
                                            <li>Create a free account</li>
                                            <li>Enter your Twitter handle: <code className="bg-gray-200 px-2 py-1 rounded">@engagelawgate</code></li>
                                            <li>Customize the widget design to match your brand</li>
                                            <li>Copy the embed code</li>
                                            <li>Replace this placeholder with the Taggbox embed code</li>
                                        </ol>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <a
                                            href="https://taggbox.com/widget/twitter"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                                        >
                                            Set up Taggbox Widget
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                        <a
                                            href="https://x.com/engagelawgate"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors"
                                        >
                                            <Twitter className="w-4 h-4" />
                                            Visit @engagelawgate
                                        </a>
                                    </div>
                                </div>

                                {/* 
                                TODO: Replace this section with Taggbox embed code
                                Example Taggbox embed code structure:
                                <div class="taggbox-container" style="width:100%;height:600px;overflow: auto;">
                                    <div class="taggbox-socialwall" data-wall-id="YOUR_WALL_ID" 
                                         data-tags="false" data-share="false" data-wall-url="YOUR_WALL_URL">
                                    </div>
                                </div>
                                */}
                            </div>

                            {/* Follow Button */}
                            <div className="p-6 bg-white border-t text-center">
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-black hover:bg-gray-800 text-white"
                                >
                                    <a
                                        href="https://x.com/engagelawgate"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2"
                                    >
                                        <Twitter className="w-5 h-5" />
                                        Follow @engagelawgate on X
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};