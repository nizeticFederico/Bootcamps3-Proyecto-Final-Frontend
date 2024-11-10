
import React from 'react';
import Image from 'next/image';
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRegClock,
  FaRegStar,
  FaShareAlt,
  FaTicketAlt,
} from "react-icons/fa";
import { TiGroup } from "react-icons/ti";

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
  const capacityTextColor = isSoldOut ? 'text-red-500' : 'text-blue-600';
  const capacityText = isSoldOut ? 'Sold Out' : `${capacity} tickets left`;
/*   const capacityIcon = isSoldOut ? '/group-red.svg' : '/group.svg'; */

  return (
    <main>
      <div className="max-w-3xl mx-auto p-6 space-y-8 bg-white shadow-lg rounded-lg">
        {/* Event Image */}
        <div className="h-64 bg-gray-200 rounded-md overflow-hidden">
          <Image
            src={imageUrl}
            alt="Event"
            className="w-full h-full object-cover"
            width={800}
            height={400}
          />
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
            <p className="text-gray-600">{category}</p>
          </div>
          <div className="flex items-center space-x-4">
            <FaRegStar className="h-6 w-6 text-gray-400 cursor-pointer" />
            <FaShareAlt className="h-6 w-6 text-gray-400 cursor-pointer" />
            <button className="bg-yellow-500 text-white px-5 py-2 rounded-md font-semibold flex items-center space-x-2">
              <FaTicketAlt className="h-5 w-5" />
              <span>Buy Tickets</span>
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-700">Date and Time</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2 text-gray-600 mb-1">
              <FaCalendarAlt className="h-5 w-5" />
              <p>{formattedDate}</p>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 mb-1">
              <FaRegClock className="h-5 w-5" />
              <p>{formattedTime}</p>
            </div>
            <div>
              <p className="text-blue-500 cursor-pointer">+ Add to Calendar</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-700">Ticket Information</h3>
          <div className="flex flex-col mt-3">
            <div className={`flex items-center gap-1 text-green-500`}>
              <FaTicketAlt className="mr-2" />
              <p>{formattedPrice}</p>
            </div>
            <div className={`flex items-center gap-1 ${capacityTextColor}`}>
              <TiGroup className="mr-2" />
              <p>{capacityText}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium">Location</h3>
          <div className="flex items-center space-x-2 text-gray-600">
            <FaMapMarkerAlt/>
            <p>{location}</p>
          </div>
          <div className="h-40 w-80 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-3xl text-red-500">&#x1F4CD;</span>{" "}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
              aria-label={`Open location in Google Maps for ${location}`}
            >
              View on Google Maps EJMPLO
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Hosted by</h3>
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
              <p className="font-semibold">{creatorId}</p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm border rounded-md">
                  Contact
                </button>
                <button className="px-3 py-1 text-sm border rounded-md">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
        <h3 className="text-xl font-semibold text-gray-700">Event Description</h3>
        <div className="max-w-lg">
          <p>{description}</p>
        </div>
      </div>
      </div>
    </main>
  );
};

export default EventData;