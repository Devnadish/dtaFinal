import Text from "@/components/Text";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Icon } from '@iconify/react';

interface HintsProps {
    className?: string;
    initialState?: boolean;
    onStateChange?: (isOpen: boolean) => void;
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
            type: "spring",
            stiffness: 200,
            damping: 20
        }
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    }
};

const item = {
    hidden: { opacity: 0, x: -20 },
    show: { 
        opacity: 1, 
        x: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20
        }
    },
    exit: { opacity: 0, x: -20 }
};

const Hints = ({ className = "", initialState = false, onStateChange }: HintsProps) => {
    const t = useTranslations("addFaq");
    const locale = useLocale();
    const [isOpen, setIsOpen] = useState(initialState);

    const hints = [
        { icon: "solar:info-circle-bold", text: t("pcHint1"), color: "text-blue-500", bgColor: "from-blue-500/20 to-blue-400/10" },
        { icon: "solar:danger-triangle-bold", text: t("pcHint2"), color: "text-amber-500", bgColor: "from-amber-500/20 to-amber-400/10" },
        { icon: "solar:check-circle-bold", text: t("pcHint3"), color: "text-emerald-500", bgColor: "from-emerald-500/20 to-emerald-400/10" },
        { icon: "solar:close-circle-bold", text: t("pcHint4"), color: "text-rose-500", bgColor: "from-rose-500/20 to-rose-400/10" },
        { icon: "solar:question-circle-bold", text: t("pcHint5"), color: "text-purple-500", bgColor: "from-purple-500/20 to-purple-400/10" }
    ];

    const toggleOpen = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        onStateChange?.(newState);
    };

    return (
        <div className={`${className} relative w-full`}>
            <motion.button
                onClick={toggleOpen}
                className="group flex items-center gap-2 w-full px-4 py-2.5 rounded-xl
                    bg-gradient-to-br from-gray-50/80 to-gray-100/50 
                    dark:from-gray-800/80 dark:to-gray-900/50 
                    hover:from-gray-100 hover:to-gray-200 
                    dark:hover:from-gray-700 dark:hover:to-gray-800 
                    border border-gray-200/50 dark:border-gray-700/50
                    shadow-sm hover:shadow-md
                    backdrop-blur-xl
                    transition-all duration-300"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className={`${isOpen ? 'text-blue-500' : 'text-gray-400'} transition-colors`}
                >
                    <Icon 
                        icon={isOpen ? "solar:alt-arrow-up-bold" : "solar:alt-arrow-down-bold"} 
                        className="w-5 h-5"
                    />
                </motion.div>
                <Text 
                    locale={locale} 
                    variant='span' 
                    className={`text-sm font-medium 
                        ${isOpen 
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent' 
                            : 'text-gray-600 dark:text-gray-300'} 
                        group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-blue-600 
                        group-hover:bg-clip-text group-hover:text-transparent 
                        transition-all duration-300`}
                >
                    {isOpen ? t('hide') + " " + t("Hint") : t('show') + " " + t("Hint")}
                </Text>
            </motion.button>

            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ 
                            opacity: 1, 
                            y: 0, 
                            height: "auto",
                            transition: {
                                height: { type: "spring", stiffness: 500, damping: 30 },
                                opacity: { duration: 0.2 }
                            }
                        }}
                        exit={{ 
                            opacity: 0, 
                            y: -10, 
                            height: 0,
                            transition: {
                                height: { type: "spring", stiffness: 500, damping: 30 },
                                opacity: { duration: 0.2 }
                            }
                        }}
                        className="overflow-hidden mt-2"
                    >
                        <motion.div 
                            variants={container}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="bg-gradient-to-br from-white/80 via-gray-50/50 to-gray-100/30 
                                dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-900/30 
                                rounded-xl p-4 shadow-lg 
                                border border-gray-200/50 dark:border-gray-700/50 
                                backdrop-blur-xl"
                        >
                            <motion.h3
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-lg font-semibold mb-4 
                                    bg-gradient-to-br from-gray-800 to-gray-600 
                                    dark:from-gray-100 dark:to-gray-300 
                                    bg-clip-text text-transparent"
                            >
                                <Text locale={locale} variant='span'>{t("policyHint")}</Text>
                            </motion.h3>

                            <motion.div 
                                variants={container}
                                className="space-y-3"
                            >
                                {hints.map(({ icon, text, color, bgColor }, index) => (
                                    <motion.div
                                        key={index}
                                        variants={item}
                                        className="flex items-start gap-3 group"
                                        whileHover={{ x: 5 }}
                                    >
                                        <div className={`p-2 rounded-xl 
                                            bg-gradient-to-br ${bgColor} 
                                            border border-gray-200/30 dark:border-gray-700/30 
                                            backdrop-blur-sm ${color}`}
                                        >
                                            <Icon icon={icon} className="w-[18px] h-[18px]" />
                                        </div>
                                        <div className="flex-1">
                                            <Text 
                                                locale={locale} 
                                                variant='span' 
                                                className="text-sm text-gray-600 dark:text-gray-300
                                                    group-hover:text-gray-900 dark:group-hover:text-gray-100
                                                    transition-colors duration-300"
                                            >
                                                {text}
                                            </Text>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Hints;