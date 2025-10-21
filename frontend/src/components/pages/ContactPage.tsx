import { ContactForm } from '../organisms/ContactForm';

export const ContactPage = () => {
    return (
        <div className="pt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl font-heading font-bold text-primary mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Have a question or need assistance with construction arbitration?
                        Reach out to us and we'll get back to you promptly.
                    </p>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};
