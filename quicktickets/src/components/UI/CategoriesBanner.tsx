"use client"

import React, { useState } from 'react';
import Categories from './Categories';
import Image from 'next/image';

const CategoriesBanner: React.FC = () => {
  // Cada categoría puede tener su propio estado de error
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (categoryName: string) => {
    setImageErrors((prevErrors) => ({
      ...prevErrors,
      [categoryName]: true,
    }));
  };

  return (
    <div className="items-center my-8">
      <div className="flex flex-row space-x-20 items-center justify-center">
        <Categories
          renderCategory={(category) => (
            <label key={category.name} className="block mb-1">
              <div className='flex flex-col items-center justify-center'>
                <button className="p-10 bg-white rounded-full shadow-md hover:bg-gray-100 transition overflow-hidden relative">
                  <Image
                    src={imageErrors[category.name] 
                          ? '/assets/images/icons/default.svg' 
                          : `/assets/images/icons/${category.name}.svg`} // Cambia solo si hay error apra esa categoria
                    fill
                    alt={category.name}
                    onError={() => handleImageError(category.name)} // Afecta a la categoria actual
                    className="object-cover"
                  />
                </button>
                <p className="text-gray-700">{category.name}</p>
              </div>
            </label>
          )}
        />
      </div>
    </div>
  );
};

export default CategoriesBanner;