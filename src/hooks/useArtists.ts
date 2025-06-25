"use client"
import { useState, useEffect } from 'react';

interface Artist {
  id: number;
  name: string;
  category: string;
  priceRange: string;
  location: string;
}

// Custom hook to fetch artists data
export function useArtists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        setError(null);
        // Note: This project uses Next.js App Router, which deprecates `getStaticProps` and 
        // `getServerSideProps` for data fetching within components.
        // Instead, data fetching in the App Router is typically handled directly within 
        // React Server Components (RSC) using `fetch` or by using custom hooks/libraries 
        // that leverage RSC capabilities for server-side data retrieval.
        const response = await fetch('/data/artist.json'); 

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Artist[] = await response.json();
        setArtists(data);
      } catch (err) {
        console.error('Failed to fetch artists:', err);
        setError('Failed to load artists data.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return { artists, loading, error };
}