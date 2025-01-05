import { Button } from "@/components/ui/button";
import { Icon } from '@iconify/react';
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const ExpandButton = ({
  isExpanded,
  onClick,
}: {
  isExpanded: boolean;
  onClick: () => void;
}) => {
  const t = useTranslations("button");

  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="group flex items-center gap-2 px-4 py-2 w-fit
        bg-gradient-to-br from-gray-50 to-gray-100/50 
        dark:from-gray-900 dark:to-gray-800/50
        hover:from-gray-100 hover:to-gray-200/50
        dark:hover:from-gray-800 dark:hover:to-gray-700/50
        border border-gray-200 dark:border-gray-700
        text-gray-700 dark:text-gray-300
        hover:text-gray-900 dark:hover:text-gray-100
        rounded-xl transition-all duration-300
        hover:shadow-lg hover:scale-105
        font-cairo font-medium"
      aria-expanded={isExpanded}
      aria-label={isExpanded ? t("showLess") : t("showMore")}
    >
      <span className="relative">
        {isExpanded ? t("showLess") : t("showMore")}
      </span>
      <motion.div
        initial={false}
        animate={{ rotate: isExpanded ? 180 : 0 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
      >
        <Icon 
          icon="solar:alt-arrow-down-bold" 
          className="w-4 h-4 text-gray-500 dark:text-gray-400
            group-hover:text-gray-700 dark:group-hover:text-gray-200
            transition-colors duration-300" 
        />
      </motion.div>
    </Button>
  );
};

export default ExpandButton;