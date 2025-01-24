"use client";

import type { ImageSearchResult } from '@/types/search';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ImageSourcesProps {
  sources: ImageSearchResult[];
  displayCount: number;
}

export default function ImageSources({ sources, displayCount }: ImageSourcesProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Carousel className="w-full" opts={{ 
        loop: true,
        align: "start",
        containScroll: "trimSnaps"
      }}>
        <CarouselContent>
          {sources.slice(0, displayCount).map((source) => (
            <CarouselItem key={source.link}>
              <a 
                href={source.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative block w-full overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image 
                    src={source.imageUrl}
                    alt={source.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white">
                  <p className="text-sm truncate">{source.title}</p>
                  <div className="flex items-center gap-2">
                    <div className="relative overflow-hidden rounded-full w-4 h-4">
                      <div className="absolute inset-0 rounded-full bg-white" />
                      <img
                        src={`https://www.google.com/s2/favicons?sz=128&domain=${new URL(source.link).hostname}`}
                        alt=""
                        className="relative block w-full h-full"
                      />
                      <div className="absolute inset-0 rounded-full border border-white/10" />
                    </div>
                    <p className="text-xs text-gray-300">{source.source}</p>
                  </div>
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
}
