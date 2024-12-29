"use client"

import Text from "@/components/Text";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Icon } from '@iconify/react'

interface PrioritySelectorProps {
    priority: number;
    setPriority: (priority: number) => void;
}

const PrioritySelector = ({ priority, setPriority }: PrioritySelectorProps) => {
    const t = useTranslations("addFaq");
    const locale = useLocale();

    const getPriorityStyles = (level: number) => {
        switch(level) {
            case 5:
                return {
                    iconName: "lucide:flame",
                    color: "text-red-600",
                    bg: "bg-red-50 dark:bg-red-500/10",
                    border: "border-red-200 dark:border-red-500/20",
                    shadow: "shadow-red-500/10",
                    gradient: "bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-500/20 dark:to-red-500/5"
                };
            case 4:
                return {
                    iconName: "lucide:alert-octagon",
                    color: "text-orange-500",
                    bg: "bg-orange-50 dark:bg-orange-500/10",
                    border: "border-orange-200 dark:border-orange-500/20",
                    shadow: "shadow-orange-500/10",
                    gradient: "bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-500/20 dark:to-orange-500/5"
                };
            case 3:
                return {
                    iconName: "lucide:alert-triangle",
                    color: "text-yellow-500",
                    bg: "bg-yellow-50 dark:bg-yellow-500/10",
                    border: "border-yellow-200 dark:border-yellow-500/20",
                    shadow: "shadow-yellow-500/10",
                    gradient: "bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-500/20 dark:to-yellow-500/5"
                };
            case 2:
                return {
                    iconName: "lucide:minus",
                    color: "text-blue-500",
                    bg: "bg-blue-50 dark:bg-blue-500/10",
                    border: "border-blue-200 dark:border-blue-500/20",
                    shadow: "shadow-blue-500/10",
                    gradient: "bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-500/20 dark:to-blue-500/5"
                };
            case 1:
                return {
                    iconName: "lucide:arrow-down",
                    color: "text-green-500",
                    bg: "bg-green-50 dark:bg-green-500/10",
                    border: "border-green-200 dark:border-green-500/20",
                    shadow: "shadow-green-500/10",
                    gradient: "bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-500/20 dark:to-green-500/5"
                };
            default:
                return {
                    iconName: "lucide:minus",
                    color: "text-gray-500",
                    bg: "bg-gray-50 dark:bg-gray-500/10",
                    border: "border-gray-200 dark:border-gray-500/20",
                    shadow: "shadow-gray-500/10",
                    gradient: "bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-500/20 dark:to-gray-500/5"
                };
        }
    };

    const priorities = [5, 4, 3, 2, 1];

    return (
        <div className="w-full space-y-3">
            <div className="flex items-center gap-2">
                <Icon 
                    icon="lucide:alert-triangle" 
                    className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" 
                />
                <Text 
                    variant="span" 
                    locale={locale} 
                    className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                    {t("priorityLevel")}
                </Text>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 sm:gap-2 w-full">
                {priorities.map((value) => {
                    const styles = getPriorityStyles(value);
                    const isSelected = priority === value;

                    return (
                        <motion.button
                            key={value}
                            onClick={() => setPriority(value)}
                            type="button"
                            className={`
                                relative flex flex-col items-center justify-center gap-1.5 sm:gap-2 
                                p-2 sm:p-3 md:p-4
                                rounded-lg sm:rounded-xl border transition-all duration-300
                                ${isSelected 
                                    ? `${styles.gradient} ${styles.border} ${styles.shadow} shadow-lg` 
                                    : 'bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800 dark:to-gray-700/50 border-gray-200 dark:border-gray-700 hover:shadow-md'
                                }
                            `}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            initial={false}
                            animate={isSelected ? { y: -4 } : { y: 0 }}
                        >
                            <motion.div
                                initial={false}
                                animate={isSelected 
                                    ? { scale: 1.1, y: 0 } 
                                    : { scale: 1, y: 0 }
                                }
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                className={`${isSelected ? styles.color : 'text-gray-400 dark:text-gray-500'}`}
                            >
                                <Icon 
                                    icon={styles.iconName}
                                    className="w-4 h-4 sm:w-5 sm:h-5" 
                                />
                            </motion.div>
                            
                            <Text 
                                variant="span" 
                                locale={locale} 
                                className={`
                                    text-[10px] sm:text-xs font-medium text-center leading-tight
                                    ${isSelected 
                                        ? styles.color 
                                        : 'text-gray-500 dark:text-gray-400'
                                    }
                                `}
                            >
                                {t(`Priority${value}`)}
                            </Text>

                            {isSelected && (
                                <motion.div
                                    layoutId="priority-outline"
                                    className={`absolute inset-0 rounded-lg sm:rounded-xl border-2 ${styles.color}`}
                                    transition={{ type: "spring", bounce: 0.2 }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-2 p-2 sm:p-3 rounded-lg text-sm ${getPriorityStyles(priority).bg} ${getPriorityStyles(priority).color}`}
            >
                <Text 
                    variant="p" 
                    locale={locale} 
                    className="text-[10px] sm:text-xs md:text-sm"
                >
                    {t(`priorityHint${priority}`)}
                </Text>
                <Text 
                    variant="p" 
                    locale={locale} 
                    className="text-[10px] sm:text-xs md:text-sm mt-1 opacity-75"
                >
                    {t('priorityHint6')}
                </Text>
            </motion.div>
        </div>
    );
};

export default PrioritySelector;