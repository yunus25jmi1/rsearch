import type { WebSearchResult } from '@/types/search';

interface WebSourcesProps {
  sources: WebSearchResult[];
  displayCount: number;
  getWebsiteName: (url: string) => string;
}

export default function WebSources({ sources, displayCount, getWebsiteName }: WebSourcesProps) {
  return (
    <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
      {sources.slice(0, displayCount).map((source, index) => (
        <div key={source.link} className="w-full">
          <a 
            href={source.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full cursor-pointer items-stretch h-full"
          >
            <div className="w-full">
              <div className="group relative flex min-h-[60px] w-full items-stretch h-full">
                <div className="flex w-full rounded-lg transition duration-300 bg-gray-50/50 hover:bg-gray-100/50">
                  <div className="items gap-2 pointer-events-none relative flex h-full max-w-full select-none flex-col justify-between p-3">
                    <div className="flex items-start gap-2 mb-1">
                      <div className="flex-none w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-500">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="line-clamp-2 text-left text-xs font-medium text-gray-900">
                          {source.title}
                        </div>
                        <div className="mt-1 line-clamp-2 text-xs text-gray-500">
                          {source.snippet}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 pl-7">
                      <div className="flex items-center gap-2">
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
                        <div className="line-clamp-1 break-all text-xs font-medium text-gray-500">
                          {getWebsiteName(source.link)}
                        </div>
                      </div>
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
