"use client"
import { useState, useEffect } from 'react';
import ArtistGrid from "@/components/artists/ArtistGrid";


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

  
        const response = await fetch('/data/artist.json'); // Adjust the path as necessary

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

// Page component
export default function ArtistsPage() {
  const { artists, loading, error } = useArtists();

  if (loading) {
    return <div className="pt-16 container mx-auto px-4 py-8">Loading artists...</div>;
  }

  if (error) {
    return <div className="pt-16 container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-8">
        <ArtistGrid artists={artists} />
      </div>
    </div>
  );
}
