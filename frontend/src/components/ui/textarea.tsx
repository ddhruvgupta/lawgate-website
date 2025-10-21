import * as React from 'react';
import { cn } from '../../utils';

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, helperText, id, ...props }, ref) => {
        const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className="w-full space-y-2">
                {label && (
                    <label
                        htmlFor={textareaId}
                        className="text-sm font-medium text-gray-700"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    id={textareaId}
                    className={cn(
                        'flex min-h-[120px] w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm transition-colors',
                        'placeholder:text-gray-400',
                        'focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20',
                        'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500',
                        'resize-y',
                        error && 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20',
                        className
                    )}
                    ref={ref}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={
                        error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
                    }
                    {...props}
                />
                {error && (
                    <p id={`${textareaId}-error`} className="text-sm text-red-600 flex items-center gap-1">
                        <span>⚠</span> {error}
                    </p>
                )}
                {helperText && !error && (
                    <p id={`${textareaId}-helper`} className="text-sm text-gray-600">
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export { Textarea };
