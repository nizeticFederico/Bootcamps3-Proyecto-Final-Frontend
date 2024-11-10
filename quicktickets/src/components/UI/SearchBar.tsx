"use client"

import React, { useEffect, useState } from 'react';

interface SearchBarProps {
  setFilters: (filters: { location: string }) => void;
}


const SearchBar: React.FC<SearchBarProps> = ({ setFilters }) => {
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch("http://localhost:3001/event/all");
        const data = await response.json();
        const uniqueLocations = Array.from(new Set(data.map((event: { location: string }) => event.location)));
        setLocations(uniqueLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }
    fetchLocations();
  }, []);

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ location: e.target.value });
  };

  return (
    <div className="flex items-center justify-center h-full w-full max-w-3xl mx-auto p-4">
      <input
        type="text"
        placeholder="Search Events!"
        className="h-full flex-grow py-3 px-4 border border-gray-300 focus:outline-none bg-white text-gray-600"
      />
      <select onChange={handleLocationChange} className="py-3 px-4 border rounded-r-md bg-white text-gray-600">
        <option value="">Seleccionar ciudad</option>
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