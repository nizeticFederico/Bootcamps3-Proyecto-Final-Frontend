import React, { useState } from 'react';
import Categories from './Categories';

interface FilterColumnProps {
  setFilters: (filters: { category?: string; price?: string; date?: string }) => void;
}

const FilterColumn: React.FC<FilterColumnProps> = ({ setFilters }) => {
  const [activeFilters, setActiveFilters] = useState<{ category?: string; price?: string; date?: string }>({});

  const handleFilterChange = (type: string, value: string) => {
    setActiveFilters((prev) => {
      const updatedFilters = { ...prev, [type]: prev[type] === value ? undefined : value };
      // Limpia los filtros si todas las opciones están desmarcadas
      if (!updatedFilters.category && !updatedFilters.price && !updatedFilters.date) {
        setFilters({});
      } else {
        setFilters(updatedFilters);
      }
      return updatedFilters;
    });
  };

  return (
    <div className="flex flex-col w-full max-w-xs p-4 bg-white border overflow-y-auto sticky top-0 max-h-screen">
      {/* Price Filter */}
      <h3 className="font-semibold text-lg mb-2">Price</h3>
      {['Free', 'Paid'].map((price) => (
        <label key={price} className="block mb-1">
          <input
            type="checkbox"
            checked={activeFilters.price === price}
            onChange={() => handleFilterChange('price', price)}
            className="mr-2 leading-tight"
          />
          <span className="text-gray-700">{price}</span>
        </label>
      ))}

      {/* Date Filter */}
      <div className="border-t border-gray-300 my-4"></div>
      <h3 className="font-semibold text-lg mb-2">Date</h3>
      {['Today', 'Tomorrow', 'This Week', 'This Weekend', 'Pick a Date'].map((date) => (
        <label key={date} className="block mb-1">
          <input
            type="checkbox"
            checked={activeFilters.date === date}
            onChange={() => handleFilterChange('date', date)}
            className="mr-2 leading-tight"
          />
          <span className="text-gray-700">{date}</span>
        </label>
      ))}

      {/* Category Filter */}
      <div className="border-t border-gray-300 my-4"></div>
      <h3 className="font-semibold text-lg mb-2">Category</h3>
      <Categories
        renderCategory={(category) => (
          <label key={category.name} className="block mb-1">
            <input
              type="checkbox"
              checked={activeFilters.category === category.name}
              onChange={() => handleFilterChange('category', category.name)}
              className="mr-2 leading-tight"
            />
            <span className="text-gray-700">{category.name}</span>
          </label>
        )}
      />
    </div>
  );
};

export default FilterColumn;