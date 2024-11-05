
import React from 'react';
import Image from 'next/image';

interface EventDataProps {
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

const EventData: React.FC<EventDataProps> = ({
  name,
  imageUrl,
  description,
  dateTime,
  price,
  capacity,
  category,
  location,
  latitude,
  longitude,
  creatorId,
}) => {
  const eventDate = new Date(dateTime);
  const formattedDate = eventDate.toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' });
  const formattedTime = eventDate.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

  // Formateo de precio en moneda local
  const formattedPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);

  // sacamos la logica afuera para el cambio de aspecto
  const isSoldOut = capacity === 0;
  const capacityTextColor = isSoldOut ? 'text-red-500' : 'text-green-600';
  const capacityText = isSoldOut ? 'Sold Out' : `${capacity} tickets left`;
  const capacityIcon = isSoldOut ? '/group-red.svg' : '/group.svg';

  return (
    <main>
      <div className="w-1/2 h-full overflow-hidden rounded relative">
        <Image
          src={imageUrl}
          fill
          className="object-cover"
          alt="Miniatura Evento"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-600">{category}</p>
      </div>
      <div>
        <h4 className="text-lg font-medium">Date and Time</h4>
        <div className="flex gap-2">
          <p>{formattedDate}</p>
          <p>{formattedTime}</p>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium">Ticket Information</h3>
        <div className="flex items-center gap-2">
          <p>{formattedPrice}</p>
          <div className={`flex items-center gap-1 ${capacityTextColor}`}>
            <Image
            src={capacityIcon}
            width={16}
            height={16}
            alt="Capacity Icon"
            className="mr-1"
            />
            <p>{capacityText}</p>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-medium">Location</h4>
        <p>{location}</p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
          aria-label={`Open location in Google Maps for ${location}`}
        >
          View on Google Maps
        </a>
      </div>
      <div>
        <h3 className="text-lg font-medium">Hosted by</h3>
        <p>{creatorId}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium">Description</h3>
        <p>{description}</p>
      </div>
    </main>
  );
};

export default EventData;