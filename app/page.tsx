"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Search, Globe, BookText, Video, 
  Zap, ShoppingBag, MapPin, 
  Newspaper, GraduationCap, Lightbulb 
} from "lucide-react";
import { SearchSource } from "@/types/search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Meteors } from "@/components/ui/meteors";
import { useState } from "react";
import { Logo } from "@/components/ui/logo";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [searchMode, setSearchMode] = useState<SearchSource | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const searchModes = [
    {
      id: 'search' as SearchSource,
      icon: Globe,
      label: 'Web',
      description: 'Search across the entire internet'
    },
    {
      id: 'images' as SearchSource,
      icon: BookText,
      label: 'Images',
      description: 'Find images and visual content'
    },
    {
      id: 'videos' as SearchSource,
      icon: Video,
      label: 'Videos',
      description: 'Discover and watch videos'
    },
    {
      id: 'news' as SearchSource,
      icon: Newspaper,
      label: 'News',
      description: 'Latest news and updates'
    },
    {
      id: 'places' as SearchSource,
      icon: MapPin,
      label: 'Places',
      description: 'Find locations and businesses'
    },
    {
      id: 'shopping' as SearchSource,
      icon: ShoppingBag,
      label: 'Shopping',
      description: 'Search for products and deals'
    },
    {
      id: 'scholar' as SearchSource,
      icon: GraduationCap,
      label: 'Scholar',
      description: 'Search academic papers and research'
    },
    {
      id: 'patents' as SearchSource,
      icon: Lightbulb,
      label: 'Patents',
      description: 'Search patent databases'
    }
  ];

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    router.push(`/rsearch/?q=${encodeURIComponent(searchTerm)}&mode=${searchMode || 'web'}`);
  };

  return (
    <div className="flex-1 flex flex-col min-h-full">
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <Logo />
          <p className="text-orange-500 text-sm">AI-powered search with advanced reasoning capabilities</p>
        </div>

        {/* Search Section */}
        <div className="mt-4 w-full max-w-2xl">
          <div className="relative group">
            <Meteors number={30} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFE4DE] to-[#FFD4CC] rounded-3xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative flex flex-col gap-4 bg-white rounded-3xl p-4 shadow-lg">
              {/* Search Input Area */}
              <div className="relative">
                <div 
                  className="absolute left-4 top-4 mt-4 text-orange-500"
                >
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 52 55" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-labelledby="starIconTitle"
                  >
                    <title id="starIconTitle">rSearch Logo</title>
                    <path 
                      d="M23.0344 0.5H29.6344C32.1544 0.5 33.1144 1.34 32.8744 3.62L31.5544 17.42C31.4344 18.26 31.9144 18.5 32.5144 17.9L43.5544 9.98C45.8344 8.66 46.7944 8.78 47.9944 11.18L51.2344 16.7C52.5544 18.86 52.1944 20.18 49.9144 21.14L37.1944 27.02C36.7144 27.38 36.7144 27.74 37.1944 27.98L49.9144 33.74C52.1944 34.82 52.5544 36.02 51.1144 38.06L47.9944 43.7C46.7944 45.74 45.5944 46.22 43.5544 44.9L32.5144 36.62C32.0344 36.14 31.4344 36.5 31.5544 37.22L32.6344 51.38C32.8744 53.78 32.0344 54.5 29.6344 54.5H23.0344C20.6344 54.5 19.7944 53.78 19.9144 51.38L21.2344 37.22C21.3544 36.5 20.8744 36.14 20.2744 36.62L8.99436 44.9C7.07436 46.22 5.87436 45.74 4.67436 43.7L1.55436 38.06C0.23436 36.02 0.35436 34.82 2.75436 33.74L15.5944 27.98C16.0744 27.74 16.0744 27.38 15.5944 27.02L2.63436 21.14C0.59436 20.18 0.23436 18.86 1.55436 16.7L4.67436 11.18C5.87436 8.78 7.07436 8.66 8.99436 9.98L20.2744 17.9C20.8744 18.5 21.3544 18.26 21.2344 17.42L19.9144 3.62C19.6744 1.34 20.6344 0.5 23.0344 0.5Z" 
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <Textarea 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="What are you looking for?" 
                  className="pl-12 font-serif text-lg h-[120px] resize-none bg-transparent
                  border border-orange-100 hover:border-orange-200 
                  focus:border-orange-300 focus-visible:ring-1 focus-visible:ring-orange-400 
                  rounded-2xl transition-colors duration-200
                  placeholder:text-orange-500/60 text-orange-700"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between px-2">
                <div className="flex gap-2">
                  {isDesktop ? (
                    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-orange-500 hover:bg-orange-50 font-serif flex gap-2"
                        >
                          <Zap className="h-4 w-4" />
                          {!isDropdownOpen && searchMode 
                            ? searchModes.find(mode => mode.id === searchMode)?.label 
                            : 'Mode'
                          }
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-[600px] p-4" sideOffset={8}>
                        <div className="grid grid-cols-4 grid-rows-2">
                          {searchModes.map((mode) => (
                            <DropdownMenuItem
                              key={mode.id}
                              onClick={() => {
                                setSearchMode(mode.id);
                                setIsDropdownOpen(false);
                              }}
                              className="flex flex-col items-start p-3 cursor-pointer hover:bg-orange-50 focus:bg-orange-50"
                            >
                              <div className="flex items-center gap-3">
                                <mode.icon className="h-5 w-5 text-orange-500 flex-shrink-0" />
                                <span className="font-medium text-gray-900">{mode.label}</span>
                              </div>
                              <p className="text-xs text-orange-500 leading-relaxed w-full">
                                {mode.description}
                              </p>
                            </DropdownMenuItem>
                          ))}
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                      <DrawerTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-orange-500 hover:bg-orange-50 font-serif flex gap-2">
                          <Zap className="h-4 w-4" />
                          {searchMode 
                            ? searchModes.find(mode => mode.id === searchMode)?.label 
                            : 'Mode'
                          }
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle className="text-lg font-serif font-medium text-orange-600">
                            Select Search Mode
                          </DrawerTitle>
                        </DrawerHeader>
                        <div className="p-4 space-y-4">
                          {searchModes.map((mode) => (
                            <button
                              key={mode.id}
                              type="button"
                              className="flex items-center gap-3 w-full p-3 hover:bg-orange-50 rounded-lg transition-colors"
                              onClick={() => {
                                setSearchMode(mode.id);
                                setIsDrawerOpen(false);
                              }}
                            >
                              <mode.icon className="h-5 w-5 text-orange-500 flex-shrink-0" />
                              <div className="text-left">
                                <div className="font-medium text-gray-900">{mode.label}</div>
                                <div className="text-sm text-orange-500/90">{mode.description}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </DrawerContent>
                    </Drawer>
                  )}
                </div>

                <Button 
                  size="icon"
                  onClick={handleSearch}
                  className="h-12 w-12 rounded-full bg-orange-600 hover:bg-orange-700 transition-all duration-200 overflow-hidden group/btn flex items-center justify-center"
                  onMouseEnter={() => setIsSearchHovered(true)}
                  onMouseLeave={() => setIsSearchHovered(false)}
                  onFocus={() => setIsSearchHovered(true)}
                  onBlur={() => setIsSearchHovered(false)}
                >
                  <Search className={`h-5 w-5 absolute transition-all duration-200 ${
                    isSearchHovered 
                      ? 'opacity-0 translate-y-full' 
                      : 'opacity-100 translate-y-0'
                  }`} />
                  <span className={`text-2xl font-bold absolute transition-all duration-200 text-white mt-2 ${
                    isSearchHovered 
                      ? 'opacity-100 scale-125 translate-y-0' 
                      : 'opacity-0 scale-75 -translate-y-full'
                  }`}>
                    *
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Now at the bottom */}
      <footer className="mt-auto py-6 px-4">
        <div className="flex gap-6 justify-center items-center text-sm text-orange-700/60">
          <Link href="/terms" className="hover:text-orange-800 transition-colors font-serif">
            Terms
          </Link>
          <span>•</span>
          <Link href="/privacy" className="hover:text-orange-800 transition-colors font-serif">
            Privacy
          </Link>
          <span>•</span>
          <Link href="/about" className="hover:text-orange-800 transition-colors font-serif">
            About
          </Link>
        </div>
      </footer>
    </div>
  );
}
