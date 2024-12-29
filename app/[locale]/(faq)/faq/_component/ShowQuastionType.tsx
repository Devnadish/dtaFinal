'use client';

import { Icon } from '@iconify/react'
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Text from "@/components/Text";
import { useLocale } from "next-intl";

interface FAQProps {
  answeredQuestions: number;
  pendingQuestions: number;
  rejectedQuestions: number;
  msgHint?: string;
  linkTitle: {
    pending: string;
    answered: string;
    rejected: string;
  };
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    x: -20,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

export default function ShowQuastionType({
  answeredQuestions = 0,
  pendingQuestions = 0,
  rejectedQuestions = 0,
  msgHint,
  linkTitle
}: FAQProps) {
  const locale = useLocale();
  const links = [
    {
      href: "/faq/ansewrd",
      icon: "solar:check-circle-bold",
      iconColor: "text-emerald-500",
      count: answeredQuestions,
      title: linkTitle.answered,
      gradient: "from-emerald-500/10 via-emerald-400/10 to-teal-500/10",
      iconBg: "bg-emerald-500/10",
      shadow: "emerald"
    },
    {
      href: "/faq/notanswered",
      icon: "solar:hourglass-bold",
      iconColor: "text-sky-500",
      count: pendingQuestions,
      title: linkTitle.pending,
      gradient: "from-sky-500/10 via-blue-400/10 to-blue-500/10",
      iconBg: "bg-sky-500/10",
      shadow: "sky"
    },
    {
      href: "/faq/rejected",
      icon: "solar:close-circle-bold",
      iconColor: "text-rose-500",
      count: rejectedQuestions,
      title: linkTitle.rejected,
      gradient: "from-rose-500/10 via-red-400/10 to-pink-500/10",
      iconBg: "bg-rose-500/10",
      shadow: "rose"
    }
  ];

  return (
    <div className="flex flex-col items-start justify-between w-full gap-2">
      {msgHint && (
        <Text 
          variant="span" 
          locale={locale}  
          className="block text-xs text-center text-gray-500/80 dark:text-gray-400/80 mt-2"
        >
          {msgHint}
        </Text>
      )}
      <div className="flex flex-row gap-4 w-full justify-between items-center p-3 rounded-2xl 
        bg-white/20 dark:bg-gray-900/20 backdrop-blur-3xl shadow-xl border border-white/10">
        <motion.div 
          className="w-full space-y-3"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="grid grid-cols-3 gap-3 sm:gap-4 w-full"
            variants={containerVariants}
          >
            <AnimatePresence>
              {links.map((link, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  layout
                  className="w-full"
                >
                  <Link href={link.href} className="block w-full">
                    <motion.div
                      className={cn(
                        "relative overflow-hidden",
                        "bg-gradient-to-br",
                        link.gradient,
                        "backdrop-blur-xl",
                        "rounded-xl",
                        "border border-white/10",
                        "shadow-lg",
                        "py-3 sm:py-4 px-3 sm:px-4"
                      )}
                      initial={{ borderRadius: 12 }}
                      whileHover={{ 
                        boxShadow: `0 8px 24px -4px rgba(var(--${link.shadow}-500-rgb), 0.2)`,
                      }}
                    >
                      <motion.div 
                        className="w-full"
                        initial={{ background: "none" }}
                        whileHover={{ 
                          background: "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0))" 
                        }}
                      >
                        <div className="flex items-center justify-between gap-2 sm:gap-3">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <motion.div
                              className={cn(
                                "p-2 rounded-lg",
                                link.iconBg
                              )}
                              whileHover={{ 
                                scale: 1.1,
                                rotate: link.icon === "solar:hourglass-bold" ? 180 : 0 
                              }}
                              transition={{ 
                                type: "spring",
                                stiffness: 300,
                                damping: 10
                              }}
                            >
                              <Icon 
                                icon={link.icon} 
                                className={cn(
                                  "w-5 h-5",
                                  link.iconColor
                                )}
                              />
                            </motion.div>

                            <Text 
                              variant="span" 
                              locale={locale} 
                              className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300 line-clamp-1"
                            >
                              {link.title}
                            </Text>
                          </div>

                          <motion.span
                            className="text-sm sm:text-base font-semibold bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 dark:from-gray-200 dark:via-gray-100 dark:to-white bg-clip-text text-transparent"
                            initial={{ y: 5, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {link.count}
                          </motion.span>
                        </div>
                      </motion.div>

                      <motion.div
                        className="absolute inset-0 opacity-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}