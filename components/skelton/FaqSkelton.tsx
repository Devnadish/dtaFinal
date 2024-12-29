import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function FaqSkelton() {
  return (
    <article className="group relative animate-in fade-in-50 duration-500">
      <Card className="border border-gray-200 dark:border-gray-800 
        bg-white dark:bg-gray-900 rounded-xl shadow-sm
        relative overflow-hidden">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]
          bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Status Indicator Skeleton */}
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full 
          animate-pulse bg-gradient-to-r from-gray-200 to-gray-300
          dark:from-gray-700 dark:to-gray-600" />

        <CardHeader className="p-6 bg-gradient-to-br from-gray-50/80 via-gray-50/40 to-transparent 
          dark:from-gray-800/80 dark:via-gray-800/40 dark:to-transparent 
          border-b border-gray-100 dark:border-gray-800">
          <header className="space-y-4">
            {/* Metadata section skeleton with staggered animation */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4
              p-3 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
              <div className="flex items-center gap-2 animate-in slide-in-from-left-5 duration-300">
                {[24, 20].map((width, i) => (
                  <Skeleton 
                    key={i}
                    className={cn(
                      "h-4",
                      `w-${width} animate-pulse`,
                      i === 0 ? "delay-100" : "delay-200"
                    )}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 animate-in slide-in-from-right-5 duration-300">
                {[16, 16].map((width, i) => (
                  <Skeleton 
                    key={i}
                    className={cn(
                      "h-4",
                      `w-${width} animate-pulse`,
                      i === 0 ? "delay-300" : "delay-400"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Question skeleton with staggered lines */}
            <div className="mt-2 px-3 space-y-2">
              {[75, 50].map((width, i) => (
                <Skeleton 
                  key={i}
                  className={cn(
                    i === 0 ? "h-6" : "h-4",
                    `w-${width}% animate-pulse`,
                    `delay-[${(i + 5) * 100}ms]`
                  )}
                />
              ))}
            </div>
          </header>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Tags skeleton with varied widths */}
          <nav className="flex flex-wrap gap-2 px-3 py-2
            bg-gray-50/50 dark:bg-gray-800/50 rounded-lg
            animate-in slide-in-from-bottom-5 duration-300 delay-500">
            {[16, 20, 14].map((width, i) => (
              <Skeleton 
                key={i}
                className={cn(
                  "h-6",
                  `w-${width} animate-pulse`,
                  `delay-[${(i + 8) * 100}ms]`
                )}
              />
            ))}
          </nav>

          {/* Answer skeleton with dynamic lines */}
          <section className="pt-6 border-t border-gray-100 dark:border-gray-800
            animate-in slide-in-from-bottom-5 duration-300 delay-700">
            <div className="px-3 py-2 bg-white dark:bg-gray-900 rounded-lg space-y-2">
              {[100, 85, 65].map((width, i) => (
                <Skeleton 
                  key={i}
                  className={cn(
                    "h-4",
                    `w-${width}% animate-pulse`,
                    `delay-[${(i + 11) * 100}ms]`
                  )}
                />
              ))}
            </div>
          </section>

          {/* Footer skeleton with smooth animations */}
          <footer className="pt-6 border-t border-gray-100 dark:border-gray-800
            animate-in slide-in-from-bottom-5 duration-300 delay-1000">
            <div className="px-3 py-2 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {[24, 24].map((width, i) => (
                    <Skeleton 
                      key={i}
                      className={cn(
                        "h-8",
                        `w-${width} animate-pulse`,
                        `delay-[${(i + 14) * 100}ms]`
                      )}
                    />
                  ))}
                </div>
                <Skeleton className="h-10 w-32 animate-pulse delay-\[1600ms\]" />
              </div>
            </div>
          </footer>
        </CardContent>
      </Card>
    </article>
  );
}