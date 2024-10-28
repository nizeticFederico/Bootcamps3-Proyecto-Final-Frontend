import Image from 'next/image';
import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full max-w-3xl mx-auto p-4">
      <button className="bg-white text-gray-600 py-3 px-4 rounded-l-md border border-gray-300 flex items-center hover:bg-gray-100 transition">
            <Image
                src="/assets/images/search-icon.svg"
                width={28}
                height={28}
                alt="Logo Mail"
            />
      </button>
      <input
        type="text"
        placeholder="Search Events, Categories, Location,..."
        className="flex-grow p-3 border border-gray-300 focus:outline-none focus:ring-0 bg-white text-gray-600"
      />
      <select
        className="p-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-0 bg-white text-gray-600"
      >
        <option value="">Seleccionar ciudad</option>
        <option value="buenos-aires">Buenos Aires</option>
        <option value="cordoba">Córdoba</option>
        <option value="rosario">Rosario</option>
      </select>
    </div>
  );
};

export default SearchBar;