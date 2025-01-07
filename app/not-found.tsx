"use client"
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function NotFound() {
  const t = useTranslations('NotFound');
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        {/* Relevant SVG Illustration */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="300"
            height="300"
            viewBox="0 0 300 300"
            fill="none"
            className="text-blue-500"
          >
            {/* Broken Link or Missing Page Illustration */}
            <path
              d="M150 50C97.157 50 50 97.157 50 150C50 202.843 97.157 250 150 250C202.843 250 250 202.843 250 150C250 97.157 202.843 50 150 50ZM150 230C107.393 230 70 192.607 70 150C70 107.393 107.393 70 150 70C192.607 70 230 107.393 230 150C230 192.607 192.607 230 150 230Z"
              fill="currentColor"
            />
            <path
              d="M150 100C122.386 100 100 122.386 100 150C100 177.614 122.386 200 150 200C177.614 200 200 177.614 200 150C200 122.386 177.614 100 150 100ZM150 180C133.431 180 120 166.569 120 150C120 133.431 133.431 120 150 120C166.569 120 180 133.431 180 150C180 166.569 166.569 180 150 180Z"
              fill="currentColor"
            />
            {/* Cross Symbol for "Not Found" */}
            <path
              d="M130 130L170 170M170 130L130 170"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Title and Description */}
        <h1 className="text-5xl font-bold text-gray-900">{t('title')}</h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          {t('description')}
        </p>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            onClick={() => router.push('/')}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
          >
            {t('button')}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}