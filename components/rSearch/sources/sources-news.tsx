import type { NewsSearchResult } from '@/types/search';
import { useEffect, useState } from 'react';

interface NewsSourcesProps {
  sources: NewsSearchResult[];
  displayCount: number;
}

export default function NewsSources({ sources, displayCount }: NewsSourcesProps) {
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchOGImages = async () => {
      const newImageUrls: Record<string, string> = {};
      
      for (const source of sources) {
        if (!source.imageUrl || source.imageUrl.includes('favicon')) {
          try {
            const response = await fetch(`/api/og-image?url=${encodeURIComponent(source.link)}`);
            if (response.ok) {
              const data = await response.json();
              if (data.url) {
                newImageUrls[source.link] = data.url;
              }
            }
          } catch (error) {
            console.error('Error fetching OG image:', error);
          }
        }
      }
      
      setImageUrls(newImageUrls);
    };

    fetchOGImages();
  }, [sources]);

  return (
    <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3" id="news-sources">
      {sources.slice(0, displayCount).map((source, index) => (
        <div key={source.link} className="w-full">
          <a 
            href={source.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full cursor-pointer items-stretch"
          >
            <div className="group relative flex min-h-[100px] w-full items-stretch rounded-lg transition duration-300 bg-gray-50/50 hover:bg-gray-100/50">
              <div className="flex w-full flex-row">
                <div className="relative w-[100px] min-h-[100px] bg-gray-50">
                  <img 
                    src={imageUrls[source.link] || (source.imageUrl && !source.imageUrl.includes('favicon') ? source.imageUrl : undefined)} 
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover rounded-l-lg"
                    loading="lazy"
                    onError={(e) => {
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.style.display = 'none';
                      }
                    }}
                  />
                </div>
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <div className="flex items-start gap-2 flex-grow">
                    <div className="flex-none w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-500" id={`news-source-index-${index}`}>
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="line-clamp-2 text-left text-sm font-medium text-gray-900">
                        {source.title}
                      </div>
                      <div className="mt-1 line-clamp-2 text-xs text-gray-600">
                        {source.snippet}
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center gap-2">
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
                    <div className="flex-1 min-w-0 mt-1 mx-1">
                      <div className="text-xs font-medium text-gray-500 truncate">
                        {source.source || new URL(source.link).hostname}
                      </div>
                      {source.date && (
                        <div className="text-xs text-gray-400">
                          {source.date}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
