import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TiGroup } from "react-icons/ti";
import { FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";

interface EventCardProps {
  _id: string; // Agrega el ID como prop
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
  availability: number;
}

const EventCard: React.FC<EventCardProps> = ({
  _id, // Asegúrate de recibir el ID aquí
  name,
  imageUrl,
  dateTime,
  price,
  capacity,
  category,
  location,
  latitude,
  longitude,
  availability,
}) => {
  const router = useRouter();
  const eventDate = new Date(dateTime);
  const formattedDate = eventDate.toLocaleDateString('en-AR', { day: '2-digit', month: 'short', year: 'numeric' });
  const formattedTime = eventDate.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

  const handleCardClick = () => {
    router.push(`/events/${_id}`);
  };

  return (
    <div onClick={handleCardClick} className="cursor-pointer flex border rounded-md shadow-md overflow-hidden bg-white mb-8">
      <div className="w-1/2 h-full overflow-hidden rounded relative">
        <Image
          src={imageUrl}
          fill
          className="object-cover"
          alt="Miniatura Evento"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
{/*         <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
          <Image
            src="/assets/images/icons/star.svg"
            width={15}
            height={15}
            alt="Favorito"
          />
        </button> */}
        <div className="absolute bottom-0 px-2 py-1 bg-[#FFE047] text-black text-xs font-semibold rounded-tr-lg">
          {category}
        </div>
      </div>
      <div className="flex flex-col justify-between p-2 w-1/2">
        <div className="h-1/3 mb-1 truncate-2-lines">
          <h4 className="font-semibold text-sm">{name}</h4>
        </div>
        <div className="text-gray-600 text-xs">
          <p>{formattedDate} | {formattedTime}</p>
          <p>{location}</p>
        </div>
        <div className="flex text-xs mt-1 mb-2 text-blue-500">
          <FaMapMarkerAlt className='mr-1 mt-0.5'/>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Location
          </a>
        </div>
        <div className="flex space-x-2">
          <div className="">
            <p className= "text-green-600 text-xs flex">
              <FaTicketAlt className='mr-1 mt-0.5'/>
              {price === 0 ? "FREE" : `ARS ${price}`}
            </p>
          </div>
          <div>
            <p className={` text-xs flex ${availability === 0 ? 'text-red-600' : 'text-blue-600'}`}>
              <TiGroup className='mr-1 mt-0.5'/>
              {availability === 0 ? "Sold Out" : availability}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;