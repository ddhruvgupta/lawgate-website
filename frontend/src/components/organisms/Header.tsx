import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui';
import { cn } from '../../utils';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Latest in Construction', href: '/latest-in-construction' },
    { name: 'Insights', href: '/insights' },
    { name: 'Contact Us', href: '/contact' },
];

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'bg-white shadow-md'
                    : 'bg-white/95 backdrop-blur-sm'
            )}
        >
            <nav className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src="/assets/lawgate-logo.png"
                            alt="LawGate - Arbitration Redefined"
                            className="h-12 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                    'text-sm font-medium transition-colors hover:text-primary',
                                    location.pathname === item.href
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-gray-700'
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Button asChild size="sm">
                            <Link to="/contact">Get in Touch</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6 text-gray-700" />
                        ) : (
                            <Menu className="h-6 w-6 text-gray-700" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        <div className="flex flex-col space-y-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={cn(
                                        'text-sm font-medium transition-colors hover:text-primary px-2 py-1',
                                        location.pathname === item.href
                                            ? 'text-primary bg-primary/5 rounded'
                                            : 'text-gray-700'
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Button asChild className="w-full" size="sm">
                                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                                    Get in Touch
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};
