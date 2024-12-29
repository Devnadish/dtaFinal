import Text from "@/components/Text";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from 'next-intl';


const PolicyHints = ({ 
    showPolicyHint, 
    setShowPolicyHint 
}: { 
    showPolicyHint: boolean; 
    setShowPolicyHint: (show: boolean) => void; 
}) => {
    const t = useTranslations("addFaq"); 
    const locale = useLocale();

    const hintArray=[t("pcHint1"),t("pcHint2"),t("pcHint3"),t("pcHint4"),t("pcHint5")]
    
    return (
        <motion.div 
            // className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.button
                onClick={() => setShowPolicyHint(!showPolicyHint)}
                className="text-sm text-blue-500 hover:underline mb-2 flex items-center gap-2 w-full"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                <motion.span
                    animate={{ rotate: showPolicyHint ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    ↓
                </motion.span>
                <Text locale={locale} variant='span'>{showPolicyHint ? t('hide')+" "+t("Hint") : t('show')+" "+t("Hint")}</Text>
                
            </motion.button>

            <AnimatePresence>
                {showPolicyHint && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ 
                            opacity: 1, 
                            height: "auto", 
                            y: 0,
                        }}
                        exit={{ 
                            opacity: 0, 
                            height: 0, 
                            y: -20,
                            transition: { duration: 0.2 }
                        }}
                        transition={{ 
                            duration: 0.3,
                            ease: "easeOut"
                        }}
                        className="overflow-hidden"
                    >
                        <motion.div 
                            className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm border border-blue-200"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <motion.h3 
                                className="font-medium mb-2 text-foreground"
                                initial={{ x: -20 }}
                                animate={{ x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Text locale={locale} variant='span'>{t("policyHint")}</Text>
                            </motion.h3>
                            <motion.ul 
                                className="list-disc pl-4 space-y-2 mr-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {hintArray.map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ 
                                            delay: 0.3 + (index * 0.1),
                                            duration: 0.2
                                        }}

                                    >
                                        <Text locale={locale} variant='span' className="text-muted-foreground ">{item}</Text>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
 
export default PolicyHints;