"use client";

import * as React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ImageDialogProps {
  src: string;
  alt?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "portrait";
  width?: number;
  height?: number;
}

export function ImageDialog({
  src,
  alt,
  className,
  aspectRatio = "portrait",
  width = 1080,
  height = 1920,
}: ImageDialogProps) {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            "overflow-hidden rounded-lg cursor-zoom-in relative w-[200px] h-[200px] ",
            className
          )}
        >
          <Image
            src={src}
            alt={alt || ""}
            width={width}
            height={height}
            className={cn(
              "object-cover transition-all hover:scale-105",
              aspectRatio === "portrait" && "aspect-[3/4]",
              aspectRatio === "square" && "aspect-square",
              aspectRatio === "video" && "aspect-video",
              isLoading ? "scale-110 blur-lg" : "scale-100 blur-0"
            )}
            onLoadingComplete={() => setIsLoading(false)}
          />
          {isLoading && (
            <Skeleton
              className={cn(
                "absolute inset-0",
                aspectRatio === "portrait" && "aspect-[3/4]",
                aspectRatio === "square" && "aspect-square",
                aspectRatio === "video" && "aspect-video"
              )}
            />
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>View </DialogTitle>
        </DialogHeader>
        <div className="relative w-full h-[calc(100vh-8rem)] flex items-center justify-center  ">
          <Image
            src={src}
            alt={alt || ""}
            fill
            className="object-fill"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1080px"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
