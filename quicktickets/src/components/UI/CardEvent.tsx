// components/EventCard.tsx
import React from 'react';
import Image from 'next/image';

interface EventCardProps {
  imageUrl: string;
  name: string;
  date: string;
  hour: string;
  price: number;
  capacity: number;
  location: string;
  category: string;
}

const EventCard: React.FC<EventCardProps> = ({ imageUrl, name, date, hour, price, capacity, location, category }) => {
  return (
    <div className="flex border rounded-md shadow-md overflow-hidden bg-white mb-8">
      {/* Imagen del evento */}
      <div className="w-1/2 h-full overflow-hidden rounded relative">
        <Image
            src={imageUrl}
            fill
            //fill permite que la imagen ocupe todo el espacio del contenedor con object-cover, lo que garantiza que la imagen mantenga su forma circular y se centre correctamente
            className="object-cover"
            alt="Miniatura Evento"
        />
        {/* Botón de favoritos */}
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
          <Image
            src="/assets/images/icons/star.svg"
            width={15}
            height={15}
            alt="Favorito"
          />

        </button>

        {/* Etiqueta de categoría */}
        <div className="absolute bottom-0 px-2 py-1 bg-[#FFE047] text-black text-xs font-semibold rounded-tr-lg">
          {category}
        </div>
      </div>

      
      {/* Datos del evento */}
      <div className="flex flex-col justify-between p-2 w-1/2">
        <div className="h-1/3 mb-1">
          <h4 className="font-semibold text-sm">{name}</h4>
        </div>
        <div className='flex'>
          <p className="text-gray-600 text-xs mr-1">{date} |</p>
          <p className="text-gray-600 text-xs">{location}</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs mb-4">{hour}</p>
        </div>
        <div className='flex space-x-2'>
          <p className="text-green-600 text-xs flex">
          <Image
              src="/assets/images/icons/entrada-green.svg" // Ruta de la imagen del icono de favoritos en public
              width={10}
              height={10}
              alt="entrada"
              className='mr-1'
            />
            {price === 0 ? "FREE" : `ARS ${price}`}</p>
          <p className={`text-xs flex ${capacity === 0 ? 'text-red-600' : 'text-blue-600'}`}>
          <Image
              src={`/assets/images/icons/${capacity === 0 ? 'group-red.svg' : 'group-blue.svg'}`}
              width={10}
              height={10}
              alt="Capacidad"
              className='mr-1'
            />
            {capacity === 0 ? "Sold Out" : capacity}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;