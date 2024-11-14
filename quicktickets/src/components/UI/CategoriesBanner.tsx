// src/components/UI/CategoriesBanner.tsx

"use client";

import Categories from './Categories';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CategoriesBanner: React.FC = () => {
  const router = useRouter();

  // Función para manejar el clic en cada categoría
  const handleCategoryClick = (categoryName: string, imageUrl: string) => {
    if (categoryName) {
      const queryParams = new URLSearchParams();
      queryParams.set("category", categoryName);
      queryParams.set("imageUrl", imageUrl); // Agrega imageUrl al queryParams
      router.push(`/events?${queryParams.toString()}`);
    }
  };

  return (
    <div className="items-center my-8">
      <div className="flex flex-row space-x-20 items-center justify-center">
        <Categories
          renderCategory={(category) => (
            <label key={category.name} className="block mb-1">
              <div
                className='flex flex-col items-center justify-center'
                onClick={() => handleCategoryClick(category.name, category.imageUrl)}
              >
                <button className="p-10 bg-white rounded-full shadow-md hover:bg-gray-100 transition overflow-hidden relative">
                  <Image
                    src={category.imageUrl}
                    fill
                    alt={category.name}
                    className="object-cover"
                    sizes="(max-width: 600px) 100vw, 50vw"
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