export interface Article {
    id: string;
    title: string;
    author: string;
    authorLinkedIn?: string;
    date: string;
    readTime: string;
    excerpt: string;
    thumbnail: string;
    tags: string[];
    content: string;
}

export const ARTICLE_DEFAULTS = {
    thumbnail: '/assets/articles_thumbnail.png',
    author: 'Shishir Gupta',
    authorLinkedIn: 'https://www.linkedin.com/in/shishir-anand-gupta-29468824/',
} as const;
