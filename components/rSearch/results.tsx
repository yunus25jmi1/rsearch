'use client';

import Markdown from 'react-markdown';
export const runtime = "edge";
interface ResultsProps {
  isAiLoading: boolean;
  aiResponse: string | null;
  aiError: string | null;
  isAiComplete: boolean;
  searchResults: {
    peopleAlsoAsk?: {
      question: string;
      snippet: string;
      link: string;
    }[];
    relatedSearches?: {
      query: string;
    }[];
  } | null;
  mode: string;
  generateSearchId: (query: string, mode: string) => string;
  getWebsiteName: (url: string) => string;
}

export default function Results({ 
  isAiLoading,
  aiResponse,
  aiError,
  isAiComplete,
  searchResults,
  mode,
  generateSearchId,
  getWebsiteName
}: ResultsProps) {
  return (
    <div className="w-full">
      <div className="prose prose-orange max-w-none space-y-8 overflow-x-hidden w-full max-w-[95vw] md:max-w-full">
        {/* AI Response Section */}
        {isAiLoading && !aiResponse && (
          <div className="bg-orange-50/50 rounded-lg p-6">
            <div className="space-y-3">
              <div className="h-4 bg-orange-100/50 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-orange-100/50 rounded w-1/2 animate-pulse" />
              <div className="h-4 bg-orange-100/50 rounded w-2/3 animate-pulse" />
            </div>
          </div>
        )}
        
        {aiError && (
          <div className="bg-orange-50/50 rounded-lg p-6 text-center">
            <p className="text-orange-600">Sorry, we could not generate an AI response.</p>
            <p className="text-sm text-orange-500 mt-2">{aiError}</p>
          </div>
        )}
        
        {aiResponse && (
          <>
            {/* AI Response */}
            <div className="rounded-lg p-6 shadow-sm w-full max-w-[95vw] md:max-w-full">
              <div className="prose prose-orange max-w-none overflow-x-hidden w-full max-w-[95vw] md:max-w-full">
                <Markdown
                  components={{
                    h1: ({...props}) => (
                      <h1 {...props} className="text-2xl font-bold text-orange-600  mb-4" />
                    ),
                    h2: ({...props}) => (
                      <h2 {...props} className="text-xl font-bold text-orange-600  mt-6 mb-3" />
                    ),
                    h3: ({...props}) => (
                      <h3 {...props} className="text-lg font-bold text-orange-600  mt-4 mb-2" />
                    ),
                    h4: ({...props}) => (
                      <h4 {...props} className="text-base font-bold text-orange-600  mt-4 mb-2" />
                    ),
                    h5: ({...props}) => (
                      <h5 {...props} className="text-base font-bold text-orange-600  mt-4 mb-2" />
                    ),
                    h6: ({...props}) => (
                      <h6 {...props} className="text-base font-bold text-orange-600  mt-4 mb-2" />
                    ),
                    table: ({...props}) => (
                      <div className="overflow-x-auto">
                        <table {...props} className="min-w-full divide-y divide-gray-200 border border-gray-200" />
                      </div>
                    ),
                    thead: ({...props}) => (
                      <thead {...props} className="bg-orange-50" />
                    ),
                    tbody: ({...props}) => (
                      <tbody {...props} className="bg-white divide-y divide-gray-200" />
                    ),
                    tr: ({...props}) => (
                      <tr {...props} className="hover:bg-orange-50/50 transition-colors" />
                    ),
                    th: ({...props}) => (
                      <th {...props} className="px-6 py-3 text-left text-sm font-semibold text-orange-600" />
                    ),
                    td: ({...props}) => (
                      <td {...props} className="px-6 py-4 text-sm text-gray-700 whitespace-normal" />
                    ),
                    img: ({...props}) => (
                      <img {...props} alt={props.alt || ''} className="w-full h-auto rounded-lg" />
                    ),
                    p: ({children, ...props}) => {
                      // Get text content from React children
                      const content = Array.isArray(children) 
                        ? children
                            .map(child => {
                              if (typeof child === 'string') return child;
                              if (child && typeof child === 'object' && 'props' in child) {
                                return child.props.children || '';
                              }
                              return '';
                            })
                            .join('')
                        : children?.toString() || '';
                      
                      // Check if content looks like a table
                      if (content.includes('|')) {
                        const lines = content.split('\n').filter(line => line.trim());
                        
                        // Only process as table if we have header and separator rows
                        if (lines.length >= 2 && lines[1].includes('-')) {
                          // Parse table rows, excluding separator row
                          const tableRows = lines
                            .filter(line => !line.includes('---'))
                            .map(line => {
                              // Split by | and clean each cell
                              const cells = line.split('|')
                                .map(cell => cell.trim())
                                .filter(cell => cell);
                              
                              // Return null if no valid cells (helps filter empty rows)
                              return cells.length > 0 ? cells : null;
                            })
                            .filter((row): row is string[] => row !== null);

                          if (tableRows.length > 0) {
                            return (
                              <div className="overflow-x-auto my-4">
                                <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                                  <thead className="bg-orange-50">
                                    <tr>
                                      {tableRows[0].map((header) => (
                                        <th key={`header-${header}`} className="px-6 py-3 text-left text-sm font-semibold text-orange-600">
                                          {header}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {tableRows.slice(1).map((row) => (
                                      <tr key={`row-${row.join('-')}`} className="hover:bg-orange-50/50 transition-colors">
                                        {row.map((cell) => (
                                          <td key={`cell-${cell}`} className="px-6 py-4 text-sm text-gray-700 whitespace-normal">
                                            {cell}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            );
                          }
                        }
                      }
                      
                      // Regular paragraph
                      return <p {...props} className="text-gray-700 mb-4 leading-relaxed">{children}</p>;
                    },
                    ul: ({...props}) => (
                      <ul {...props} className="list-disc pl-6 mb-4 space-y-2 marker:text-orange-500" />
                    ),
                    ol: ({...props}) => (
                      <ol {...props} className="list-decimal pl-6 mb-4 space-y-2 marker:text-orange-500" />
                    ),
                    li: ({...props}) => (
                      <li {...props} className="text-gray-700" />
                    ),
                    a: ({...props}) => (
                      <a 
                        {...props} 
                        className="text-orange-600 hover:text-orange-700 font-medium underline decoration-orange-200 hover:decoration-orange-500 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    ),
                    blockquote: ({...props}) => (
                      <blockquote {...props} className="border-l-4 border-orange-200 pl-4 italic my-4 text-gray-600" />
                    ),
                    strong: ({...props}) => (
                      <strong {...props} className="font-bold text-orange-600" />
                    ),
                    em: ({...props}) => (
                      <em {...props} className="italic text-orange-600/90" />
                    ),
                    code: ({...props}) => (
                      <code {...props} className="bg-orange-50 text-orange-600 rounded px-1.5 py-0.5 text-sm font-mono" />
                    ),
                  }}
                >
                  {aiResponse.replace(/content:/g, '')}
                </Markdown>
              </div>
              <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-orange-100">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(aiResponse.replace(/content:/g, ''));
                  }}
                  className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    aria-label="Copy to clipboard"
                    role="img"
                  >
                    <title>Copy to clipboard</title>
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const markdown = aiResponse.replace(/content:/g, '');
                    const blob = new Blob([markdown], { type: 'text/markdown' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'response.md';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    aria-label="Download markdown"
                    role="img"
                  >
                    <title>Download markdown</title>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Search Results Sections */}
        {isAiComplete && searchResults && (
            <div className="space-y-8">
            {/* People Also Ask */}
            {searchResults.peopleAlsoAsk && searchResults.peopleAlsoAsk.length > 0 && (
                  <div className="pt-8">
                    <h2 className="text-xl  text-orange-600 mb-4">People Also Ask</h2>
                    <div className="space-y-3">
                      {searchResults.peopleAlsoAsk.map((item) => (
                        <div 
                          key={`paa-${item.question}`}
                          className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              window.location.href = `/rsearch/${generateSearchId(item.question, mode)}?q=${encodeURIComponent(item.question)}&mode=${mode}`;
                            }}
                            className="w-full text-left"
                          >
                            <h3 className="text-base font-medium text-gray-900 mb-2">
                              {item.question}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {item.snippet}
                            </p>
                            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                              <div className="relative flex-none">
                                <div className="relative overflow-hidden rounded-full">
                                  <img
                                    src={`https://www.google.com/s2/favicons?sz=128&domain=${new URL(item.link).hostname}`}
                                    alt={`Favicon for ${getWebsiteName(item.link)}`}
                                    width="16"
                                    height="16"
                                    className="relative block w-4 h-4"
                                  />
                                </div>
                              </div>
                              <span>{getWebsiteName(item.link)}</span>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Searches */}
                {searchResults.relatedSearches && searchResults.relatedSearches.length > 0 && (
                  <div className="pt-8">
                    <h2 className="text-xl  text-orange-600 mb-4">Related Searches</h2>
                    <div className="flex flex-wrap gap-2">
                      {searchResults.relatedSearches.map((item) => (
                        <button
                          type="button"
                          key={`rs-${item.query}`}
                          onClick={() => {
                            window.location.href = `/rsearch/${generateSearchId(item.query, mode)}?q=${encodeURIComponent(item.query)}&mode=${mode}`;
                          }}
                          className="px-4 py-2 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium transition-colors"
                        >
                          {item.query}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
          </div>
        )}

        {/* Loading State */}
        {!aiResponse && !aiError && !searchResults && (
          <div className="bg-orange-50/50 rounded-lg p-6 text-center">
            <p className="text-orange-600">Preparing your results...</p>
          </div>
        )}
      </div>
    </div>
  );
}
