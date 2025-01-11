"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { incrementViewerCount } from "@/app/[locale]/(letsTalk)/detailquastion/[slug]/actions/detailQuastion";
import { useRouter } from "next/navigation";

import { Icon } from "@iconify/react";

const More = ({ slug, AnswerCount }: { slug: string; AnswerCount: number }) => {
  const router = useRouter();

  const handleMore = async () => {
    const viewerCount = await incrementViewerCount(slug);
    router.push(`/detailquastion/${slug}`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Stats Section */}
      <div className="flex items-center gap-3">
        <Counter
          icon={
            <Icon
              icon="mdi:replay"
              width={18}
              height={18}
              className="text-indigo-500"
            />
          }
          count={AnswerCount}
          label="Answers"
        />
        <Counter
          icon={
            <Icon
              icon="mdi:comment"
              width={18}
              height={18}
              className="text-emerald-500"
            />
          }
          count={0}
          label="Comments"
        />
      </div>

      {/* Action Button */}
      <Button
        onClick={handleMore}
        className="group relative px-4 py-2 w-full sm:w-auto
          bg-gradient-to-r from-indigo-500 to-indigo-600
          hover:from-indigo-600 hover:to-indigo-700
          text-white rounded-lg shadow-md hover:shadow-lg
          transition-all duration-200 overflow-hidden"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          Read More
          <Icon
            icon="lucide:chevron-right"
            className="w-4 h-4 transition-transform 
            group-hover:translate-x-1"
          />
        </span>
        <div
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0
          translate-x-[-100%] group-hover:translate-x-[100%]
          transition-transform duration-700"
        />
      </Button>
    </div>
  );
};

const Counter = ({
  icon,
  count,
  label,
}: {
  icon: React.ReactNode;
  count: number;
  label: string;
}) => {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 
      bg-white dark:bg-gray-900 rounded-lg
      border border-gray-200 dark:border-gray-700
      shadow-sm"
    >
      {icon}
      <div className="flex items-center gap-1.5">
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {count}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {label}
        </span>
      </div>
    </div>
  );
};

export default More;
