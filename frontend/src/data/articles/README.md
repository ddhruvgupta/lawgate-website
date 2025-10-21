# Articles Directory

This directory contains individual article files for the Lawgate website. Each article is stored in its own TypeScript file for better maintainability and organization.

## Structure

```
articles/
├── types.ts                    # Shared Article interface and ARTICLE_DEFAULTS
├── index.ts                    # Aggregates all articles and exports helper functions
├── claim-management.ts         # Individual article file
├── contract-management.ts      # Individual article file
├── arbitration-process.ts      # Individual article file
├── delay-analysis.ts           # Individual article file
├── quantum-claims.ts           # Individual article file
└── README.md                   # This file
```

## Adding a New Article

To add a new article to the website, follow these steps:

### 1. Create a new article file

Create a new file in this directory with a kebab-case name (e.g., `my-new-article.ts`):

```typescript
import type { Article } from './types';
import { ARTICLE_DEFAULTS } from './types';

export const myNewArticle: Article = {
    id: 'my-new-article',
    title: 'My New Article Title',
    ...ARTICLE_DEFAULTS,  // Includes author, authorLinkedIn, thumbnail
    date: '2024-01-15',
    readTime: '8 min read',
    excerpt: 'A brief description of your article that appears in article lists.',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    content: `
# Article Heading

Your article content in markdown format...

## Subheading

More content...
    `,
};
```

### 2. Update the index.ts file

Add your article to the index:

```typescript
// Add import at the top
import { myNewArticle } from './my-new-article';

// Add to the articles array
export const articles = [
    claimManagement,
    contractManagement,
    arbitrationProcess,
    delayAnalysis,
    quantumClaims,
    myNewArticle,  // Add your article here
] as const;
```

### 3. That's it

Your article will automatically appear in:

- The homepage carousel
- The "Latest in Construction" page
- Related articles sections
- Article routing

## Default Values

All articles automatically inherit these defaults from `ARTICLE_DEFAULTS`:

- **author**: 'Shishir Gupta'
- **authorLinkedIn**: '<https://www.linkedin.com/in/shishir-anand-gupta-29468824/>'
- **thumbnail**: '/assets/articles_thumbnail.png'

You can override any of these in your individual article file if needed.

## Article Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (kebab-case) |
| `title` | string | Yes | Article title |
| `author` | string | No* | Author name (defaults from ARTICLE_DEFAULTS) |
| `authorLinkedIn` | string | No | LinkedIn profile URL |
| `date` | string | Yes | Publication date (YYYY-MM-DD) |
| `readTime` | string | Yes | Estimated reading time |
| `excerpt` | string | Yes | Short description for previews |
| `thumbnail` | string | No* | Article image (defaults from ARTICLE_DEFAULTS) |
| `tags` | string[] | Yes | Array of topic tags |
| `content` | string | Yes | Full article in markdown format |

*Using the spread operator `...ARTICLE_DEFAULTS` provides default values

## Helper Functions

The `index.ts` file exports these helper functions:

- `getArticleById(id: string)` - Find an article by its ID
- `getPopularArticles(limit: number)` - Get the most recent articles
- `getRelatedArticles(currentArticleId: string, limit: number)` - Get related articles

## Markdown Support

Article content supports full markdown syntax including:

- Headers (# ## ###)
- Bold and italic text
- Lists (ordered and unordered)
- Links
- Code blocks
- Blockquotes
- Tables

The content is rendered using `react-markdown` with the `@tailwindcss/typography` plugin.

## Best Practices

1. **File naming**: Use kebab-case for consistency (e.g., `my-article-title.ts`)
2. **Export naming**: Use camelCase for the exported constant (e.g., `myArticleTitle`)
3. **ID matching**: The `id` property should match the filename
4. **Content formatting**: Keep markdown properly indented within the template literal
5. **Tags**: Use 2-4 relevant tags per article
6. **Read time**: Be realistic with reading time estimates (aim for 150-200 words per minute)
7. **Excerpts**: Keep excerpts under 200 characters for optimal display

## Migration Note

This modular structure replaced the previous monolithic `articles.ts` file (now backed up as `articles.ts.old`). The new structure makes it much easier to:

- Add new articles without editing a large file
- Find and edit specific articles
- Maintain consistent formatting
- Reduce merge conflicts in version control
- Keep the codebase organized and maintainable
