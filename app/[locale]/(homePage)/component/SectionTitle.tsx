import Text from "@/components/Text";
import React from "react";

interface SectionTitleProps {
  title: string;
  icon: React.ReactNode;
  locale: string
}

const SectionTitle = ({ title, icon, locale }: SectionTitleProps) => {
  return (
    <div className="flex items-center gap-4 group transition-all duration-300 ease-in-out">
      <div className="transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
        {icon}
      </div>
      <Text
        variant="h2"
        locale={locale}
        className="font-semibold text-lg md:text-xl relative 
          after:content-[''] after:absolute after:bottom-0 after:left-0 
          after:w-0 after:h-[2px] after:bg-primary after:transition-all 
          after:duration-300 group-hover:after:w-full 
          group-hover:text-primary transition-colors duration-300"
      >
        {title}
      </Text>
    </div>
  );
};

export default SectionTitle;