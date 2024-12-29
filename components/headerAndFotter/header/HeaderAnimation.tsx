"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function HeaderAnimation({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6
      }}
    >
      {children}
    </motion.div>
  );
}