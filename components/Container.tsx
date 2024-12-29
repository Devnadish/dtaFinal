import { Directions } from "@/constant/enums";
import { cn } from "@/lib/utils";

interface BodyContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const maxWidthClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full"
};

function BodyContainer({
  children,
  className,
  maxWidth = "xl",
}: BodyContainerProps) {
  return (
    <div className={cn(
      "relative w-full mx-auto",
      "min-h-[calc(100vh-120px)]",
      "flex flex-col items-center justify-start",
      "px-4 sm:px-6 md:px-8",
      "py-6 sm:py-8 md:py-10",
      "bg-background/50 backdrop-blur-sm",
      "border-x border-border/5",
      "shadow-[0_-1px_0_rgba(0,0,0,0.1)_inset]",
      maxWidthClasses[maxWidth],
      className
    )}
    >
      {children}
    </div>
  );
}

export default BodyContainer;