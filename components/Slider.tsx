"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ImageDialog } from "./Image-Dailog";

export interface CarouselImage {
  id?: string;
  url?: string;
  title?: string;
  alt?: string;
  published?: boolean; // Optional
  createdAt?: Date; // Optional
  faqId?: string; // Optional
}

export interface CarouselProps {
  images?: CarouselImage[]; // Use the full CarouselImage type
  autoplayDelay?: number;
  className?: string;
}

export default function Slider({
  images,
  autoplayDelay = 4000,
  className,
}: CarouselProps) {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: true })
  );

  React.useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!images?.length) return null;

  return (
    <div className={cn("w-full max-w-7xl mx-auto px-4", className)}>
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full relative"
        opts={{
          align: "center",
          slidesToScroll: 1,
          loop: true,
        }}
      >
        {/* Arrows */}
        <div className="bg-red-400 w-full z-50">
          <CarouselPrevious className=" flex absolute bottom-0 left-2 z-10" />
          <CarouselNext className=" flex right-2 z-10" />
        </div>

        <CarouselContent className="-ml-0 px-8">
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/4 pl-5"
            >
              <Card className="border-0">
                <CardContent className="p-0">
                  <div className="relative w-full h-[150px]">
                    <ImageDialog
                      src={image.url || ""}
                      alt={image.url || image.url || `Slide ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Dots */}
        <div className="py-4 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                current === index ? "bg-primary w-4" : "bg-muted"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
