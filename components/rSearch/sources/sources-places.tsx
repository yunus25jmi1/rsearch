"use client";

import { PlaceSearchResult } from '@/types/search';
import { MapPin, Phone, Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PlaceSourcesProps {
  sources: PlaceSearchResult[];
  displayCount: number;
}

export default function PlaceSources({ sources = [], displayCount }: PlaceSourcesProps) {
  const validSources = sources?.filter(source => 
    source?.title && 
    source?.address
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
              <div className="w-full min-h-[240px] flex items-center justify-center rounded-lg bg-gray-100/80">
                <p className="text-gray-500">No place results found</p>
              </div>
            </CarouselItem>
          ) : validSources.slice(0, displayCount).map((source) => (
            <CarouselItem key={source.cid} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/2 h-[180px]">
              <div className="bg-gray-50/70 rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow space-y-2 h-full overflow-y-auto">
                <div className="space-y-1">
                  <h3 className="font-medium line-clamp-1 text-sm">{source.title}</h3>
                  <p className="text-xs text-gray-500">{source.category}</p>
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{source.rating}</span>
                  <span className="text-gray-500">({source.ratingCount} reviews)</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <p className="text-gray-600">{source.address}</p>
                  </div>

                  {source.phoneNumber && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5" />
                      <a 
                        href={`tel:${source.phoneNumber}`}
                        className="text-blue-600 hover:underline"
                      >
                        {source.phoneNumber}
                      </a>
                    </div>
                  )}

                  {source.website && (
                    <div className="flex items-center gap-2">
                      <div className="relative flex-none">
                        <div className="relative overflow-hidden rounded-full">
                          <div className="absolute inset-0 rounded-full bg-white" />
                          <img
                            src={`https://www.google.com/s2/favicons?sz=128&domain=${new URL(source.website).hostname}`}
                            alt=""
                            width="14"
                            height="14"
                            className="relative block w-3.5 h-3.5"
                          />
                          <div className="absolute inset-0 rounded-full border border-black/10" />
                        </div>
                      </div>
                      <a 
                        href={source.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline truncate"
                      >
                        {new URL(source.website).hostname.replace('www.', '')}
                      </a>
                    </div>
                  )}
                </div>
              </div>
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
