//componentes/UI/CardSection.tsx

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TiGroup } from "react-icons/ti";
import { FaTicketAlt } from "react-icons/fa";

interface CardSectionsProps {
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

const CardSections: React.FC<CardSectionsProps> = ({
  _id, // Asegúrate de recibir el ID aquí
  name,
  imageUrl,
  dateTime,
  price,
  capacity,
  category,
  location,
  availability,
}) => {
  const router = useRouter();
  const eventDate = new Date(dateTime);
  const day = eventDate.toLocaleDateString('en-AR', { day: '2-digit' });
  const month = eventDate.toLocaleDateString('en-AR', { month: 'short' });
  const formattedTime = eventDate.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

  const handleCardClick = () => {
    router.push(`/events/${_id}`);
  };

  return (
    <div onClick={handleCardClick} className=" cursor-pointer flex flex-wrap items-stretch mb-8">
        <div className="flex flex-col border rounded-lg shadow-lg overflow-hidden bg-white w-80 min-h-full">
        {/* Imagen y botón de favorito */}
        <div className="relative h-40 w-full">
            <Image
            src={imageUrl}
            fill
            className="object-cover"
            alt="Miniatura Evento"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
        </div>
    </div>
  );
};

export default CardSections;