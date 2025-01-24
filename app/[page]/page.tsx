import { notFound } from "next/navigation";
import staticData from "@/data/static.json";
import { Logo } from "@/components/ui/logo";

type StaticPage = "terms" | "privacy" | "about";

export async function generateStaticParams() {
  return [
    { page: "terms" },
    { page: "privacy" },
    { page: "about" },
  ];
}

export default function StaticPage({ params }: { params: { page: StaticPage } }) {
  const pageData = staticData[params.page];

  if (!pageData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FFFAF5]">
      <header className="pt-8 pb-4 px-4">
        <div className="max-w-3xl mx-auto">
          <Logo />
        </div>
      </header>
      
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold text-orange-600 mb-8">
          {pageData.title}
        </h1>
        
        {pageData.lastUpdated && (
          <p className="text-orange-500/60 mb-8 font-serif">
            Last updated: {pageData.lastUpdated}
          </p>
        )}

        <div className="space-y-8">
          {pageData.sections.map((section) => (
            <section key={section.heading} className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-orange-700">
                {section.heading}
              </h2>
              <p className="text-orange-900/80 leading-relaxed font-serif">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
} 