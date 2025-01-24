import { clsx, type ClassValue } from "clsx"
import { createHash } from "crypto";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSearchId(searchTerm: string, searchMode: string | null): string {
  // Don't decode here since the input should already be decoded by the caller
  const input = `${searchTerm.toLowerCase().trim()}-${searchMode || 'web'}`;
  return createHash('sha256')
    .update(input)
    .digest('hex')
    .slice(0, 24); // Taking first 24 chars for a cleaner URL
}


export function getWebsiteName(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    // Common domain mappings
    const domainMappings: Record<string, string> = {
      'youtube.com': 'YouTube',
      'music.youtube.com': 'YouTube Music', 
      'amazon.com': 'Amazon',
      'music.amazon.com': 'Amazon Music',
      'spotify.com': 'Spotify',
      'apple.com': 'Apple',
      'music.apple.com': 'Apple Music',
      'wikipedia.org': 'Wikipedia',
      'github.com': 'GitHub',
      'medium.com': 'Medium',
      'stackoverflow.com': 'Stack Overflow'
    };

    // Check for exact matches first
    if (domainMappings[hostname]) {
      return domainMappings[hostname];
    }

    // Check for partial matches (e.g., subdomain.youtube.com)
    for (const [domain, name] of Object.entries(domainMappings)) {
      if (hostname.endsWith(domain)) {
        return name;
      }
    }

    // Default: take the main domain name and capitalize it
    const mainDomain = hostname.replace('www.', '').split('.')[0];
    return mainDomain.charAt(0).toUpperCase() + mainDomain.slice(1);
  } catch {
    return url;
  }
}