import { NextResponse } from 'next/server';

async function fetchOGImage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    // Extract og:image meta tag
    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i) 
      ?? html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i);
    
    if (ogImageMatch?.[1]) {
      return ogImageMatch[1];
    }
    
    // Fallback to twitter:image
    const twitterImageMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["'][^>]*>/i)
      ?? html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["'][^>]*>/i);
    
    if (twitterImageMatch?.[1]) {
      return twitterImageMatch[1];
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching OG image:', error);
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    const ogImage = await fetchOGImage(url);
    
    if (!ogImage) {
      return NextResponse.json({ error: 'No OG image found' }, { status: 404 });
    }

    return NextResponse.json({ url: ogImage });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch OG image' }, { status: 500 });
  }
}
