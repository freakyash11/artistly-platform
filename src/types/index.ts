export interface Artist {
  id: number;
  name: string;
  category: string[];
  languages: string[];
  priceRange: string;
  location: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface FilterState {
  category: string;
  location: string;
  priceRange: string;
}