"use client";
import { motion } from "framer-motion";

import { Icon } from "@iconify/react";

export default function OnOffMenu({
  onClick,
  isVisible,
}: {
  onClick: () => void;
  isVisible: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      className=" rounded-full w-[38px] h-[38px] flex items-center justify-center "
    >
      {isVisible ? (
        <Icon
          icon="material-symbols:close-rounded"
          className="w-[24px] h-[24px] text-foreground/50 "
        />  
      ) : (
        <Icon
          icon="material-symbols:menu-rounded"
          className="w-[24px] h-[24px] text-foreground/50 "
        />
      )}
    </motion.button>
  );
}
