import { Link } from 'react-router-dom';
import { Mail, Phone, Linkedin, MessageCircle } from 'lucide-react';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-white mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-2xl font-heading font-bold mb-4 text-secondary">
                            LAWGATE
                        </h3>
                        <p className="text-gray-300 mb-4">
                            Specializing in construction arbitration and dispute resolution with
                            32+ years of techno-legal expertise.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-secondary transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="https://wa.me/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-secondary transition-colors"
                                aria-label="WhatsApp"
                            >
                                <MessageCircle className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-secondary">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="text-gray-300 hover:text-secondary transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/latest-in-construction"
                                    className="text-gray-300 hover:text-secondary transition-colors"
                                >
                                    Latest in Construction
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-gray-300 hover:text-secondary transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-secondary">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-3 text-gray-300">
                                <Mail className="h-5 w-5 text-secondary" />
                                <a
                                    href="mailto:shishir@lawgate.in"
                                    className="hover:text-secondary transition-colors"
                                >
                                    shishir@lawgate.in
                                </a>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-300">
                                <Phone className="h-5 w-5 text-secondary" />
                                <span>Contact us for phone details</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-primary-light mt-8 pt-8 text-center text-gray-400">
                    <p>
                        &copy; {currentYear} Lawgate. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};
