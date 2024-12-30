"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import BackButton from "@/components/ui/BackButton";
import ToggleVisibilityButton from "./ToggleVisibilityButton";
import { usePathname } from "next/navigation";
import SkeletonUi from "./SkeltionUi";
import dynamic from "next/dynamic";

const ContactUs = dynamic(
  () => import("@/components/headerAndFotter/fotter/ContactUs"),
  {
    ssr: false,
    loading: () => <SkeletonUi />,
  }
);
const LangSwicher = dynamic(
  () => import("@/components/headerAndFotter/fotter/LangSwicher"),
  {
    ssr: false,
    loading: () => <SkeletonUi />,
  }
);
const ThemeSwicher = dynamic(
  () => import("@/components/headerAndFotter/fotter/ThemeSwitch"),
  {
    ssr: false,
    loading: () => <SkeletonUi />,
  }
);
const WhatsAppButton = dynamic(
  () => import("@/components/headerAndFotter/fotter/WhatsAppButton"),
  {
    ssr: false,
    loading: () => <SkeletonUi />,
  }
);

const Logout = dynamic(
  () => import("@/components/headerAndFotter/fotter/Logout"),
  {
    ssr: false,
    loading: () => <SkeletonUi />,
  }
);



export default function FooterBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [showLangSwitcher, setShowLangSwitcher] = useState(true);

  const pathname = usePathname();
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setShowLangSwitcher(pathname.includes("showdetail"));
  };



  return (
    <footer className="fixed right-4 bottom-20 h-[300px] w-[50px] flex items-center justify-center transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, height: 0, scale: 0.9 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          height: isVisible ? "300px" : 0,
          scale: isVisible ? 1 : 0.9,
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
          opacity: { duration: 0.3 },
          scale: { duration: 0.4 },
        }}
        className="border border-border/40 rounded-full flex flex-col w-[50px] items-center 
                  transition-all bg-background/80 backdrop-blur-sm h-[300px] justify-around 
                  shadow-lg hover:shadow-xl hover:bg-background/90 
                  dark:shadow-secondary/20"
      >
        <div className="flex flex-col gap-4 py-4 items-center justify-center">
          <WhatsAppButton />
          <ContactUs />
          {!showLangSwitcher && <LangSwicher />}
          <ThemeSwicher />
          <Logout />
        </div>
      </motion.div>

      <ToggleVisibilityButton
        onClick={toggleVisibility}
        isVisible={isVisible}
      />
      <BackButton />

    </footer>
  );
}