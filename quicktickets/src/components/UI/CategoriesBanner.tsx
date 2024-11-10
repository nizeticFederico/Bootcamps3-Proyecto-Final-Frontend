"use client"

import Categories from './Categories';
import Image from 'next/image';

const CategoriesBanner: React.FC = () => {
  return (
    <div className="items-center my-8">
      <div className="flex flex-row space-x-20 items-center justify-center">
        <Categories
          renderCategory={(category) => (
            <label key={category.name} className="block mb-1">
              <div className='flex flex-col items-center justify-center'>
                <button className="p-10 bg-white rounded-full shadow-md hover:bg-gray-100 transition overflow-hidden relative">
                  <Image
                    src={category.imageUrl}
                    fill
                    alt={category.name}
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