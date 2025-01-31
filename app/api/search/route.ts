import { NextResponse } from 'next/server';
import type { SerperResponse, SearchSource } from '@/types/search';
export const runtime = "edge";

export async function POST(request: Request) {
  try {
    // Get the API key from environment variables
    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Serper API key not configured' },
        { status: 500 }
      );
    }

    // Get the search query from request body
    const body = await request.json();
    const { q: searchQuery, mode = 'search' } = body;

    if (!searchQuery) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Configure the API request
    const headers = {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json',
    };

    // Determine the endpoint based on search mode
    let endpoint = 'https://google.serper.dev/search';
    switch (mode as SearchSource) {
      case 'images':
        endpoint = 'https://google.serper.dev/images';
        break;
      case 'videos':
        endpoint = 'https://google.serper.dev/videos';
        break;
      case 'places':
        endpoint = 'https://google.serper.dev/places';
        break;
      case 'news':
        endpoint = 'https://google.serper.dev/news';
        break;
      case 'shopping':
        endpoint = 'https://google.serper.dev/shopping';
        break;
      case 'scholar':
        endpoint = 'https://google.serper.dev/search';
        break;
      case 'patents':
        endpoint = 'https://google.serper.dev/search';
        break;
      default:
        endpoint = 'https://google.serper.dev/search';
    }

    // Make the request to Serper
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        q: searchQuery,
        gl: 'us', // Geography: United States
        hl: 'en', // Language: English
        type: mode === 'scholar' ? 'scholar' : mode === 'patents' ? 'patents' : undefined,
        engine: mode === 'scholar' ? 'google_scholar' : mode === 'patents' ? 'google' : undefined
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: `Serper API error: ${error}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Format the response based on the mode
    let formattedData: SerperResponse = {
      searchParameters: {
        q: searchQuery,
        gl: 'us',
        hl: 'en',
      }
    };

    // Format results based on mode
    if (mode === 'news') {
      const newsItems = Array.isArray(data) ? data : data.news || [];
      formattedData.news = newsItems.map((item: Record<string, unknown>, index: number) => ({
        title: item.title as string,
        link: item.link as string,
        snippet: item.snippet as string,
        imageUrl: item.imageUrl as string | undefined,
        date: item.date as string | undefined,
        source: (item.source as string | undefined) || new URL(item.link as string).hostname,
        position: index + 1,
        attributes: (item.attributes as Record<string, string>) || {}
      }));
    } else if (mode === 'shopping') {
  
      const shoppingItems = Array.isArray(data) ? data : data.shopping || [];
    
      formattedData.shopping = shoppingItems.map((item: Record<string, unknown>, index: number) => ({
        title: item.title as string,
        link: item.link as string,
        source: (item.source as string) || new URL(item.link as string).hostname,
        price: item.price as string,
        delivery: item.delivery as string | undefined,
        imageUrl: item.imageUrl as string | undefined,
        rating: item.rating as number | undefined,
        ratingCount: item.ratingCount as number | undefined,
        offers: item.offers as string | undefined,
        position: index + 1
      }));

    } else if (mode === 'scholar' || mode === 'patents') {
      // Handle both array and object response formats
      const items = Array.isArray(data) ? data : (data.organic || []);
      formattedData.organic = items.map((item: Record<string, unknown>) => {
        if (mode === 'scholar') {
          return {
            title: item.title as string || '',
            link: item.link as string || '',
            snippet: item.snippet as string || '',
            publicationInfo: item.publicationInfo as string || '',
            year: item.year || '',
            citedBy: typeof item.citedBy === 'number' ? item.citedBy : undefined,
            pdfUrl: item.pdfUrl as string || undefined,
            id: item.id as string || `scholar-${Date.now()}-${Math.random()}`
          };
        } else {
          return {
            title: item.title as string || '',
            link: item.link as string || '',
            snippet: item.snippet as string || '',
            priorityDate: item.priorityDate as string,
            filingDate: item.filingDate as string,
            grantDate: item.grantDate as string,
            publicationDate: item.publicationDate as string,
            inventor: item.inventor as string,
            assignee: item.assignee as string,
            publicationNumber: item.publicationNumber as string,
            pdfUrl: item.pdfUrl as string || undefined,
            figures: item.figures as Array<{
              imageUrl: string;
              thumbnailUrl: string;
            }> || undefined
          };
        }
      });
    } else if (mode === 'places') {
      const placeItems = Array.isArray(data) ? data : data.places || [];
      formattedData.places = placeItems.map((item: Record<string, unknown>, index: number) => ({
        title: item.title as string,
        link: item.link as string,
        position: index + 1,
        address: item.address as string,
        latitude: item.latitude as number,
        longitude: item.longitude as number,
        rating: item.rating as number | undefined,
        ratingCount: item.ratingCount as number | undefined,
        category: item.category as string | undefined,
        phoneNumber: item.phoneNumber as string | undefined,
        website: item.website as string | undefined,
        cid: item.cid as string
      }));
    } else if (mode === 'videos') {
      const videoItems = Array.isArray(data) ? data : data.videos || [];
      formattedData.videos = videoItems.map((item: Record<string, unknown>) => ({
        title: item.title as string,
        link: item.link as string,
        imageUrl: item.imageUrl as string | undefined,
        snippet: item.snippet as string | undefined,
        duration: item.duration as string | undefined,
        channel: item.channel as string | undefined,
        views: item.views as string | undefined,
        date: item.date as string | undefined,
        source: (item.source as string) || new URL(item.link as string).hostname
      }));
    } else if (mode === 'images') {
      const imageItems = Array.isArray(data) ? data : data.images || [];
      formattedData.images = imageItems.map((item: Record<string, unknown>) => ({
        title: item.title as string,
        link: item.link as string,
        imageUrl: item.imageUrl as string,
        source: (item.source as string) || new URL(item.link as string).hostname
      }));
    } else if (mode === 'web') {
      formattedData = {
        ...formattedData,
        ...data
      };
    }

    // Return the search results
    return NextResponse.json(formattedData);

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
