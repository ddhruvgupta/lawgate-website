// Common Types
export interface BaseComponentProps {
    className?: string;
    children?: React.ReactNode;
}

// Navigation
export interface NavItem {
    id: string;
    label: string;
    path: string;
    isExternal?: boolean;
}

// Carousel
export interface CarouselSlide {
    id: string;
    image: string;
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
}

// Specialty
export interface Specialty {
    id: string;
    icon?: string;
    title: string;
    description: string;
}

// Content Item (for Latest in Construction)
export type ContentType = 'video' | 'article' | 'opinion';

export interface ContentItem {
    id: string;
    type: ContentType;
    title: string;
    description: string;
    thumbnail?: string;
    videoUrl?: string; // YouTube URL or local video
    articleUrl?: string;
    date: string;
    author?: string;
    tags?: string[];
}

// Event
export interface Event {
    id: string;
    type: 'seminar' | 'webinar' | 'collaboration';
    title: string;
    description: string;
    date?: string;
    ctaText: string;
    ctaLink: string;
    icon?: string;
}

// Contact Form
export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    company?: string;
    subject: string;
    message: string;
}

export interface ContactFormResponse {
    success: boolean;
    message: string;
}
