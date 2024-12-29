"use client";

import Text from "@/components/Text";
import { Textarea } from "@/components/ui/textarea";
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react'

interface QuestionInputProps {
    question: string;
    setQuestion: (question: string) => void;
    onError: (message: string) => void;
}

const QuestionInput = ({ 
    question,
    setQuestion,
    onError
}: QuestionInputProps) => {
    const t = useTranslations("addFaq"); 
    const locale = useLocale();
    const MAX_LENGTH = 500;
    const MIN_LENGTH = 10;
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length > MAX_LENGTH) {
            onError(`Question cannot exceed ${MAX_LENGTH} characters`);
            return;
        }
        setQuestion(value);
    };

    const getRemainingChars = () => MAX_LENGTH - question.length;
    
    const getCharacterCountColor = () => {
        const remaining = getRemainingChars();
        if (question.length < MIN_LENGTH) return "text-gray-500";
        if (remaining < MAX_LENGTH * 0.2) return "text-rose-500";
        return "text-emerald-500";
    };

    const isValidLength = question.length >= MIN_LENGTH && question.length <= MAX_LENGTH;
    const hasSpecialCharsOnly = /^[^a-zA-Z0-9]+$/.test(question);
    const isValid = isValidLength && !hasSpecialCharsOnly;

    const handleClear = () => {
        setQuestion("");
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-3"
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-500/20 dark:to-indigo-400/10">
                        <Icon 
                            icon="solar:question-circle-bold" 
                            className="w-4 h-4 text-indigo-500" 
                        />
                    </div>
                    <Text 
                        variant="span" 
                        locale={locale} 
                        className="text-sm sm:text-base font-medium bg-gradient-to-br from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent"
                    >
                        {t("question")}
                    </Text>
                </div>
                <motion.div
                    initial={false}
                    animate={{ scale: question.length > 0 ? 1 : 0.8, opacity: question.length > 0 ? 1 : 0.5 }}
                    className={`text-xs sm:text-sm font-medium px-3 py-1.5 rounded-xl 
                        ${getCharacterCountColor()} 
                        bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800 dark:to-gray-900/50
                        border border-gray-200 dark:border-gray-700
                        shadow-sm backdrop-blur-xl`}
                >
                    {getRemainingChars()} {t("letterRemaining")}
                </motion.div>
            </div>

            <div className="relative">
                <Textarea
                    value={question}
                    onChange={handleChange}
                    placeholder={t("textPlaceholder")}
                    className={`min-h-[120px] bg-white/80 dark:bg-gray-800/80 rounded-xl
                        border-2 transition-all duration-300 backdrop-blur-xl
                        ${!isValid && question.length > 0 
                            ? 'border-rose-200 dark:border-rose-500/20 bg-rose-50/30 dark:bg-rose-500/5' 
                            : isValid && question.length > 0
                                ? 'border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-500/5'
                                : 'border-gray-200 dark:border-gray-700'
                        }`}
                    maxLength={MAX_LENGTH}
                />
            </div>

            <AnimatePresence>
                {question.length > 0 && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={handleClear}
                        className="group flex items-center gap-2 px-3 py-2 text-sm
                            text-rose-500 hover:text-rose-600
                            bg-gradient-to-br from-rose-50 to-rose-100/50
                            dark:from-rose-500/10 dark:to-rose-400/5
                            hover:from-rose-100 hover:to-rose-200/50
                            dark:hover:from-rose-500/20 dark:hover:to-rose-400/10
                            rounded-xl transition-all duration-300
                            border border-rose-200 dark:border-rose-500/20
                            shadow-sm hover:shadow-md"
                        title={t("clear")}
                    >
                        <Icon 
                            icon="solar:close-circle-bold" 
                            className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" 
                        />
                        <Text variant="span" locale={locale}>
                            {t("clear")}
                        </Text>
                    </motion.button>
                )}
            </AnimatePresence>
            
            <AnimatePresence>
                {question.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 overflow-hidden"
                    >
                        <div className="space-y-1.5">
                            {question.length < MIN_LENGTH && (
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-1.5 text-rose-500"
                                >
                                    <Icon icon="solar:danger-triangle-bold" className="w-3 h-3" />
                                    <Text variant="span" locale={locale} className="text-xs">
                                        {t("questionlength")}
                                    </Text>
                                </motion.div>
                            )}
                            {hasSpecialCharsOnly && (
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-1.5 text-rose-500"
                                >
                                    <Icon icon="solar:danger-triangle-bold" className="w-3 h-3" />
                                    <Text variant="span" locale={locale} className="text-xs">
                                        {t("hasSpecialCharsOnly")}
                                    </Text>
                                </motion.div>
                            )}
                            {getRemainingChars() < MAX_LENGTH * 0.2 && (
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-1.5 text-amber-500"
                                >
                                    <Icon icon="solar:danger-triangle-bold-duotone" className="w-3 h-3" />
                                    <Text variant="span" locale={locale} className="text-xs">
                                        {t("quastionMaxLength")} {getRemainingChars()} {t("characters")}
                                    </Text>
                                </motion.div>
                            )}
                        </div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-gradient-to-br from-gray-50 to-gray-100/50 
                                dark:from-gray-900/50 dark:to-gray-800/30 
                                rounded-xl p-4 space-y-2
                                border border-gray-200/50 dark:border-gray-700/50
                                backdrop-blur-xl"
                        >
                            <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                                <Icon icon="solar:checklist-minimalistic-bold" className="w-3.5 h-3.5" />
                                <Text variant="span" locale={locale} className="text-xs font-medium">
                                    {t("guidelines")}
                                </Text>
                            </div>
                            <ul className="text-gray-500 dark:text-gray-400 list-disc pl-5 text-xs space-y-1">
                                <li>
                                    <Text variant="span" locale={locale}>
                                        {t("leftSideOfLetter")} {MIN_LENGTH} {t("and")} {MAX_LENGTH} {t("characters")}
                                    </Text>
                                </li>
                                <li>
                                    <Text variant="span" locale={locale}>
                                        {t("quastionGuid2")}
                                    </Text>
                                </li>
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default QuestionInput;