import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header Skeleton */}
      <div className="text-center space-y-4 mb-12">
        <Skeleton className="h-12 w-3/4 mx-auto max-w-2xl" />
        <Skeleton className="h-6 w-2/4 mx-auto max-w-xl" />
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Basic Plan Skeleton */}
        <div className="relative flex justify-between flex-col group border border-gray-200 rounded-lg p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>

        {/* Standard Plan Skeleton */}
        <div className="relative flex justify-between flex-col group border-2 border-purple-500 rounded-lg p-6">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <Skeleton className="h-6 w-32 rounded-full" />
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <Skeleton className="h-12 w-full rounded-lg bg-gradient-to-r from-purple-600/30 to-blue-600/30" />
          </div>
        </div>

        {/* Premium Plan Skeleton */}
        <div className="relative flex justify-between flex-col group border border-gray-200 rounded-lg p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* Bottom CTA Skeleton */}
      <div className="mt-16 text-center">
        <Skeleton className="h-6 w-64 mx-auto mb-6" />
        <Skeleton className="h-14 w-48 rounded-lg mx-auto" />
      </div>
    </div>
  );
};

export default Loading;