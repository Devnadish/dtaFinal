import { Icon } from "@iconify/react";
import Link from "next/link";
import Text from "@/components/Text";
import { useLocale, useTranslations } from "next-intl";

export default function AddQuastionComponent() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="  w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2  ">
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-6 
        bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 
        dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10 
        p-8 rounded-3xl backdrop-blur-sm border border-white/10 shadow-xl"
      >
        <div className="space-y-3">
          <Text
            variant="h1"
            locale={locale}
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            {t("Faq.pagetitle")}
          </Text>
          <Text
            variant="p"
            locale={locale}
            className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-2xl"
          >
            {t("Faq.pageDescription")}
          </Text>
        </div>
        <Link
          href={`/${locale}/addquastion`}
          className="group flex items-center gap-3 px-6 py-3 
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
            hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600
            text-white rounded-2xl transition-all duration-300 
            transform hover:scale-105 hover:shadow-2xl 
            shadow-lg shadow-indigo-500/20"
        >
          <Icon
            icon="solar:chat-square-plus-bold"
            className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
          />
          <Text variant="span" locale={locale} className="font-medium">
            {t("Faq.askQuestion")}
          </Text>
        </Link>
      </div>
    </div>
  );
}
