"use client";

/* import React, { useState } from "react"; */
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Router para redirección
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRegClock,
  FaRegStar,
  FaShareAlt,
  FaTicketAlt,
} from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import GoogleMapComponent from "@/components/UI/GoogleMaps";

interface EventDataProps {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  dateTime: string;
  price: number;
  category: string;
  location: string;
  latitude: number;
  longitude: number;
  creatorId: string;
  availability: number;
}

const EventData: React.FC<EventDataProps> = ({
  _id,
  name,
  imageUrl,
  description,
  dateTime,
  price,
  category,
  location,
  latitude,
  longitude,
  creatorId,
  availability,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const eventDate = new Date(dateTime);
  const formattedDate = eventDate.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedTime = eventDate.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(price);

  const isSoldOut = availability === 0;
  const capacityTextColor = isSoldOut ? "text-red-500" : "text-blue-600";
  const capacityText = isSoldOut ? "Sold Out" : `${availability} tickets left`;

/*   const [marker] = useState<{ lat: number; lng: number }>({
    lat: latitude,
    lng: longitude,
  }); */

  const isCreator = session?.user?.id === creatorId; // Verificar si el usuario es el creador

  const handleEditEvent = () => {
    const query = new URLSearchParams({
      _id,
      name,
      description,
      imageUrl,
      dateTime,
      price: price.toString(),
      capacity: availability.toString(),
      category,
      location,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    }).toString();
  
    router.push(`/events/create-event?${query}`);
  };

  const buyStripe = async () => {
    const payData = { eventId: _id, quantity: 1 };
    const response = await fetch("http://localhost:3001/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `${session?.accessToken || ""}`,
      },
      body: JSON.stringify(payData),
    });
    const data = await response.json();
    window.open(data);
  };

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
            {isCreator ? (
              <button
                onClick={handleEditEvent}
                className="bg-blue-500 text-white px-5 py-2 rounded-md font-semibold flex items-center space-x-2"
              >
                <span>Edit Event</span>
              </button>
            ) : (
              <button
                onClick={buyStripe}
                className="bg-yellow-500 text-white px-5 py-2 rounded-md font-semibold flex items-center space-x-2"
              >
                <FaTicketAlt className="h-5 w-5" />
                <span>Buy Tickets</span>
              </button>
            )}
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
              {price === 0 ? "FREE" : `ARS ${formattedPrice}`}
              {/* <p>{formattedPrice}</p> */}
            </div>
            <div className={`flex items-center gap-1 ${capacityTextColor}`}>
              <TiGroup className="mr-2" />
              <p>{capacityText}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium">Location</h3>
          <div className="flex">
            <FaMapMarkerAlt className="mr-2 mt-0.5 text-red-500" />
            <p>{location}</p>
          </div>
          {/* Map Section */}
          <div className="w-full max-w-3xl mt-6">
            <GoogleMapComponent
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
              center={{ lat: latitude, lng: longitude }}
              markerPosition={{ lat: latitude, lng: longitude }}
              readOnly
            />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Hosted by</h3>
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
              <p className="font-semibold">{creatorId}</p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm border rounded-md">Contact</button>
                <button className="px-3 py-1 text-sm border rounded-md">Follow</button>
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