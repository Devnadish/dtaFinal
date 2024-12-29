'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { submitFaq } from '@/actions/faq/submitFaq';
import type { User } from '@/type/types';
import { GetUserByEmail } from '@/actions/user/user';

interface FormData {
    question: string;
    priority: number;
    images: File[];
    voiceRecording?: File;
}

const LoadingAddFaq = dynamic(() => import('./_component/LoaderFAQ'));

const MediaUploadSection = dynamic(() => import('./_component/MediaUploadSection'), {
    loading: () => <LoadingAddFaq />,
    ssr: false
});

const PrioritySelector = dynamic(() => import('./_component/PrioritySelector'), {
    loading: () => <LoadingAddFaq />,
    ssr: false
});

const QuestionInput = dynamic(() => import('./_component/QuestionInput'), {
    loading: () => <LoadingAddFaq />,
    ssr: false
});

const AddQuestionPage: React.FC = () => {
    const { data: session } = useSession();
    const [userData, setUserData] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
    const { toast } = useToast();
    const t = useTranslations('addFaq');

    const [formData, setFormData] = useState<FormData>({
        question: '',
        priority: 5,
        images: [],
        voiceRecording: undefined
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (session?.user?.email) {
                try {
                    const user = await GetUserByEmail(session.user.email);
                    if (user) {
                        setUserData({
                            id: user.id,
                            name: user.name || '',
                            email: user.email || '',
                            initailBalance: user.initailBalance || 0,
                            subscriptionType: user.subscriptionType || '',
                            image: user.image || '',
                            usedBalance: user.usedBalance || 0
                        });
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    toast({
                        title: t('error.title'),
                        description: t('error.userDataFetch'),
                        variant: 'destructive'
                    });
                }
            }
        };

        fetchUserData();
    }, [session?.user?.email, t, toast]);

    const handleImagesChange: React.Dispatch<React.SetStateAction<File[]>> = (newImages) => {
        setFormData(prev => ({
            ...prev,
            images: Array.isArray(newImages) ? newImages : newImages(prev.images)
        }));
    };

    const resetAllState = () => {
        setFormData({
            question: '',
            priority: 5,
            images: [],
            voiceRecording: undefined
        });
        setIsLoading(false);
        setUploadProgress(0);
        setIsRecording(false);
        setRecordedBlob(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setUploadProgress(0);

        try {
            if (!session?.user?.email || !userData) {
                toast({
                    title: t('error.title'),
                    description: t('error.notLoggedIn'),
                    variant: 'destructive'
                });
                return;
            }

            // Start upload progress animation
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) return prev;
                    return prev + 10;
                });
            }, 500);

            const response = await submitFaq({
                question: formData.question,
                priority: formData.priority,
                images: formData.images,
                voiceRecording: formData.voiceRecording,
                userPlan: userData.subscriptionType,
                userEmail: session.user.email
            });

            clearInterval(progressInterval);
            setUploadProgress(100);

            if (response.success) {
                toast({
                    title: t('success.title'),
                    description: t('success.description')
                });
                resetAllState();
            } else {
                throw new Error(response.error);
            }
        } catch (error: any) {
            toast({
                title: t('error.title'),
                description: error.message || t('error.unknown'),
                variant: 'destructive'
            });
        } finally {
            setIsLoading(false);
            setUploadProgress(0);
        }
    };

    return (
        <div className="container max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="space-y-8">
                <QuestionInput
                    question={formData.question}
                    setQuestion={(question) => setFormData(prev => ({ ...prev, question }))}
                    onError={(message) => toast({
                        title: t('error.title'),
                        description: message,
                        variant: 'destructive'
                    })}
                />

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <PrioritySelector
                        priority={formData.priority}
                        setPriority={(priority) => setFormData(prev => ({ ...prev, priority }))}
                    />
                </div>

                <div className="space-y-4">
                    <MediaUploadSection
                        images={formData.images}
                        setImages={handleImagesChange}
                        recordedBlob={recordedBlob}
                        setRecordedBlob={setRecordedBlob}
                        planLimits={{
                            imagesLimit: 5,
                            audioLimit: 5
                        }}
                        onVoiceUpload={(file) => setFormData(prev => ({ ...prev, voiceRecording: file }))}
                        onRecordingStateChange={(recording) => {
                            setIsRecording(recording);
                        }}
                    />
                </div>

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={isLoading || isRecording || !formData.question.trim()}
                        className="w-full sm:w-auto"
                    >
                        {isLoading ? t('submitting') : t('submit')}
                    </Button>
                </div>

                {uploadProgress > 0 && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                )}
            </form>
        </div>
    );
};

export default AddQuestionPage;