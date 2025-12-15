import type { LinkedInPost } from './types';

// Shared constants
export const AUTHOR_NAME = 'Shishir Gupta';
export const AUTHOR_LINKEDIN = 'https://www.linkedin.com/in/shishir-anand-gupta-29468824/';

/**
 * LinkedIn posts with full content
 * 
 * To add a new post:
 * 1. Go to the LinkedIn post
 * 2. Copy the post text
 * 3. Copy the post URL (three dots → "Copy link to post")
 * 4. Optionally save any image from the post
 * 5. Add to the array below
 */

export const linkedInPosts: LinkedInPost[] = [
    {
        id: 'post-2024-10-contractors-arbitration',
        date: '2024-10-20',
        content: `Contractors often face challenges in arbitration proceedings. Understanding the nuances of construction arbitration can make a significant difference in the outcome of disputes.

Key considerations:
• Proper documentation of claims
• Timely submission of evidence
• Expert witness testimony
• Understanding contractual obligations

Arbitration remains a preferred method for resolving construction disputes due to its efficiency and expertise-based decision making.`,
        linkedInUrl: 'https://www.linkedin.com/posts/shishir-anand-gupta-29468824_contractors-arbitration-activity-7383950259284185088-2nzM',
        imageUrl: '', // Optional: Add image path if post has an image
        tags: ['Arbitration', 'Contractors', 'Construction Law']
    },
    // Add more posts here...
];

/**
 * Get a specific LinkedIn post by ID
 */
export const getLinkedInPostById = (id: string): LinkedInPost | undefined => {
    return linkedInPosts.find(post => post.id === id);
};

/**
 * Get recent LinkedIn posts (sorted by date, most recent first)
 */
export const getRecentLinkedInPosts = (limit?: number): LinkedInPost[] => {
    const sorted = [...linkedInPosts].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    return limit ? sorted.slice(0, limit) : sorted;
};

/**
 * Get posts by tag
 */
export const getLinkedInPostsByTag = (tag: string): LinkedInPost[] => {
    return linkedInPosts.filter(post => 
        post.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
    );
};

/**
 * Get all unique tags from all posts
 */
export const getAllTags = (): string[] => {
    const tags = new Set<string>();
    linkedInPosts.forEach(post => {
        post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
};