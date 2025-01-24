"use client";

import type { ShoppingSearchResult } from '@/types/search';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ShoppingSourcesProps {
  sources: ShoppingSearchResult[];
  displayCount: number;
}

export default function ShoppingSources({ sources, displayCount }: ShoppingSourcesProps) {
  const displayedSources = sources.slice(0, displayCount);

  return (
    <div className="w-full px-4 space-y-4">
      <Carousel className="w-full" opts={{ 
        loop: true,
        align: "center",
        containScroll: "trimSnaps",
        slidesToScroll: 1,
        dragFree: true
      }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {!displayedSources.length ? (
            <CarouselItem className="pl-2 md:pl-4 basis-full">
              <div className="w-full min-h-[200px] flex items-center justify-center rounded-lg bg-gray-100/80">
                <p className="text-gray-500">No shopping results found</p>
              </div>
            </CarouselItem>
          ) : displayedSources.map((source) => (
            <CarouselItem key={source.link} className="pl-2 md:pl-4 basis-full sm:basis-3/4 lg:basis-2/3">
              <Link 
                href={source.link}
                target="_blank"
                className="group flex w-full h-full cursor-pointer items-stretch"
              >
                <div className="group relative flex w-full items-stretch rounded-lg transition duration-300 bg-gray-50/50 hover:bg-gray-100/50 border border-gray-200 h-full">
                  <div className="flex w-full flex-row">
                    <div className="relative w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] border-r border-gray-100 flex-shrink-0">
                      {source.imageUrl && (
                        <Image
                          src={source.imageUrl}
                          alt={source.title}
                          fill
                          className="object-contain p-2"
                          unoptimized
                        />
                      )}
                    </div>
                    <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0 overflow-hidden">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <div className="relative flex-none">
                            <div className="relative overflow-hidden rounded-full">
                              <div className="absolute inset-0 rounded-full bg-white" />
                              <img
                                src={`https://www.google.com/s2/favicons?sz=128&domain=${new URL(source.link).hostname}`}
                                alt=""
                                width="16"
                                height="16"
                                className="relative block w-4 h-4"
                              />
                              <div className="absolute inset-0 rounded-full border border-black/10" />
                            </div>
                          </div>
                          <span className="text-xs text-gray-600 truncate">{source.source}</span>
                        </div>
                        
                        <h3 className="line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-blue-600 leading-snug">
                          {source.title}
                        </h3>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-bold text-gray-900">
                            {source.price}
                          </span>
                          {source.delivery && (
                            <span className="text-[10px] text-green-600 truncate">
                              {source.delivery}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 text-[10px] min-w-0">
                          {source.rating && (
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <span className="text-yellow-400">★</span>
                              <span className="text-gray-600 whitespace-nowrap flex-shrink-0">
                                {source.rating}
                                {source.ratingCount && (
                                  <span className="text-gray-500 ml-1 sm:ml-1.5">
                                    ({source.ratingCount})
                                  </span>
                                )}
                              </span>
                            </div>
                          )}
                          {source.offers && (
                            <span className="text-blue-600 whitespace-nowrap flex-shrink-0">
                              {source.offers} offers
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        {displayedSources.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-2 -translate-y-1/2 bg-white/80 hover:bg-white/90 border-0 h-8 w-8 md:h-10 md:w-10" />
            <CarouselNext className="absolute right-2 -translate-y-1/2 bg-white/80 hover:bg-white/90 border-0 h-8 w-8 md:h-10 md:w-10" />
          </>
        )}
      </Carousel>
    </div>
  );
}
