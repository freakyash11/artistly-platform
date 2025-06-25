"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

interface FilterSidebarProps {
  categories: string[];
  locations: string[];
  priceRanges: string[];
  onFilterChange: (filters: FilterState) => void;
  activeFilters: FilterState;
}

export interface FilterState {
  categories: string[];
  locations: string[];
  priceRanges: string[];
}

export default function FilterSidebar({
  categories,
  locations,
  priceRanges,
  onFilterChange,
  activeFilters
}: FilterSidebarProps) {
  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...activeFilters.categories, category]
      : activeFilters.categories.filter(c => c !== category);
    
    onFilterChange({
      ...activeFilters,
      categories: newCategories
    });
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    const newLocations = checked
      ? [...activeFilters.locations, location]
      : activeFilters.locations.filter(l => l !== location);
    
    onFilterChange({
      ...activeFilters,
      locations: newLocations
    });
  };

  const handlePriceRangeChange = (priceRange: string, checked: boolean) => {
    const newPriceRanges = checked
      ? [...activeFilters.priceRanges, priceRange]
      : activeFilters.priceRanges.filter(p => p !== priceRange);
    
    onFilterChange({
      ...activeFilters,
      priceRanges: newPriceRanges
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      locations: [],
      priceRanges: []
    });
  };

  const hasActiveFilters = 
    activeFilters.categories.length > 0 ||
    activeFilters.locations.length > 0 ||
    activeFilters.priceRanges.length > 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-sm text-gray-500 hover:text-gray-700 "
            >
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div>
          <h3 className="font-medium mb-3 text-sm">Category</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={activeFilters.categories.includes(category)}
                  onCheckedChange={(checked) => 
                    handleCategoryChange(category, checked as boolean)
                  }
                />
                <label
                  htmlFor={`category-${category}`}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Location Filter */}
        <div>
          <h3 className="font-medium mb-3 text-sm">Location</h3>
          <div className="space-y-2">
            {locations.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  id={`location-${location}`}
                  checked={activeFilters.locations.includes(location)}
                  onCheckedChange={(checked) => 
                    handleLocationChange(location, checked as boolean)
                  }
                />
                <label
                  htmlFor={`location-${location}`}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {location}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range Filter */}
        <div>
          <h3 className="font-medium mb-3 text-sm">Price Range</h3>
          <div className="space-y-2">
            {priceRanges.map((priceRange) => (
              <div key={priceRange} className="flex items-center space-x-2">
                <Checkbox
                  id={`price-${priceRange}`}
                  checked={activeFilters.priceRanges.includes(priceRange)}
                  onCheckedChange={(checked) => 
                    handlePriceRangeChange(priceRange, checked as boolean)
                  }
                />
                <label
                  htmlFor={`price-${priceRange}`}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {priceRange}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <>
            <Separator />
            <div>
              <h3 className="font-medium mb-3 text-sm">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {activeFilters.categories.map((category) => (
                  <div
                    key={`active-category-${category}`}
                    className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-md"
                  >
                    <span>{category}</span>
                    <button
                      onClick={() => handleCategoryChange(category, false)}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {activeFilters.locations.map((location) => (
                  <div
                    key={`active-location-${location}`}
                    className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-md"
                  >
                    <span>{location}</span>
                    <button
                      onClick={() => handleLocationChange(location, false)}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {activeFilters.priceRanges.map((priceRange) => (
                  <div
                    key={`active-price- ${priceRange}`}
                    className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-md"
                  >
                    <span>{priceRange}</span>
                    <button
                      onClick={() => handlePriceRangeChange(priceRange, false)}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}