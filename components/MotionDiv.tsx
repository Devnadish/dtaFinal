'use client';

import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface MotionDivProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  animate?: any;
  initial?: any;
  transition?: any;
  variants?: any;
  className?: string;
  whileHover?: any;
  whileTap?: any;
}

const defaultAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" }
};

const MotionDiv: React.FC<MotionDivProps> = ({ 
  children,
  className,
  animate = defaultAnimation.animate,
  initial = defaultAnimation.initial,
  transition = defaultAnimation.transition,
  variants,
  whileHover,
  whileTap,
  ...props
}) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      variants={variants}
      whileHover={whileHover}
      whileTap={whileTap}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;