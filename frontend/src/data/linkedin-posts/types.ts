export interface LinkedInPost {
    id: string;
    date: string; // ISO format: YYYY-MM-DD
    content: string; // Full post text content
    linkedInUrl: string; // Link to the actual LinkedIn post
    imageUrl?: string; // Optional image from the post
    tags?: string[]; // Optional tags like "Construction Law", "Arbitration", etc.
}
