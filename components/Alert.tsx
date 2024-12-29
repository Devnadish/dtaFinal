"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AlertProps {
  message: string;
  isVisible: boolean;
  variant?: 'info' | 'success' | 'warning' | 'error';
  position?: 'top' | 'bottom';
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ 
  message, 
  isVisible, 
  variant = 'info',
  position = 'top',
  onClose 
}) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  const variants = {
    top: {
      initial: { y: -100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -100, opacity: 0 }
    },
    bottom: {
      initial: { y: 100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 100, opacity: 0 }
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'bg-gradient-to-r from-green-500/90 to-emerald-500/90 border-green-400';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-500/90 to-orange-500/90 border-yellow-400';
      case 'error':
        return 'bg-gradient-to-r from-red-500/90 to-rose-500/90 border-red-400';
      default:
        return 'bg-gradient-to-r from-purple-500/90 to-blue-500/90 border-blue-400';
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return 'solar:check-circle-bold';
      case 'warning':
        return 'solar:bell-bold';
      case 'error':
        return 'solar:danger-bold';
      default:
        return 'solar:info-circle-bold';
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={variants[position].initial}
          animate={variants[position].animate}
          exit={variants[position].exit}
          transition={{ 
            type: "spring", 
            stiffness: 300,
            damping: 25
          }}
          className={cn(
            "fixed left-1/2 transform -translate-x-1/2 z-50",
            position === 'top' ? 'top-4' : 'bottom-4',
            "p-4 rounded-xl shadow-lg",
            "backdrop-blur-md border",
            "flex items-center gap-3 min-w-[320px] max-w-[90vw]",
            getVariantStyles()
          )}
        >
          <Icon 
            icon={getIcon()} 
            className="w-5 h-5 text-white"
          />
          <span className="flex-1 text-white font-medium">{message}</span>
          <button 
            onClick={handleClose} 
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
            type="button"
          >
            <Icon icon="solar:close-circle-bold" className="w-5 h-5 text-white" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;