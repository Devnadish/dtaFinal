import { Skeleton } from "@/components/ui/skeleton";
import BodyContainer from "@/components/Container";

export default function Loading() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-16">
      <BodyContainer className="gap-8">
        {/* First Section */}
        <LoadingSection />
        {/* Second Section */}
        <LoadingSection />
      </BodyContainer>
    </main>
  );
}

const LoadingSection = () => (
  <div className="w-full space-y-6">
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-8 w-[200px]" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  </div>
);