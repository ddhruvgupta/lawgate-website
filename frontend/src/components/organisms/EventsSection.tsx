import { Link } from 'react-router-dom';
import { Calendar, Users, Video } from 'lucide-react';
import { Card, CardContent } from '../ui';

const events = [
    {
        icon: Calendar,
        title: 'Upcoming Seminars',
        description: 'Join our latest seminars on construction law',
        link: '/latest-in-construction',
    },
    {
        icon: Users,
        title: 'Collaborate with Us',
        description: 'Partner with us for your construction disputes',
        link: '/contact',
    },
    {
        icon: Video,
        title: 'Upcoming Webinars',
        description: 'Register for our online webinar series',
        link: '/latest-in-construction',
    },
];

export const EventsSection = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-heading font-bold text-center text-primary mb-12">
                    Events & Collaboration
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {events.map((event, index) => {
                        const Icon = event.icon;
                        return (
                            <Link key={index} to={event.link}>
                                <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                                    <CardContent className="p-6 text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/20 rounded-full mb-4">
                                            <Icon className="w-8 h-8 text-secondary-dark" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-primary mb-2">
                                            {event.title}
                                        </h3>
                                        <p className="text-gray-600">{event.description}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
