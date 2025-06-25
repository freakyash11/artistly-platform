"use client";

import { useState, useMemo } from "react";
import ArtistCard from "./ArtistCard";
import FilterSidebar, { FilterState } from "./FilterSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Grid, List } from "lucide-react";

interface Artist {
  id: number;
  name: string;
  category: string;
  priceRange: string;
  location: string;
}

interface ArtistGridProps {
  artists: Artist[];
}

export default function ArtistGrid({ artists }: ArtistGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    locations: [],
    priceRanges: []
  });

  // Extract unique values for filter options
  const filterOptions = useMemo(() => {
    const categories = [...new Set(artists.map(artist => artist.category))];
    const locations = [...new Set(artists.map(artist => artist.location))];
    const priceRanges = [...new Set(artists.map(artist => artist.priceRange))];
    
    return { categories, locations, priceRanges };
  }, [artists]);

  // Filter and search artists
  const filteredArtists = useMemo(() => {
    return artists.filter(artist => {
      // Text search filter
      const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           artist.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           artist.location.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = filters.categories.length === 0 || 
                             filters.categories.includes(artist.category);

      // Location filter
      const matchesLocation = filters.locations.length === 0 || 
                             filters.locations.includes(artist.location);

      // Price range filter
      const matchesPriceRange = filters.priceRanges.length === 0 || 
                               filters.priceRanges.includes(artist.priceRange);

      return matchesSearch && matchesCategory && matchesLocation && matchesPriceRange;
    });
  }, [artists, searchTerm, filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Find Artists</h1>
          <p className="text-gray-600 mt-1">
            {filteredArtists.length} artist{filteredArtists.length !== 1 ? 's' : ''} available
          </p>
        </div>
        
        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        {showFilters && (
          <div className="lg:w-80 flex-shrink-0">
            <FilterSidebar
              categories={filterOptions.categories}
              locations={filterOptions.locations}
              priceRanges={filterOptions.priceRanges}
              onFilterChange={handleFilterChange}
              activeFilters={filters}
            />
          </div>
        )}

        {/* Artist Grid/List */}
        <div className="flex-1">
          {filteredArtists.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No artists found</h3>
              <p className="text-gray-500">
                Try adjusting your search terms or filters to find what you&apos;re looking for.
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredArtists.map((artist) => (
                <div
                  key={artist.id}
                  className={viewMode === "list" ? "max-w-md" : ""}
                >
                  <ArtistCard artist={artist} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}