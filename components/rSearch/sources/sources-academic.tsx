import { AcademicSearchResult } from '@/types/search';
export const runtime = "edge";

interface AcademicSourcesProps {
  sources: AcademicSearchResult[];
  displayCount: number;
}

export default function AcademicSources({ sources, displayCount }: AcademicSourcesProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {sources.slice(0, displayCount).map((source) => (
        <div key={source.link} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
          <h3 className="font-medium mb-1 line-clamp-2">{source.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{source.snippet}</p>
          {source.authors && (
            <p className="text-xs text-gray-500 mt-1">Authors: {source.authors.join(', ')}</p>
          )}
        </div>
      ))}
    </div>
  );
} 