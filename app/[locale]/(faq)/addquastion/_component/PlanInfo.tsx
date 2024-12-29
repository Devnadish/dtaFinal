"use client";

import { useLocale, useTranslations } from 'next-intl';
import Text from '@/components/Text';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { User } from '@/type/types';

// User Profile Component
const UserProfile = ({ name, image }: { name: string; image: string }) => (
    <div className='flex items-center gap-3'>
        <Avatar className="border-2 border-gray-400/30 w-12 h-12 ring-2 ring-gray-700/50 ring-offset-2 ring-offset-gray-900">
            <Image src={image} alt={name} width={48} height={48} className="rounded-full object-cover" priority />
            <AvatarFallback className="bg-gradient-to-br from-gray-700 to-gray-800 text-lg">{name?.[0]}</AvatarFallback>
        </Avatar>
        <div>
            <Text variant="h3" className="text-xs md:text-lg font-semibold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">{name}</Text>
            <Text variant="span" className="text-xs md:text-sm text-gray-400">@{name.toLowerCase().replace(/\s+/g, '')}</Text>
        </div>
    </div>
);

// Questions Balance Component
const QuestionsBalance = ({ remainingQuestions, initailBalance, locale, t }: { 
    remainingQuestions: number; 
    initailBalance: number;
    locale: string; 
    t: any 
}) => (
    <div className='grid grid-cols-2 gap-4 w-full'>
        <div className='bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-4 border border-gray-700/50 backdrop-blur-xl'>
            <Text variant="span" locale={locale} className='text-xs md:text-sm text-gray-400 block mb-1'>{t('remainingQuestions')}</Text>
            <div className={`text-2xl font-bold flex items-center flex-col md:flex-row ${
                remainingQuestions === 0 
                    ? 'bg-gradient-to-r from-rose-500 to-red-600' 
                    : 'bg-gradient-to-r from-emerald-400 to-green-500'
                } bg-clip-text text-transparent`}>
                {remainingQuestions || 0}
                <span className="text-xs md:text-sm text-gray-500 ml-1">/ {initailBalance}</span>
            </div>
        </div>
        <div className='bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-4 border border-gray-700/50 backdrop-blur-xl'>
            <Text variant="span" locale={locale} className='text-xs md:text-sm text-gray-400 block mb-1'>{t('currcentBalance')}</Text>
            <div className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent flex items-center flex-col md:flex-row">
                {initailBalance || 0}
                <span className="text-xs md:text-sm text-gray-500 ml-1">questions</span>
            </div>
        </div>
    </div>
);

// Mini Balance Display Component
const MiniBalance = ({ remainingQuestions, locale, t }: { remainingQuestions: number; locale: string; t: any }) => (
    <div className={`px-3 py-1.5 rounded-xl backdrop-blur-xl ${
        remainingQuestions === 0 
            ? 'bg-gradient-to-br from-rose-500/20 to-red-500/10 text-rose-400 border border-rose-500/20' 
            : 'bg-gradient-to-br from-emerald-500/20 to-green-500/10 text-emerald-400 border border-emerald-500/20'
    }`}>
        <Text variant="span" locale={locale} className="font-medium flex text-xs md:text-sm items-center flex-col md:flex-row">
            {remainingQuestions || 0} {t('remainingQuestions')}
        </Text>
    </div>
);

// Plan Feature Item
const PlanFeatureItem = ({ icon, text }: { icon: string; text: string }) => (
    <div className="flex items-center gap-3 bg-gradient-to-br from-gray-800/30 to-gray-900/30 p-3 rounded-xl border border-gray-700/30">
        <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-2 rounded-lg">
            <Icon icon={icon} className="w-[18px] h-[18px] text-emerald-400" />
        </div>
        <Text variant="span" className="text-sm text-gray-200">{text}</Text>
    </div>
);

// Plan Details Component
const PlanDetails = ({ role, locale, t }: { role: string; locale: string; t: any }) => {
    let plan = role === 'free' ? t('freePlan') : t('proPlan');
    !role && (plan = t('basicPlan'));

    const features = role === 'free' ? [
        { icon: "solar:clock-circle-bold", text: t('freePlanFeature1') },
        { icon: "solar:star-bold", text: t('freePlanFeature2') },
        { icon: "solar:bolt-bold", text: t('freePlanFeature3') }
    ] : [
        { icon: "solar:crown-bold", text: t('proPlanFeature1') },
        { icon: "solar:star-bold", text: t('proPlanFeature2') },
        { icon: "solar:bolt-bold", text: t('proPlanFeature3') }
    ];

    return (
        <div className='space-y-4 w-full'>
            <div className='bg-gradient-to-br from-gray-800 to-gray-700 px-4 py-3 rounded-xl border border-gray-600/50 flex items-center justify-between flex-col md:flex-row text-xs md:text-sm backdrop-blur-xl'>
                <div className="flex items-center gap-3">
                    <Icon 
                        icon={role === 'free' ? "solar:star-bold" : "solar:crown-bold"} 
                        className={`w-6 h-6 ${role === 'free' ? 'text-amber-400' : 'text-purple-400'}`}
                    />
                    <div>
                        <Text variant="h4" locale={locale} className="text-lg font-medium bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">{plan}</Text>
                        <Text variant="span" locale={locale} className="text-sm text-gray-400">
                            {role === 'free' ? t('freePlanFeature1') : t('proPlanFeature1')}
                        </Text>
                    </div>
                </div>
                <Link
                    href="/pricing"
                    className="px-4 py-2 bg-gradient-to-br from-emerald-500 to-green-600 
                        hover:from-emerald-600 hover:to-green-700 
                        rounded-xl text-white text-sm font-medium 
                        transition-all duration-300
                        hover:shadow-lg hover:shadow-emerald-500/20
                        hover:scale-105 border border-emerald-400/20"
                >
                    <Text variant="span" locale={locale}>{t('upgradePlan')}</Text>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {features.map((feature, index) => (
                    <PlanFeatureItem key={index} {...feature} />
                ))}
            </div>
        </div>
    );
};

const PlanInfo = ({ user }: { user: User }) => {
    const t = useTranslations('addFaq');
    const locale = useLocale();
    const remainingQuestions = (user.initailBalance - user.usedBalance);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="rounded-xl shadow-xl w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden border border-gray-700/50">
            <div 
                className="p-6 cursor-pointer hover:bg-gray-800/50 transition-all duration-300"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className='flex justify-between items-center gap-4 flex-col md:flex-row'>
                    <UserProfile name={user.name} image={user.image} />
                    <div className="flex items-center gap-3">
                        <MiniBalance remainingQuestions={remainingQuestions} locale={locale} t={t} />
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Icon 
                                icon="solar:alt-arrow-down-bold" 
                                className="w-5 h-5 text-gray-400" 
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 space-y-6">
                            <QuestionsBalance 
                                remainingQuestions={remainingQuestions} 
                                initailBalance={user.initailBalance}
                                locale={locale} 
                                t={t} 
                            />
                            <PlanDetails role={user.subscriptionType} locale={locale} t={t} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PlanInfo;