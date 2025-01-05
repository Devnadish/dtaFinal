'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Text from '@/components/Text';

export default function NotFound() {
  const router = useRouter();
  const locale = useLocale()
  const title = locale === "en"
    ? "No Content Available for This Article"
    : "لا توجد محتويات متاحة لهذه المقالة";

  const description = locale === "en"
    ? "This article is currently unavailable. Please check back later for updates."
    : "هذه المقالة غير متاحة حالياً. يرجى التحقق مرة أخرى لاحقاً للحصول على التحديثات.";
  const buttonTitle = locale === "en"
    ? "Go Home"
    : "عودة للرئسية";


  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center flex flex-col items-center gap-10"
      >
        <Text variant='h1' locale={locale} >{title}</Text>
        <Text variant='h6' locale={locale}>{description}</Text>
        <Button onClick={() => router.push('/')}>
          <Text variant='h6' locale={locale}>{buttonTitle}</Text>

        </Button>
      </motion.div>
    </div>
  );
}