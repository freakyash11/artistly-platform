// src/app/page.tsx
import HeroSection from '@/components/home/HeroSection';
import { CategoryGrid } from '@/components/home/CategoryCard';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Category Section */}
      <CategoryGrid />
    </main>
  );
}

// Optional: Add metadata for SEO
export const metadata = {
  title: 'Artist Platform - Find Amazing Talent',
  description: 'Discover and book talented singers, dancers, speakers, and DJs for your events',
  keywords: 'artists, singers, dancers, speakers, DJs, events, booking',
};