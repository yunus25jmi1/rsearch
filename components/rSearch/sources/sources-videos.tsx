"use client";

import type { VideoSearchResult } from '@/types/search';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export const runtime = "edge";

interface VideoSourcesProps {
  sources: VideoSearchResult[];
  displayCount: number;
}

export default function VideoSources({ sources = [], displayCount }: VideoSourcesProps) {
  const validSources = sources?.filter(source => 
    source?.link && 
    source?.title
  ) ?? [];
  
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <Carousel className="w-full" opts={{ 
        loop: true,
        align: "center",
        containScroll: "trimSnaps",
        slidesToScroll: 1,
        dragFree: true
      }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {!validSources.length ? (
            <CarouselItem className="pl-2 md:pl-4 basis-full">
              <div className="w-full min-h-[240px] flex items-center justify-center rounded-lg bg-gray-50/50">
                <p className="text-gray-500">No video results found</p>
              </div>
            </CarouselItem>
          ) : validSources.slice(0, displayCount).map((source) => (
            <CarouselItem key={source.link} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/2 min-h-[240px]">
              <a 
                href={source.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative block w-full overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
              >
                <div className="relative aspect-video w-full">
                  <div className="absolute inset-0 bg-gray-100 animate-pulse" />
                  {source.imageUrl && (
                    <Image 
                      src={source.imageUrl.split('?')[0]}
                      alt={source.title}
                      fill
                      className="object-cover transition-opacity duration-300 opacity-0"
                      unoptimized
                      onLoadingComplete={(img) => {
                        img.classList.remove('opacity-0');
                      }}
                      onLoad={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.classList.remove('opacity-0');
                      }}
                      loading="eager"
                      priority
                    />
                  )}
                  {source.duration && (
                    <span className="absolute bottom-2 right-2 bg-black/75 z-10 text-white text-xs px-1.5 py-0.5 rounded">
                      {source.duration}
                    </span>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white">
                  <p className="text-sm line-clamp-2">{source.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="relative overflow-hidden rounded-full w-4 h-4">
                      <div className="absolute inset-0 rounded-full bg-white" />
                      {(() => {
                        try {
                          const hostname = new URL(source.link).hostname;
                          return (
                            <img
                              src={`https://www.google.com/s2/favicons?sz=128&domain=${hostname}`}
                              alt=""
                              className="relative block w-full h-full"
                            />
                          );
                        } catch {
                          return null;
                        }
                      })()}
                      <div className="absolute inset-0 rounded-full border border-white/10" />
                    </div>
                    <p className="text-xs text-white">{source.channel || source.source || 'YouTube'}</p>
                  </div>
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        {validSources.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-2 -translate-y-1/2 bg-white/80 hover:bg-white/90 border-0 h-8 w-8 md:h-10 md:w-10" />
            <CarouselNext className="absolute right-2 -translate-y-1/2 bg-white/80 hover:bg-white/90 border-0 h-8 w-8 md:h-10 md:w-10" />
          </>
        )}
      </Carousel>
    </div>
  );
}
