import { useEffect } from 'react';
import { Linkedin, ExternalLink } from 'lucide-react';

export const InsightsPage = () => {
    // Load Elfsight widget script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://elfsightcdn.com/platform.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Cleanup: remove script when component unmounts
            const existingScript = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]');
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-dark to-primary pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            Insights & Updates
                        </h1>
                        <p className="text-xl text-white mb-4">
                            Latest insights on construction law and arbitration
                        </p>
                        <p className="text-white">
                            Professional updates and expert commentary from our team
                        </p>
                    </div>
                </div>
            </section>

            {/* LinkedIn Feed Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
                            Latest Posts
                        </h2>
                        
                        {/* Elfsight LinkedIn Widget */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div 
                                className="elfsight-app-44812f30-8358-4fd1-b36a-40d5ef7af2d4" 
                                data-elfsight-app-lazy
                            ></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-primary text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <Linkedin className="w-16 h-16 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold mb-4">
                            Connect with Us
                        </h2>
                        <p className="text-gray-300 mb-8 text-lg">
                            Follow our LinkedIn for expert insights on construction law and dispute resolution.
                        </p>
                        <a
                            href="https://www.linkedin.com/in/shishir-anand-gupta-29468824/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary hover:bg-gray-100 font-semibold rounded-lg transition-colors"
                        >
                            <Linkedin className="w-5 h-5" />
                            Follow on LinkedIn
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Additional Resources */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
                            More Resources
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-semibold text-primary mb-3">
                                    Latest Articles
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Read our in-depth articles on construction law and arbitration
                                </p>
                                <a
                                    href="/latest-in-construction"
                                    className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-semibold transition-colors"
                                >
                                    Browse Articles
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-semibold text-primary mb-3">
                                    Get in Touch
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Have questions? Our team is here to help with your construction disputes
                                </p>
                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-semibold transition-colors"
                                >
                                    Contact Us
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
