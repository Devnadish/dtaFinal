import Text from "@/components/Text";
import { getLocale } from "next-intl/server";
import React from "react";

interface SectionTitleProps {
  title: string;
  icon: React.ReactNode;
}

const SectionTitle = async ({ title, icon }: SectionTitleProps) => {
  const locale = await getLocale();

  return (
    <div className="flex flex-row items-center justify-between w-full bg-gradient-to-r from-secondary/90 to-secondary/70 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/20 hover:border-gray-200/30 group">
      {/* Icon with a subtle rotation and scale effect on hover */}
      <div className="transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
        {icon}
      </div>

      {/* Text with a modern underline animation and hover effect */}
      <Text
        variant="h2"
        locale={locale}
        className="font-semibold text-xl md:text-2xl relative 
          after:content-[''] after:absolute after:bottom-0 after:left-0 
          after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-primary after:to-primary/70 
          after:transition-all after:duration-500 group-hover:after:w-full 
          group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary/70 
          transition-colors duration-500"
      >
        {title}
      </Text>
    </div>
  );
};

export default SectionTitle;