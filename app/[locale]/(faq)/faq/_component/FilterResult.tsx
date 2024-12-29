"use client";
import { Button } from "@/components/ui/button";
import { Icon } from '@iconify/react';
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type FilterResultProps = {
  tag: string;
  search: string;
  mode: string;
  queryCount: number;
  pagesCount: number;
  sort: string;
};

const FilterResult: React.FC<FilterResultProps> = ({
  tag,
  search,
  mode,
  sort,
  queryCount,
  pagesCount,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const pathname = usePathname();

  const handleClear = () => {
    router.push("/faq/ansewrd?");
  };

  const renderFilterItem = (iconName: string, text: string) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className="flex items-center gap-2 px-2 py-1 rounded-lg
        bg-gradient-to-br from-gray-50/50 to-gray-100/30
        dark:from-gray-800/50 dark:to-gray-700/30
        border border-gray-200/50 dark:border-gray-700/50"
    >
      <Icon 
        icon={iconName} 
        className="w-4 h-4 text-gray-500 dark:text-gray-400" 
      />
      <p className="text-sm text-gray-600 dark:text-gray-300">{text}</p>
    </motion.div>
  );

  const showClearButton = tag || search || mode || sort;

  return (
    <div className="flex gap-3 w-full items-center justify-between">
      <motion.div 
        className="flex flex-wrap items-center gap-2 p-2 rounded-xl
          bg-gradient-to-br from-gray-50 to-gray-100/50
          dark:from-gray-900 dark:to-gray-800/50
          border border-gray-200 dark:border-gray-700
          shadow-sm backdrop-blur-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <AnimatePresence mode="popLayout">
          {!showClearButton && (
            <motion.p 
              className="text-gray-500 dark:text-gray-400 px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              All Questions
            </motion.p>
          )}
          {tag && renderFilterItem("solar:tag-bold", tag)}
          {search && renderFilterItem("solar:search-check-bold", search)}
          {mode && renderFilterItem("solar:settings-bold", mode)}
          {sort && renderFilterItem("solar:sort-from-bottom-to-top-bold", sort)}
          
          {showClearButton && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Button
                variant="outline"
                onClick={handleClear}
                disabled={isLoading}
                className="group flex items-center gap-2 p-2
                  bg-gradient-to-br from-rose-50 to-rose-100/50
                  dark:from-rose-900/30 dark:to-rose-800/30
                  hover:from-rose-100 hover:to-rose-200/50
                  dark:hover:from-rose-800/30 dark:hover:to-rose-700/30
                  border border-rose-200 dark:border-rose-700
                  rounded-lg transition-all duration-300
                  hover:shadow-md hover:scale-105"
              >
                {isLoading ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Icon 
                      icon="solar:spinner-bold" 
                      className="w-4 h-4 text-rose-500" 
                    />
                  </motion.div>
                ) : (
                  <Icon 
                    icon="solar:close-circle-bold" 
                    className="w-4 h-4 text-rose-500
                      group-hover:rotate-90 transition-transform duration-300" 
                  />
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div 
        className="px-3 py-1.5 rounded-xl
          bg-gradient-to-br from-gray-50 to-gray-100/50
          dark:from-gray-900 dark:to-gray-800/50
          border border-gray-200 dark:border-gray-700
          shadow-sm backdrop-blur-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <p className="text-xs font-medium
          bg-gradient-to-br from-gray-600 to-gray-800
          dark:from-gray-300 dark:to-gray-100
          bg-clip-text text-transparent">
          {queryCount} / {pagesCount}
        </p>
      </motion.div>
    </div>
  );
};

export default FilterResult;