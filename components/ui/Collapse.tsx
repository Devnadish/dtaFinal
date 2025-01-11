"use client";

import * as React from "react";
import { Icon } from "@iconify/react"; // Import Iconify
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CollapsibleComponentProps {
  title: React.ReactNode; // Title for the collapsible section
  children: React.ReactNode; // Content to be collapsible
  className?: string; // Optional className for the root element
}

export function CollapsibleComponent({
  title,
  children,
  className,
}: CollapsibleComponentProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={`w-full space-y-2 ${className}`}
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        {title}
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <Icon
              icon={
                isOpen ? "lucide:chevrons-up-down" : "lucide:chevrons-up-down"
              } // Iconify icon
              className="h-4 w-4"
            />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">{children}</CollapsibleContent>
    </Collapsible>
  );
}
