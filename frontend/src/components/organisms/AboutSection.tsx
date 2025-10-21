import { Card, CardContent } from '../ui';
import { Scale, Award, Users } from 'lucide-react';

export const AboutSection = () => {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-heading font-bold text-primary mb-4">
                            About Lawgate
                        </h2>
                        <p className="text-lg text-gray-600">
                            Leading experts in construction arbitration and dispute resolution
                        </p>
                    </div>

                    <div className="prose prose-lg max-w-none mb-12">
                        <p className="text-gray-700 leading-relaxed mb-6">
                            With over 32 years of specialized experience, Lawgate stands as a premier authority
                            in construction arbitration and techno-legal dispute resolution. Our expertise spans
                            across complex infrastructure projects, contract management, and engineering disputes.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Led by Shishir Deshpande, our practice combines deep legal knowledge with technical
                            understanding of construction processes, enabling us to provide comprehensive solutions
                            to the most challenging disputes in the construction industry.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                                    <Award className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-2">32+</h3>
                                <p className="text-gray-600">Years of Experience</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/20 rounded-full mb-4">
                                    <Scale className="w-8 h-8 text-secondary-dark" />
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-2">100+</h3>
                                <p className="text-gray-600">Cases Handled</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                                    <Users className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-2">Expert</h3>
                                <p className="text-gray-600">Techno-Legal Team</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};
