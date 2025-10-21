import { useEffect } from 'react';
import { X } from 'lucide-react';
import { getYouTubeEmbedUrl } from '../../utils';

interface VideoPlayerModalProps {
    url: string;
    title: string;
    isOpen: boolean;
    onClose: () => void;
}

export const VideoPlayerModal = ({ url, title, isOpen, onClose }: VideoPlayerModalProps) => {
    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
            console.log('Opening video modal with URL:', url);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, url]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-5xl bg-white rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-primary-dark border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-white line-clamp-1">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Close video"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                </div>

                {/* Video Player */}
                <div className="relative aspect-video bg-black">
                    <iframe
                        src={getYouTubeEmbedUrl(url)}
                        width="100%"
                        height="100%"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                        title={title}
                    />
                </div>
            </div>
        </div>
    );
};
