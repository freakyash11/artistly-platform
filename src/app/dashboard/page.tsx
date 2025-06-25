"use client";

import React, { useEffect, useState } from 'react';
import { ArtistTable, Artist } from '@/components/dashboard/ArtistTable';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ManagerDashboardPage: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  // Note: This project uses Next.js App Router, which deprecates `getStaticProps` and 
  // `getServerSideProps` for data fetching within components.
  // Instead, data fetching in the App Router is typically handled directly within 
  // React Server Components (RSC) using `fetch` or by using custom hooks/libraries 
  // that leverage RSC capabilities for server-side data retrieval.
  useEffect(() => {
    fetch('/data/artist.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Artist[]) => setArtists(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAction = (artist: Artist) => {
    alert(`Viewing details for ${artist.name}`);
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Artist Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p>Loading…</p>}
          {error   && <p className="text-red-500">Error: {error}</p>}
          {!loading && !error &&
            <ArtistTable data={artists} onAction={handleAction} />
          }
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagerDashboardPage;
