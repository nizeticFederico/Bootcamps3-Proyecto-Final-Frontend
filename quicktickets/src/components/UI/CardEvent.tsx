import React from 'react';
import Image from 'next/image';

interface EventCardProps {
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

const EventCard: React.FC<EventCardProps> = ({
  name,
  imageUrl,
  dateTime,
  price,
  capacity,
  category,
  location,
  latitude,
  longitude,
}) => {
  const eventDate = new Date(dateTime);
  const formattedDate = eventDate.toLocaleDateString('en-AR', { day: '2-digit', month: 'short', year: 'numeric' });
  const formattedTime = eventDate.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex border rounded-md shadow-md overflow-hidden bg-white mb-8">
      <div className="w-1/2 h-full overflow-hidden rounded relative">
        <Image
          src={imageUrl}
          fill
          className="object-cover"
          alt="Miniatura Evento"
        />
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
          <Image
            src="/assets/images/icons/star.svg"
            width={15}
            height={15}
            alt="Favorito"
          />
        </button>
        <div className="absolute bottom-0 px-2 py-1 bg-[#FFE047] text-black text-xs font-semibold rounded-tr-lg">
          {category}
        </div>
      </div>
      <div className="flex flex-col justify-between p-2 w-1/2">
        <div className="h-1/3 mb-1">
          <h4 className="font-semibold text-sm">{name}</h4>
        </div>
        <div className="text-gray-600 text-xs">
          <p>{formattedDate} | {formattedTime}</p>
          <p>{location}</p>
        </div>
        <div className="flex text-xs mt-1 mb-2">
          <Image
            src="/assets/images/icons/marcador-blue.svg"
            width={8}
            height={8}
            alt="Marcador"
            className="mr-1"
          />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Location
          </a>
        </div>
        <div className="flex space-x-2">
          <p className="text-green-600 text-xs flex">
            <Image src="/assets/images/icons/entrada-green.svg" width={10} height={10} alt="entrada" className="mr-1" />
            {price === 0 ? "FREE" : `ARS ${price}`}
          </p>
          <p className={`text-xs flex ${capacity === 0 ? 'text-red-600' : 'text-blue-600'}`}>
            <Image src={`/assets/images/icons/${capacity === 0 ? 'group-red.svg' : 'group-blue.svg'}`} width={10} height={10} alt="Capacidad" className="mr-1" />
            {capacity === 0 ? "Sold Out" : capacity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;