// app/[locale]/faq/rejected/page.tsx
import { dateToString } from "@/lib/nadish";
import { Card } from "@/components/ui/card";
import { GetRejectedFaq } from "@/actions/faq/faq";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import FaqHeaderInformation from "@/components/faq/FaqHeaderInformation";
import { Icon } from '@iconify/react';
import Text from "@/components/Text";
import MotionDiv from "@/components/MotionDiv";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Rejected Questions | DreamToApp FAQ',
    description: 'View rejected questions and their reasons in the DreamToApp FAQ section. Learn from community guidelines and improve your future submissions.',
    keywords: ['FAQ', 'rejected questions', 'community guidelines', 'help', 'feedback'],
    openGraph: {
        title: 'Rejected Questions | DreamToApp FAQ',
        description: 'View rejected questions and understand rejection reasons.',
        type: 'website',
    }
};

const NoRejected = ({ title }: { title: string }) => (
    <MotionDiv
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center flex-col gap-4 
            w-full h-32 rounded-xl
            bg-gradient-to-br from-rose-500/90 to-red-600/90 
            backdrop-blur-xl border border-rose-400/30
            shadow-lg shadow-rose-500/20"
    >
        <Text 
            variant="h2"
            className="text-xl font-bold text-white text-center"
        >
            {title}
        </Text>
        <Icon 
            icon="solar:smile-circle-bold" 
            className="w-12 h-12 text-white" 
        />
    </MotionDiv>
);

const NotAnsweredQuestions = ({ Questions }: { Questions: any[] }) => (
    <MotionDiv
        initial="hidden"
        animate="show"
        variants={{
            hidden: { opacity: 0 },
            show: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1
                }
            }
        }}
        className="flex flex-col gap-4"
        role="feed"
        aria-label="Rejected questions list"
    >
        {Questions.map((item) => (
            <MotionDiv
                key={item.id}
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                }}
                className="group"
            >
                <Card className="overflow-hidden transition-all duration-300
                    bg-gradient-to-br from-white/80 to-gray-50/50 
                    dark:from-gray-800/80 dark:to-gray-900/50
                    border border-rose-500/30 dark:border-rose-500/20
                    backdrop-blur-xl
                    hover:shadow-lg hover:shadow-rose-500/5
                    group-hover:border-rose-500/40"
                >
                    <div className="p-4 space-y-4">
                        <FaqHeaderInformation item={item} />
                        <Text 
                            variant="h2"
                            className="text-lg font-semibold text-gray-800 dark:text-gray-200
                                group-hover:text-gray-900 dark:group-hover:text-gray-100
                                transition-colors duration-300"
                        >
                            {item?.question}
                        </Text>
                        <div className="bg-gradient-to-br from-rose-500/20 to-red-500/10 
                            backdrop-blur-sm rounded-lg p-3 border border-rose-500/20"
                        >
                            <Text 
                                variant="p"
                                className="text-rose-600 dark:text-rose-400 font-medium"
                            >
                                {item?.rejectedReason}
                            </Text>
                        </div>
                    </div>
                </Card>
            </MotionDiv>
        ))}
    </MotionDiv>
);

export default async function RejectedQuestions({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const locale = (await params).locale;
    const { rejectedQuestions } = await GetRejectedFaq();
    const t = await getTranslations("Faq");

    return (
        <main className="p-4 max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                {rejectedQuestions.length !== 0 && (
                    <h1 className="flex items-center gap-2 mb-2 md:mb-0">
                        <Text 
                            variant="span" 
                            className="text-sm md:text-2xl font-bold bg-gradient-to-r from-rose-500 to-red-600 bg-clip-text text-transparent"
                        >
                            {t("rejected")}
                        </Text>
                        <Text 
                            variant="span"
                            className="text-sm md:text-2xl font-medium text-gray-700 dark:text-gray-300"
                        >
                            {t("rejectedHint")}
                        </Text>
                    </h1>
                )}
                <Link
                    href={`/${locale}/faq/privicy`}
                    className="text-sm md:text-base font-medium
                        bg-gradient-to-r from-blue-500 to-blue-600 
                        hover:from-blue-600 hover:to-blue-700
                        bg-clip-text text-transparent
                        transition-all duration-300
                        hover:underline decoration-blue-500"
                >
                    {t("privicy")}
                </Link>
            </header>

            {rejectedQuestions.length === 0 ? (
                <NoRejected title={t("noRejectMsg")} />
            ) : (
                <NotAnsweredQuestions Questions={rejectedQuestions} />
            )}
        </main>
    );
}