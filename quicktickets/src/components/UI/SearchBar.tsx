import Image from 'next/image';
import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full w-full max-w-3xl mx-auto p-4">
      <button className=" bg-white text-gray-600 py-3 px-4 rounded-l-md border border-gray-300 flex items-center hover:bg-gray-100 transition">
            <Image
                src="/assets/images/icons/search-icon.svg"
                width={28}
                height={28}
                alt="Logo Search"
                className='opacity-50'
            />
      </button>
      <input
        type="text"
        placeholder="Search Events, Categories, Location,..."
        className="h-full flex-grow py-3 px-4 border border-gray-300 focus:outline-none focus:ring-0 bg-white text-gray-600"
      />
      <select
        className="h-full py-3 px-4 border border-gray-300 rounded-r-md focus:outline-none focus:ring-0 bg-white text-gray-600"
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
/* 
import Image from 'next/image';
import React, { useState } from 'react';

interface City {
  name: string;
  value: string;
  icon: string;
}

interface SearchBarProps {
  cities: City[];
}

const SearchBar: React.FC<SearchBarProps> = ({ cities }) => {
  const [selectedCity, setSelectedCity] = useState('Seleccionar ciudad');
  const [isOpen, setIsOpen] = useState(false);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center h-full w-full max-w-3xl mx-auto p-4">
      <button className="bg-white text-gray-600 py-3 px-4 rounded-l-md border border-gray-300 flex items-center hover:bg-gray-100 transition">
        <Image src="/assets/images/search-icon.svg" width={28} height={28} alt="Logo Search" className="opacity-50" />
      </button>
      <input
        type="text"
        placeholder="Search Events, Categories, Location,..."
        className="h-full flex-grow py-3 px-4 border border-gray-300 focus:outline-none focus:ring-0 bg-white text-gray-600"
      />

      <div className="relative">
        <button
          className="h-full py-3 px-4 border border-gray-300 rounded-r-md bg-white text-gray-600 flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedCity}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {cities.map((city) => (
              <button
                key={city.value}
                onClick={() => handleCitySelect(city.name)}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
              >
                <Image src={city.icon} width={20} height={20} alt={`${city.name} icon`} className="mr-2" />
                {city.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar; */