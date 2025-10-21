import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'sonner';
import { Button, Input, Textarea } from '../ui';
import type { ContactFormData } from '../../types';

export const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>();

    const onSubmit = async (data: ContactFormData) => {
        if (!captchaValue) {
            toast.error('Please complete the reCAPTCHA');
            return;
        }

        setIsSubmitting(true);
        console.log('📤 Submitting contact form...', { ...data, captcha: '[REDACTED]' });

        try {
            const requestBody = { ...data, captcha: captchaValue };
            console.log('📡 Sending POST request to /api/contact');
            console.log('Request payload:', { ...requestBody, captcha: '[REDACTED]' });

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            console.log('📨 Response received:', {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok
            });

            // Try to parse response body
            let responseData;
            try {
                responseData = await response.json();
                console.log('Response body:', responseData);
            } catch (parseError) {
                console.error('❌ Failed to parse response as JSON:', parseError);
                const text = await response.text();
                console.error('Raw response text:', text);
            }

            if (response.ok) {
                console.log('✅ Message sent successfully!');
                toast.success('Message sent successfully! We will get back to you soon.');
                reset();
                setCaptchaValue(null);
            } else {
                console.error('❌ Server returned error:', responseData);
                const errorMessage = responseData?.message || 'Failed to send message. Please try again.';
                toast.error(errorMessage);
            }
        } catch (error) {
            console.error('❌ Network or other error:', error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
            console.log('📋 Form submission complete');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
                label="Name *"
                {...register('name', { required: 'Name is required' })}
                error={errors.name?.message}
                placeholder="Your full name"
            />

            <Input
                label="Email *"
                type="email"
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                    },
                })}
                error={errors.email?.message}
                placeholder="your.email@example.com"
            />

            <Input
                label="Phone *"
                type="tel"
                {...register('phone', { required: 'Phone is required' })}
                error={errors.phone?.message}
                placeholder="+91 1234567890"
            />

            <Input
                label="Company (Optional)"
                {...register('company')}
                placeholder="Your company name"
            />

            <Input
                label="Subject *"
                {...register('subject', { required: 'Subject is required' })}
                error={errors.subject?.message}
                placeholder="What is this regarding?"
            />

            <Textarea
                label="Message *"
                {...register('message', { required: 'Message is required' })}
                error={errors.message?.message}
                placeholder="Tell us more about your inquiry..."
                rows={6}
            />

            <div className="flex justify-center">
                <ReCAPTCHA
                    sitekey="6LcCvu8rAAAAAOsN7xZliVKCR7TH0-GLgW6hFwDC"
                    onChange={(value) => setCaptchaValue(value)}
                />
            </div>

            <Button type="submit" isLoading={isSubmitting} className="w-full" size="lg">
                Send Message
            </Button>
        </form>
    );
};
