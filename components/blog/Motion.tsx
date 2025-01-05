"use client";
import React, {  memo } from "react";
import { motion } from "framer-motion";

const Motion = memo(({ children   }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col w-full space-y-6 transition-all duration-300 ease-in-out"
    >
      <motion.div
        layout
        className={`transition-all duration-500 ease-in-out`}
      >
         {children}
      </motion.div>
    </motion.div>
  );
});

export default Motion;