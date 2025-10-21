import { Scale, Wrench, Award } from 'lucide-react';
import { Card, CardContent } from '../ui';

const specialties = [
    {
        icon: Scale,
        title: 'Dispute Resolution',
        description: 'Expert arbitration services for construction industry disputes',
    },
    {
        icon: Wrench,
        title: 'Techno-Legal Expertise',
        description: 'Engineering and infrastructure dispute resolution',
    },
    {
        icon: Award,
        title: '32+ Years Experience',
        description: 'Extensive experience in execution and contract management',
    },
];

export const SpecialtiesBanner = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-heading font-bold text-center text-primary mb-12">
                    Our Specialties
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {specialties.map((specialty, index) => {
                        const Icon = specialty.icon;
                        return (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6 text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-primary mb-2">
                                        {specialty.title}
                                    </h3>
                                    <p className="text-gray-600">{specialty.description}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
