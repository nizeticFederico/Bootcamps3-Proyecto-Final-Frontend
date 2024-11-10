"use client"

import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  onSearch: (name: string, location: string) => void;
  locations: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, locations }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  const handleSearchClick = () => {
    onSearch(searchTerm, selectedLocation);
  };

  return (
    <div className="flex items-center justify-center h-full w-full max-w-3xl mx-auto p-4">
      <button
        onClick={handleSearchClick}
        className="h-12 bg-white text-gray-600 px-4 rounded-l-md border-t border-l border-b border-gray-300 hover:bg-gray-100 transition flex items-center"
      >
        <FiSearch size={24} />
      </button>
      <input
        type="text"
        placeholder="Search Events!"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-12 flex-grow py-2 px-4 border-t border-b border-gray-300 focus:outline-none focus:ring-0 bg-white text-gray-600"
      />
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        className="h-12 py-2 px-4 border-t border-r border-b border-gray-300 rounded-r-md focus:outline-none focus:ring-0 bg-white text-gray-600"
      >
        <option value="">Select Location</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;