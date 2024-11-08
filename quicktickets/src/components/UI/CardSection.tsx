//componentes/UI/CardSection.tsx

import React from 'react';
import Image from 'next/image';

interface CardSectionsProps {
  name: string;
  description: string;
  imageUrl: string;
  dateTime: string;
  price: number;
  capacity: number;
  category: string;
  location: string;
  latitude: number;
  longitude: number;
  creatorId: string;
}

const CardSections: React.FC<CardSectionsProps> = ({
  name,
  imageUrl,
  dateTime,
  price,
  capacity,
  category,
  location,
}) => {
  const eventDate = new Date(dateTime);
  const day = eventDate.toLocaleDateString('en-AR', { day: '2-digit' });
  const month = eventDate.toLocaleDateString('en-AR', { month: 'short' });
  const formattedTime = eventDate.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex flex-wrap items-stretch mb-8">
        <div className="flex flex-col border rounded-lg shadow-lg overflow-hidden bg-white w-80 min-h-full">
        {/* Imagen y botón de favorito */}
        <div className="relative h-40 w-full">
            <Image
            src={imageUrl}
            layout="fill"
            className="object-cover"
            alt="Miniatura Evento"
            />
            <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
            <Image
                src="/assets/images/icons/star.svg"
                width={20}
                height={20}
                alt="Favorito"
            />
            </button>
            <div className="absolute bottom-0 px-2 py-1 bg-[#FFE047] text-black text-sm font-semibold rounded-tr-lg">
            {category}
            </div>
        </div>

        {/* Información del evento */}
        <div className="flex flex-grow">
            {/* Sección de fecha */}
            <div className="flex flex-col items-center justify-start bg-gray-100 p-2 w-1/5 text-center">
            <p className="text-[#4539B4] text-lg font-semibold uppercase">{month}</p>
            <p className="text-gray-600 text-lg font-semibold uppercase">{day}</p>
            </div>

            {/* Detalles del evento */}
            <div className="p-2 w-4/5">
            <h4 className="text-base font-semibold mb-1 truncate-2-lines">
                {name}
            </h4>
            <p className="text-gray-500 text-sm mb-1">{location}</p>
            <p className="text-gray-600 text-xs uppercase">{formattedTime}</p>
            <div className="flex items-center justify-start mt-2 space-x-4">
                <p className="text-green-600 text-xs flex items-center">
                <Image src="/assets/images/icons/entrada-green.svg" width={14} height={14} alt="entrada" className="mr-1" />
                {price === 0 ? "FREE" : `ARS ${price}`}
                </p>
                <p className={`text-xs flex items-center ${capacity === 0 ? 'text-red-600' : 'text-blue-600'}`}>
                <Image src={`/assets/images/icons/${capacity === 0 ? 'group-red.svg' : 'group-blue.svg'}`} width={14} height={14} alt="Capacidad" className="mr-1" />
                {capacity === 0 ? "Sold Out" : `${capacity}`}
                </p>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default CardSections;