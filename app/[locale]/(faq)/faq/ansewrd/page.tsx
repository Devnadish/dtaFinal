import ShowQuastion from "@/components/faq/quastion/ShowQuastion";
import FilterResult from "../_component/FilterResult";
import { GetQuestions } from "@/actions/faq/answerFilter";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Text from "@/components/Text";

export default async function FAQ({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    tag: string;
    search: string;
    mode: string;
    sort: string;
  }>;
}) {
  const { tag, search, mode, sort } = await searchParams;
  const t = await getTranslations();
  const locale = (await params).locale;
  const { QuestionsWithAnswers, QueryCont, pagesCount } = await GetQuestions(
    tag,
    search,
    mode,
    sort,
    1,
    10
  );

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 
        bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 
        dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10 
        p-8 rounded-3xl backdrop-blur-sm border border-white/10 shadow-xl">
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

      {/* Filter Section */}
      <FilterResult
        tag={tag}
        search={search}
        mode={mode}
        sort={sort}
        queryCount={QueryCont || 0}
        pagesCount={pagesCount || 0}
      />

      {/* Questions List */}
      <div className="space-y-4">
        {QueryCont === 0 ? (
          <NoQuestions t={t} />
        ) : (
          <ShowQuestions QuestionsWithAnswers={QuestionsWithAnswers} />
        )}
      </div>
    </div>
  );
}

const NoQuestions = ({ t }: { t: any }) => {
  return (
    <div className="flex items-center justify-center w-full py-20 flex-col gap-8
      bg-gradient-to-br from-gray-50 to-gray-100/50 
      dark:from-gray-800/50 dark:to-gray-900/50 
      rounded-3xl border border-gray-200/50 dark:border-gray-700/50
      backdrop-blur-sm shadow-xl">
      <div className="relative">
        <div className="absolute inset-0 animate-ping opacity-30">
          <Icon
            icon="solar:search-broken"
            className="w-20 h-20 text-gray-400/50"
          />
        </div>
        <Icon
          icon="solar:search-broken"
          className="w-20 h-20 text-gray-400 animate-pulse"
        />
      </div>
      <div className="text-center space-y-3 max-w-md px-6">
        <Text
          variant="h2"
          locale={t.locale}
          className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-100 bg-clip-text text-transparent"
        >
          {t("Faq.noQuestions")}
        </Text>
        <Text
          variant="p"
          locale={t.locale}
          className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed"
        >
          {t("Faq.tryDifferentFilter")}
        </Text>
      </div>
    </div>
  );
};

const ShowQuestions = ({
  QuestionsWithAnswers,
}: {
  QuestionsWithAnswers: any;
}) => {
  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
      {QuestionsWithAnswers.map((item: any) => (
        <ShowQuastion item={item} key={item.id} />
      ))}
    </div>
  );
};

const NoMoreQuestions = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center p-10 rounded-3xl
    bg-gradient-to-br from-amber-50 to-orange-50 
    dark:from-amber-500/10 dark:to-orange-500/10 
    border border-amber-200/50 dark:border-amber-500/20
    backdrop-blur-sm shadow-xl">
    <div className="flex flex-col items-center gap-6">
      <Icon
        icon="solar:bell-bold"
        className="w-16 h-16 text-amber-500 animate-bounce"
      />
      <Text
        variant="h3"
        locale="en"
        className="text-xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent"
      >
        {title}
      </Text>
      <Icon
        icon="svg-spinners:180-ring"
        className="w-10 h-10 text-amber-500"
      />
    </div>
  </div>
);