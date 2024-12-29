'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function NotFound() {
  const t = useTranslations('NotFound');
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-gray-600 mb-8">{t('description')}</p>
        <Button onClick={() => router.push('/')}>
          {t('button')}
        </Button>
      </motion.div>
    </div>
  );
}