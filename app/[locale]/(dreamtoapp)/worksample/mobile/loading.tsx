import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <div className={cn(
      "min-h-screen w-full",
      "py-4 sm:py-6 md:py-8",
      "px-2 sm:px-4 md:px-6",
      "bg-gradient-to-br from-background via-background/98 to-background/95"
    )}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header Skeleton */}
        <div className={cn(
          "mb-6 sm:mb-8 md:mb-12 text-center",
          "px-2 sm:px-4"
        )}>
          <Skeleton className="h-8 sm:h-10 md:h-12 w-[200px] sm:w-[300px] mx-auto mb-2 sm:mb-4" />
          <Skeleton className="h-4 sm:h-5 w-[280px] sm:w-[400px] mx-auto" />
        </div>

        {/* Grid Skeleton */}
        <div className={cn(
          "grid gap-2 sm:gap-3 md:gap-4",
          "grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
          "p-2 sm:p-4",
          "place-items-center"
        )}>
          {Array.from({ length: 13 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "relative flex items-center justify-center",
                "w-full max-w-[200px] min-h-[120px]",
                "rounded-xl",
                "bg-gradient-to-br from-secondary via-secondary/90 to-secondary/80",
                "border border-border/30",
                "flex-col gap-1.5 sm:gap-2",
                "p-3 sm:p-4"
              )}
            >
              <Skeleton className="h-6 w-6 rounded-full mb-2" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}