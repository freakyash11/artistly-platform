'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import categories from '../../../public/data/categories.json';

interface Category {
  id: number;
  name: string;
}

interface CategoryCardProps {
  category: Category;
  className?: string;
}

const categoryIcons: Record<string, string> = {
  'Singers': '🎤',
  'Dancers': '💃',
  'Speakers': '🎙️',
  'DJs': '🎧'
};

const categoryGradients: Record<string, string> = {
  'Singers': 'from-purple-500 to-pink-500',
  'Dancers': 'from-green-500 to-teal-500',
  'Speakers': 'from-blue-500 to-indigo-500',
  'DJs': 'from-orange-500 to-red-500'
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category, className = "" }) => {
  const router = useRouter();

  const handleCategoryClick = useCallback(() => {
    // Navigate to artists page with category filter
    router.push(`/artists?category=${category.name.toLowerCase()}`);
  }, [category.name, router]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCategoryClick();
    }
  }, [handleCategoryClick]);

  const icon = categoryIcons[category.name] || '🎭';
  const gradient = categoryGradients[category.name] || 'from-gray-500 to-gray-600';

  return (
    <Card
      onClick={handleCategoryClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Browse ${category.name} artists`}
      className={`
        group relative overflow-hidden cursor-pointer transition-all duration-300 
        transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 
        focus:ring-blue-500/20 border-2 hover:border-primary/50
        ${className}
      `}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-300`} />
      
      <CardHeader className="relative text-center pb-2">
        {/* Icon */}
        <div className="text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300 mb-2">
          {icon}
        </div>
        
        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
          {category.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative text-center pt-0">
        <CardDescription className="text-sm mb-4">
          Explore talented {category.name.toLowerCase()}
        </CardDescription>
        
        {/* Hover Arrow */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg 
            className="w-5 h-5 text-muted-foreground mx-auto" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 8l4 4m0 0l-4 4m4-4H3" 
            />
          </svg>
        </div>
      </CardContent>
      
      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 -left-4 w-8 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:animate-pulse" />
      </div>
    </Card>
  );
};

// CategoryGrid Component to display all categories
interface CategoryGridProps {
  className?: string;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ className = "" }) => {
  return (
    <section className={`py-16 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing artists across different categories and find the perfect talent for your event
          </p>
        </div>
        
        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard 
              key={category.id} 
              category={category}
              className="h-48"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCard;