// Export types and constants
export type { Article } from './types';
export { ARTICLE_DEFAULTS } from './types';

// Import all articles
import { claimManagement } from './claim-management';
import { contractManagement } from './contract-management';
import { arbitrationProcess } from './arbitration-process';
import { delayAnalysis } from './delay-analysis';
import { quantumClaims } from './quantum-claims';

// Export articles array
export const articles = [
    claimManagement,
    contractManagement,
    arbitrationProcess,
    delayAnalysis,
    quantumClaims,
] as const;

// Helper function to get article by ID
export const getArticleById = (id: string) => {
    return articles.find(article => article.id === id);
};

// Helper function to get popular articles
export const getPopularArticles = (limit: number = 5) => {
    // In a real app, this would be based on actual view counts
    // For now, we'll return the most recent articles
    return [...articles]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
};

// Helper function to get related articles
export const getRelatedArticles = (currentArticleId: string, limit: number = 3) => {
    return articles
        .filter(article => article.id !== currentArticleId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
};
