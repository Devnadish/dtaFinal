// app/[locale]/faq/notanswered/page.tsx
import { Card } from "@/components/ui/card";
import { GetNotAnsweredQuations } from "@/actions/faq/faq";
import { getTranslations } from "next-intl/server";
import FaqHeaderInformation from "@/components/faq/FaqHeaderInformation";
import Text from "@/components/Text";
import { Metadata } from "next";
import MotionDiv from "@/components/MotionDiv";
import { Icon } from '@iconify/react';

export const metadata: Metadata = {
    title: 'Unanswered Questions | DreamToApp FAQ',
    description: 'View and manage unanswered questions in the DreamToApp FAQ section. Help our community by providing answers to pending questions.',
    keywords: ['FAQ', 'questions', 'unanswered', 'pending', 'community', 'help'],
    openGraph: {
        title: 'Unanswered Questions | DreamToApp FAQ',
        description: 'View and manage unanswered questions in our FAQ section.',
        type: 'website',
    }
};

const NoMoreQuestions = ({ title }: { title: string }) => (
    <MotionDiv
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center flex-col gap-4 
            w-full h-32 rounded-xl
            bg-gradient-to-br from-amber-500/90 to-yellow-600/90 
            backdrop-blur-xl border border-amber-400/30
            shadow-lg shadow-amber-500/20"
    >
        <Text 
            variant="h2"
            className="text-xl font-bold text-white text-center"
        >
            {title}
        </Text>
        <Icon 
            icon="solar:loading-bold-duotone" 
            className="w-12 h-12 text-white animate-spin" 
        />
    </MotionDiv>
);

const NotAnsweredQuestions = ({ Questions }: { Questions: any[] }) => {
    return (
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
            aria-label="Unanswered questions list"
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
                        border border-gray-200/50 dark:border-gray-700/50
                        backdrop-blur-xl
                        hover:shadow-lg hover:shadow-amber-500/5
                        group-hover:border-amber-500/20"
                    >
                        <div className="p-4 space-y-4">
                            <FaqHeaderInformation item={item} />
                            <Text 
                                variant="p"
                                className="text-gray-700 dark:text-gray-300 
                                    leading-relaxed text-sm md:text-base
                                    group-hover:text-gray-900 dark:group-hover:text-gray-100
                                    transition-colors duration-300"
                            >
                                {item.question}
                            </Text>
                        </div>
                    </Card>
                </MotionDiv>
            ))}
        </MotionDiv>
    );
};

export default async function NotAnswered({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { notAnsweredQuestions } = await GetNotAnsweredQuations();
    const t = await getTranslations("Faq");

    return (
        <main className="p-4 max-w-7xl mx-auto">
            <header className="mb-6">
                <h1 className="flex items-center gap-2 mb-2">
                    <Text 
                        variant="span" 
                        className="text-sm md:text-2xl font-bold bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent"
                    >
                        {t("pending")}
                    </Text>
                    <Text 
                        variant="span"
                        className="text-sm md:text-2xl font-medium text-gray-700 dark:text-gray-300"
                    >
                        {t("notAnsweredHint")}
                    </Text>
                </h1>
                <meta name="description" content={`${t("pending")} ${t("notAnsweredHint")}`} />
            </header>

            {notAnsweredQuestions.length === 0 ? (
                <NoMoreQuestions title={t("noAnsweredMsg")} />
            ) : (
                <NotAnsweredQuestions Questions={notAnsweredQuestions} />
            )}
        </main>
    );
}