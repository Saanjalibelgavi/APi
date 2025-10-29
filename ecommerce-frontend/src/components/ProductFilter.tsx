import React, { useState } from "react";
import { X, SlidersHorizontal, Star } from "lucide-react";

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
  sortBy: string;
}

const ProductFilter: React.FC<FilterProps> = ({ onFilterChange, onClose, isMobile = false }) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 10000],
    minRating: 0,
    sortBy: "featured",
  });

  const categories = [
    { id: "skincare", label: "Skincare" },
    { id: "clothing", label: "Clothing" },
    { id: "electronics", label: "Electronics" },
    { id: "home", label: "Home & Living" },
    { id: "books", label: "Books" },
    { id: "sports", label: "Sports" },
  ];

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Rating: High to Low" },
    { value: "newest", label: "Newest First" },
  ];

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((c) => c !== categoryId)
      : [...filters.categories, categoryId];
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (index: 0 | 1, value: number) => {
    const newPriceRange: [number, number] = [...filters.priceRange] as [number, number];
    newPriceRange[index] = value;
    
    const newFilters = { ...filters, priceRange: newPriceRange };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (rating: number) => {
    const newFilters = { ...filters, minRating: rating };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortBy: string) => {
    const newFilters = { ...filters, sortBy };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearAll = () => {
    const clearedFilters: FilterState = {
      categories: [],
      priceRange: [0, 10000],
      minRating: 0,
      sortBy: "featured",
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const containerClass = isMobile
    ? "fixed inset-0 bg-white z-50 overflow-y-auto"
    : "bg-white rounded-xl shadow-lg p-6 sticky top-24";

  return (
    <div className={containerClass}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-primary-500" />
          <h3 className="text-lg font-bold">Filters</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleClearAll}
            className="text-sm text-gray-600 hover:text-primary-500 transition-colors"
          >
            Clear All
          </button>
          {isMobile && onClose && (
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="font-semibold mb-3">Sort By</h4>
        <select
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="input w-full"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="font-semibold mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.categories.includes(category.id)}
                onChange={() => handleCategoryToggle(category.id)}
                className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm group-hover:text-primary-500 transition-colors">
                {category.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="font-semibold mb-3">Price Range</h4>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs text-gray-600 mb-1 block">Min</label>
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                className="input w-full text-sm"
                min="0"
                max={filters.priceRange[1]}
              />
            </div>
            <div className="text-gray-400 mt-5">-</div>
            <div className="flex-1">
              <label className="text-xs text-gray-600 mb-1 block">Max</label>
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                className="input w-full text-sm"
                min={filters.priceRange[0]}
                max="100000"
              />
            </div>
          </div>
          
          {/* Price Range Slider */}
          <div>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(1, Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹{filters.priceRange[0]}</span>
              <span>₹{filters.priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Minimum Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === rating}
                onChange={() => handleRatingChange(rating)}
                className="w-4 h-4 border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              <div className="flex items-center gap-1">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-gray-300" />
                ))}
                <span className="text-sm text-gray-600 ml-1">& Up</span>
              </div>
            </label>
          ))}
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === 0}
              onChange={() => handleRatingChange(0)}
              className="w-4 h-4 border-gray-300 text-primary-500 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-600">All Ratings</span>
          </label>
        </div>
      </div>

      {/* Apply Button (Mobile) */}
      {isMobile && onClose && (
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <button onClick={onClose} className="btn btn-primary w-full">
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;
