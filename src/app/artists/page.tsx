"use client"
import { useArtists } from "@/hooks/useArtists"; 
import ArtistGrid from "@/components/artists/ArtistGrid";


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