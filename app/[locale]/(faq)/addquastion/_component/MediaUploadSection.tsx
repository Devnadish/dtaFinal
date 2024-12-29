'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import ImageDropzone from '@/components/ImageDropzone';
import LoaderComponent from '@/components/Loader';
import { useLocale, useTranslations } from 'next-intl';
import Text from '@/components/Text';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const AudioRecorder = dynamic(
    () => import('@/components/MicRecored'),
    { 
        ssr: false,
        loading: () => <LoaderComponent />
    }
);

interface MediaUploadSectionProps {
    images: File[];
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
    planLimits: {
        imagesLimit: number;
        audioLimit: number;
    };
    onVoiceUpload: (file: File) => void;
    onRecordingStateChange: (isRecording: boolean) => void;
    recordedBlob: Blob | null;
    setRecordedBlob: React.Dispatch<React.SetStateAction<Blob | null>>;
}

const MediaUploadSection: React.FC<MediaUploadSectionProps> = ({
    images,
    setImages,
    planLimits,
    onVoiceUpload,
    onRecordingStateChange,
    recordedBlob,
    setRecordedBlob
}) => {
    const locale = useLocale();
    const t = useTranslations("addFaq");
    
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };
    
    return (
        <motion.div 
            className="space-y-6 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-br from-white/80 to-white/50 
                    dark:from-gray-800/50 dark:to-gray-900/30 
                    rounded-xl p-6 
                    border border-gray-200/50 dark:border-gray-700/50 
                    shadow-sm hover:shadow-lg 
                    transition-all duration-300
                    backdrop-blur-xl"
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-500/20 dark:to-blue-400/10">
                        <Icon 
                            icon="lucide:image" 
                            className="w-5 h-5 text-blue-500" 
                        />
                    </div>
                    <Text 
                        locale={locale} 
                        variant="h4" 
                        className="text-sm sm:text-base font-medium
                            bg-gradient-to-br from-gray-800 to-gray-600
                            dark:from-gray-100 dark:to-gray-300
                            bg-clip-text text-transparent"
                    >
                        {t('images')}
                    </Text>
                    <Text 
                        className="ml-auto text-xs sm:text-sm px-3 py-1.5 rounded-xl
                            bg-gradient-to-br from-gray-50 to-gray-100/50
                            dark:from-gray-800 dark:to-gray-900/50
                            border border-gray-200 dark:border-gray-700
                            text-gray-600 dark:text-gray-400" 
                        locale={locale} 
                        variant="span"
                    >
                        <span className="font-medium">{images.length}</span>/{planLimits.imagesLimit}
                    </Text>
                </div>
                <ImageDropzone 
                    images={images} 
                    setImages={setImages}
                    maxFiles={planLimits.imagesLimit}
                />
            </motion.div>

            <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-br from-white/80 to-white/50 
                    dark:from-gray-800/50 dark:to-gray-900/30 
                    rounded-xl p-6 
                    border border-gray-200/50 dark:border-gray-700/50 
                    shadow-sm hover:shadow-lg 
                    transition-all duration-300
                    backdrop-blur-xl"
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-500/20 dark:to-purple-400/10">
                        <Icon 
                            icon="lucide:mic" 
                            className="w-5 h-5 text-purple-500" 
                        />
                    </div>
                    <Text 
                        locale={locale} 
                        variant="h4" 
                        className="text-sm sm:text-base font-medium
                            bg-gradient-to-br from-gray-800 to-gray-600
                            dark:from-gray-100 dark:to-gray-300
                            bg-clip-text text-transparent"
                    >
                        {t('voice')}
                    </Text>
                    <Text 
                        className="ml-auto text-xs sm:text-sm px-3 py-1.5 rounded-xl
                            bg-gradient-to-br from-gray-50 to-gray-100/50
                            dark:from-gray-800 dark:to-gray-900/50
                            border border-gray-200 dark:border-gray-700
                            text-gray-600 dark:text-gray-400" 
                        locale={locale} 
                        variant="span"
                    >
                        {planLimits.audioLimit} {t('minutes')}
                    </Text>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 
                    dark:from-gray-900/50 dark:to-gray-800/30 
                    rounded-xl p-4
                    border border-gray-200/50 dark:border-gray-700/50
                    backdrop-blur-xl">
                    <AudioRecorder 
                        maxRecordingTime={planLimits.audioLimit * 60}
                        recordedBlob={recordedBlob}
                        setRecordedBlob={setRecordedBlob}
                        onRecordingComplete={(file) => {
                            if (file) {
                                onVoiceUpload(file);
                            }
                        }}
                        onRecordingStateChange={onRecordingStateChange}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MediaUploadSection;