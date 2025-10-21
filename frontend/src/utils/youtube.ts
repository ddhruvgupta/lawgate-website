/**
 * Extracts the video ID from a YouTube URL
 * Supports formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export const getYouTubeVideoId = (url: string): string | null => {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
        /youtube\.com\/watch\?.*v=([^&\s]+)/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
};

/**
 * Generates a YouTube thumbnail URL from a video URL
 * @param url - YouTube video URL
 * @param quality - Thumbnail quality (maxresdefault, hqdefault, mqdefault, sddefault)
 * @returns Thumbnail URL or fallback
 */
export const getYouTubeThumbnail = (
    url: string,
    quality: 'maxresdefault' | 'hqdefault' | 'mqdefault' | 'sddefault' = 'hqdefault'
): string => {
    const videoId = getYouTubeVideoId(url);

    if (!videoId) {
        // Fallback to a placeholder if we can't extract the video ID
        return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1280" height="720"%3E%3Crect fill="%23000" width="1280" height="720"/%3E%3Ctext fill="%23fff" font-family="sans-serif" font-size="48" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EVideo%3C/text%3E%3C/svg%3E';
    }

    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};

/**
 * Gets a YouTube thumbnail with automatic fallback to lower quality if high quality is not available
 * Returns an object with the primary URL and fallback URLs
 * @param url - YouTube video URL
 * @returns Object with src (primary) and fallback URLs
 * 
 * Note: We use hqdefault as primary because maxresdefault returns a blank image (not 404) 
 * when not available, making error detection impossible. hqdefault exists for ALL videos.
 */
export const getYouTubeThumbnailWithFallback = (url: string) => {
    const videoId = getYouTubeVideoId(url);

    if (!videoId) {
        const placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1280" height="720"%3E%3Crect fill="%23000" width="1280" height="720"/%3E%3Ctext fill="%23fff" font-family="sans-serif" font-size="48" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EVideo%3C/text%3E%3C/svg%3E';
        return {
            src: placeholder,
            fallbacks: []
        };
    }

    // Use hqdefault as primary - it's guaranteed to exist for all YouTube videos
    // maxresdefault returns a blank image (not 404) when unavailable, so we can't detect failures
    return {
        src: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        fallbacks: [
            `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
            `https://img.youtube.com/vi/${videoId}/sddefault.jpg`
        ]
    };
};

/**
 * Helper to get the onError handler for image fallback
 * This handler tries each fallback URL in sequence when the image fails to load
 * Usage: <img src={primary} onError={(e) => handleYouTubeThumbnailError(e, videoUrl)} />
 */
export const handleYouTubeThumbnailError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    videoUrl: string
) => {
    const img = e.currentTarget;
    const currentAttempt = parseInt(img.getAttribute('data-fallback-attempt') || '0');

    const fallback = getYouTubeThumbnailWithFallback(videoUrl);

    if (currentAttempt < fallback.fallbacks.length) {
        img.setAttribute('data-fallback-attempt', (currentAttempt + 1).toString());
        img.src = fallback.fallbacks[currentAttempt];
    } else {
        // All fallbacks failed - show placeholder
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225"%3E%3Crect fill="%23f3f4f6" width="400" height="225"/%3E%3Ctext fill="%236b7280" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
    }
};

/**
 * Legacy helper - kept for backwards compatibility but handleYouTubeThumbnailError is preferred
 */
export const getImageFallbackHandler = (fallbackUrls: string[]) => {
    let currentFallbackIndex = 0;

    return (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        if (currentFallbackIndex < fallbackUrls.length) {
            const nextUrl = fallbackUrls[currentFallbackIndex];
            currentFallbackIndex++;
            e.currentTarget.src = nextUrl;
        } else {
            // Final fallback - show placeholder
            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225"%3E%3Crect fill="%23f3f4f6" width="400" height="225"/%3E%3Ctext fill="%236b7280" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
        }
    };
};

/**
 * Converts a YouTube URL to an embed URL using privacy-enhanced mode
 * @param url - YouTube video URL
 * @returns YouTube embed URL with autoplay and other parameters using youtube-nocookie.com
 * 
 * Note: youtube-nocookie.com is YouTube's privacy-enhanced mode that:
 * - Doesn't store user information unless they play the video
 * - Has fewer embedding restrictions
 * - More reliable for embedded playback
 */
export const getYouTubeEmbedUrl = (url: string): string => {
    const videoId = getYouTubeVideoId(url);

    if (!videoId) {
        return url; // Return original URL if we can't parse it
    }

    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
};
