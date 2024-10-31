// components/FilterColumn.tsx
import React from 'react';

const filters = [
  {
    label: 'Price',
    options: ['Free', 'Paid'],
  },
  {
    label: 'Date',
    options: ['Today', 'Tomorrow', 'This Week', 'This Weekend', 'Pick a Date'],
  },
  {
    label: 'Category',
    options: ['Adventure Travel', 'Art Exhibitions', 'Auctions & Fundaraisers', 'Beer Festivals', 'Benefit Concerts'],
  },
  {
    label: 'Format',
    options: ['Community Engagement', 'Concerts & Performances', 'Conferences', 'Experiential Events', 'Festivals & Fairs'],
  },
];

const FilterColumn: React.FC = () => {
  return (
    <div className="flex flex-col w-full max-w-xs p-4 bg-white border overflow-y-auto invisible-scrollbar sticky top-0 max-h-screen">
      {filters.map((filter, index) => (
        <div key={filter.label} className="mb-4">
          <h3 className="font-semibold text-lg mb-2">{filter.label}</h3>
          {filter.options.map((option) => (
            <label key={option} className="block mb-1">
              <input
                type="checkbox"
                className="mr-2 leading-tight"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
          {/* Línea divisoria */}
          {index < filters.length - 1 && (
            <div className="border-b border-gray-300 my-4"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterColumn;