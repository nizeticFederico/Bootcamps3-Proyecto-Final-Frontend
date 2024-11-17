"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Para manejar la sesión
import { useRouter } from "next/navigation"; // Redirigir al usuario
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRegClock,
  FaTicketAlt,
} from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import { TfiBackLeft } from "react-icons/tfi";
import { MdOutlineEventAvailable } from "react-icons/md";
import GoogleMapComponent from "./GoogleMaps";

interface EventData {
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

const PreviewEvent: React.FC = () => {
  const [marker, setMarker] = useState({ lat: 0, lng: 0 }); // Inicializa con coordenadas por defecto
  const router = useRouter();
  const { data: session } = useSession();
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<number | null>(null);

  // Cargar datos del evento desde Local Storage
  useEffect(() => {
    const storedData = localStorage.getItem("previewEventData");
    if (storedData) {
      const event = JSON.parse(storedData);
      setEventData(event);

      // Validar que las coordenadas sean números válidos
      const lat = parseFloat(event.latitude);
      const lng = parseFloat(event.longitude);

      if (!isNaN(lat) && !isNaN(lng)) {
        setMarker({ lat, lng });
      } else {
        console.error("Coordenadas no válidas:", event.latitude, event.longitude);
      }
    } else {
      router.push("/events/create-event");
    }
  }, [router]);

  // Manejar creación del evento
  const handleCreateEvent = async () => {
    const eventData = {
      name, // Asegúrate de que estas variables tengan datos válidos
      description,
      imageUrl,
      dateTime,
      price,
      capacity,
      category,
      location,
      latitude: marker.lat,
      longitude: marker.lng,
      creatorId: session?.user.id, // Si utilizas NextAuth
    };

    console.log("Datos enviados:", eventData); // Muestra los datos en la consola

    try {
      const response = await fetch("http://localhost:3001/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${session?.accessToken}`,
        },
        body: JSON.stringify(eventData),
      });

      console.log('Token de acceso:', session?.accessToken);

      if (response.ok) {
        router.push(`/events`);
      } else {
        setStatus(response.status);
        console.error("Error al crear el evento:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!eventData) {
    return <p className="text-center text-gray-600">Cargando datos del evento...</p>;
  }

   // Desestructurar los datos del evento
   const { name, description, imageUrl, dateTime, price, capacity, category, location, creatorId } = eventData;

   // Formatear fecha y hora
   const formattedDate = new Date(dateTime).toLocaleDateString("es-AR", {
     day: "2-digit",
     month: "short",
     year: "numeric",
   });
 
   const formattedTime = new Date(dateTime).toLocaleTimeString("es-AR", {
     hour: "2-digit",
     minute: "2-digit",
   });
 
   // Formatear precio
   const formattedPrice = new Intl.NumberFormat("es-AR", {
     style: "currency",
     currency: "ARS",
   }).format(price);
 
   const isSoldOut = capacity === 0;
   const capacityTextColor = isSoldOut ? 'text-red-500' : 'text-blue-600';
   const capacityText = isSoldOut ? 'Sold Out' : `${capacity} tickets left`;

  return (
    <main>
      <div className="max-w-3xl mx-auto p-6 space-y-8 bg-white shadow-lg rounded-lg">
        {/* Event Image */}
        <div className="h-64 bg-gray-200 rounded-md overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
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
            <button
            onClick={() => router.push("/events/create-event")}
            className="bg-blue-500 text-white px-5 py-2 rounded-md font-semibold flex items-center space-x-2">
              <TfiBackLeft className="h-5 w-5" />
              <span>Volver atrás</span>
            </button>
            <button
            onClick={handleCreateEvent}
            className="bg-green-500 text-white px-5 py-2 rounded-md font-semibold flex items-center space-x-2"
            disabled={isLoading}>
              <MdOutlineEventAvailable  className="h-5 w-5 mr-1" />
              {isLoading ? "Creando..." : "Crear Evento"}
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
          <div className='flex'>
            <FaMapMarkerAlt className="mr-2 mt-0.5 text-red-500" />
            <p>{location}</p>
          </div>
          {/* Mapa */}
          <div className="mt-6 h-64 rounded-lg shadow-md overflow-hidden">
            <GoogleMapComponent
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              center={marker} // Coordenadas del marcador
              markerPosition={marker} // Posición del marcador
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

export default PreviewEvent;
