# LinkedIn Posts - Simple URL Approach

This directory contains LinkedIn post URLs for displaying on the Insights page.

## Files

- `urls.ts` - **THIS IS THE ONLY FILE YOU NEED TO EDIT!**
- `types.ts` - TypeScript interfaces (don't edit)
- `index.ts` - Helper functions and constants (don't edit)

## How to Add a New LinkedIn Post (30 seconds!)

### Step 1: Get the LinkedIn Post URL

1. Go to [Shishir Gupta's LinkedIn profile](https://www.linkedin.com/in/shishir-anand-gupta-29468824/)
2. Find the post you want to add
3. Click the three dots (⋯) on the post
4. Select **"Copy link to post"**

### Step 2: Paste URL into `urls.ts`

Open `urls.ts` and paste the URL into the `linkedInPostUrls` array:

```typescript
export const linkedInPostUrls: string[] = [
    'https://www.linkedin.com/posts/shishir-anand-gupta-29468824_construction-arbitration-activity-7123456789-abcd',  // ← PASTE HERE (newest first)
    'https://www.linkedin.com/feed/update/urn:li:activity:7234567890123/',
    // older posts...
];
```

### Step 3: Save and Commit

```bash
git add .
git commit -m "Add new LinkedIn post"
git push
```

**That's it!** The post will appear on the Insights page after deployment. ✅

## URL Format

LinkedIn post URLs can look like:

- `https://www.linkedin.com/posts/shishir-anand-gupta-29468824_...`
- `https://www.linkedin.com/feed/update/urn:li:activity:...`

Both formats work! Just copy-paste whatever LinkedIn gives you.

## Order

**Add newest posts at the TOP** of the array. The site displays posts in the order they appear in the file.

## Example

```typescript
export const linkedInPostUrls: string[] = [
    // ✅ Newest (add here)
    'https://www.linkedin.com/posts/shishir-anand-gupta-29468824_post-from-october-20',
    'https://www.linkedin.com/posts/shishir-anand-gupta-29468824_post-from-october-15',
    'https://www.linkedin.com/posts/shishir-anand-gupta-29468824_post-from-october-10',
    // Older posts...
];
```

## Why This Approach?

- ✅ **Super simple** - Just copy-paste URLs
- ✅ **No manual data entry** - No need to type excerpts, dates, etc.
- ✅ **Append-only** - Add to the top, never delete
- ✅ **30 seconds** to add a new post
- ✅ **No mistakes** - Can't mess up formatting

## Weekly Workflow (5 minutes)

1. Monday morning: Open Shishir's LinkedIn profile
2. Copy URLs of last week's posts (right-click → Copy link)
3. Open `urls.ts` in VS Code
4. Paste URLs at the top of the array
5. Save, commit, push
6. Done! ✨
