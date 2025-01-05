// app/[locale]/prices/page.tsx
import React from "react";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from '@iconify/react';
import Text from "@/components/Text";
import MotionDiv from "@/components/MotionDiv";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
    title: 'Pricing Plans | DreamToApp',
    description: 'Choose the perfect plan for your needs. Simple, transparent pricing with a 14-day free trial on all plans.',
    keywords: ['pricing', 'plans', 'subscription', 'features', 'free trial'],
    openGraph: {
        title: 'Pricing Plans | DreamToApp',
        description: 'Simple, transparent pricing for all your needs.',
        type: 'website',
    }
};

const PlanCard = ({
    title,
    price,
    features,
    isPopular,
    t,
    locale

}: {
    title: string;
    price: string;
    features: string[];
    isPopular?: boolean;
    t: any;
    locale: string
}) => (
    <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
    >
        <Card className={`relative flex justify-between flex-col h-full
            transition-all duration-300
            bg-gradient-to-br from-white/80 to-gray-50/50 
            dark:from-gray-800/80 dark:to-gray-900/50
            backdrop-blur-xl
            ${isPopular
                ? 'border-2 border-purple-500/50 dark:border-purple-400/50 shadow-lg shadow-purple-500/10'
                : 'border border-gray-200/50 dark:border-gray-700/50'}
            hover:shadow-xl hover:scale-102
            group-hover:border-purple-500/30`}
        >
            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 
                        text-white px-8 py-1.5 rounded-full
                        shadow-lg shadow-purple-500/20
                        border border-purple-400/30"
                    >
                        <Text variant="span" className="text-white" locale={locale}>
                            {t('mostPopular')}
                        </Text>
                    </Badge>
                </div>
            )}
            <CardHeader>
                <CardTitle className="text-2xl 
                    bg-gradient-to-br from-gray-800 to-gray-600 
                    dark:from-gray-100 dark:to-gray-300 
                    bg-clip-text text-transparent"
                    style={locale === 'ar' ? { fontFamily: 'Cairo' } : { fontFamily: 'Cairo' }}
                >
                    {title}

                </CardTitle>
                <CardDescription className="flex items-baseline gap-1">
                    <Text variant="span" className="text-3xl font-bold
                        bg-gradient-to-r from-purple-600 to-blue-600 
                        bg-clip-text text-transparent"
                        locale={locale}
                    >
                        {price}
                    </Text>
                    <Text variant="span" className="text-gray-500 dark:text-gray-400" locale={locale}>
                        /{t('month')}
                    </Text>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {features.map((feature) => (
                        <li key={crypto.randomUUID()} className="flex items-center gap-2 group/item">
                            <div className="p-1 rounded-full 
                                bg-gradient-to-br from-emerald-500/20 to-green-500/10 
                                border border-emerald-500/20"
                            >
                                <Icon
                                    icon="solar:check-circle-bold"
                                    className="w-4 h-4 text-emerald-500"
                                />
                            </div>
                            <Text variant="span" className="text-gray-600 dark:text-gray-300
                                group-hover/item:text-gray-900 dark:group-hover/item:text-gray-100
                                transition-colors duration-300"
                                locale={locale}
                            >
                                {feature}
                            </Text>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <button className={`w-full py-3 px-6 rounded-xl font-medium
                    transition-all duration-300
                    ${isPopular
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white'
                        : 'bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white'}
                    shadow-md hover:shadow-lg
                    border border-white/10`}
                >
                    <Text variant="span" className="text-white font-medium"
                        locale={locale}
                    >
                        {t('getStarted')}
                    </Text>
                </button>
            </CardFooter>
        </Card>
    </MotionDiv>
);

export default async function PricingPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const t = await getTranslations("pricePage");
    const locale = (await params).locale;

    const plans = [
        {
            title: t('basicPlan.title'),
            price: '$10',
            features: [
                t('basicPlan.feature1'),
                t('basicPlan.feature2'),
                t('basicPlan.feature3'),
                t('basicPlan.feature4'),
            ]
        },
        {
            title: t('standardPlan.title'),
            price: '$20',
            features: [
                t('standardPlan.feature1'),
                t('standardPlan.feature2'),
                t('standardPlan.feature3'),
                t('standardPlan.feature4'),
                t('standardPlan.feature5'),
            ],
            isPopular: true
        },
        {
            title: t('premiumPlan.title'),
            price: '$30',
            features: [
                t('premiumPlan.feature1'),
                t('premiumPlan.feature2'),
                t('premiumPlan.feature3'),
                t('premiumPlan.feature4'),
                t('premiumPlan.feature5'),
                t('premiumPlan.feature6'),
                t('premiumPlan.feature7'),
            ]
        }
    ];

    return (
        <main className="container mx-auto px-4 py-16">
            <MotionDiv
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4 mb-12"
            >
                <Text variant="h1" className="text-4xl font-bold 
                    bg-gradient-to-r from-purple-600 to-blue-600 
                    bg-clip-text text-transparent"
                    locale={locale}
                >
                    {t('pagetitle')}
                </Text>
                <Text variant="p" className="text-gray-600 dark:text-gray-400 
                    text-lg max-w-2xl mx-auto"
                    locale={locale}
                >
                    {t('hint')}
                </Text>
            </MotionDiv>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {plans.map((plan) => (
                    <PlanCard key={plan.title} {...plan} t={t} locale={locale} />
                ))}
            </div>
        </main>
    );
}