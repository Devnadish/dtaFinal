import { Icon } from "@iconify/react";
import Link from "next/link";
import Text from "@/components/Text";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import avatar from "@/public/assets/image/thinking.png";
export default function SideBarAddQuastion({
  isCollapsed,
}: {
  isCollapsed: boolean;
}) {
  const t = useTranslations();
  const locale = useLocale();
  if (isCollapsed) {
    return (
      <Link
        href={`/${locale}/addquastion`}
        className="group w-full flex items-center  px-1  py-1 bg-gradient-to-r from-gray-400 via-gray-800 to-gray-400 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg shadow-indigo-500/20 flex-col absolute bottom-2 right-0 "
      >
        <Icon icon="ic:baseline-add-comment" className="w-6 h-6" />
        <Image src={avatar} alt="User Avatar" width={27} height={50} />
      </Link>
    );
  }

  return (
    <section className="flex flex-col  w-full items-center justify-between gap-2 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10 p-2 rounded-xl backdrop-blur-sm border border-white/10 shadow-xl">
      <Text
        variant="h1"
        locale={locale}
        className="text-lg  font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
      >
        {t("Faq.pagetitle")}
      </Text>

      <Link
        href={`/${locale}/addquastion`}
        className="group flex items-center gap-0 px-6  py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg shadow-indigo-500/20"
      >
        <Icon
          icon="solar:chat-square-plus-bold"
          className="w-9 h-9 transition-transform duration-300 group-hover:rotate-12"
        />
        <Text variant="span" locale={locale} className="font-medium">
          {t("Faq.askQuestion")}
        </Text>
      </Link>
      <Text
        variant="p"
        locale={locale}
        className="text-gray-600 dark:text-gray-300 text-xs "
      >
        {t("Faq.pageDescription")}
      </Text>
      <Image
        src={avatar}
        alt="User Avatar"
        width={52}
        height={100}
        className="absolute -top-12 right-0"
      />
    </section>
  );
}
