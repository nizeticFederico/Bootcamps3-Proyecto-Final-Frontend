"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const router = useRouter();
  const { data: session } = useSession(); // Obtener los datos de la sesión
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<number | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Recuperar datos de localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("previewEventData");
    if (storedData) {
      console.log(storedData);
      setEventData(JSON.parse(storedData));
    } else {
      router.push("/events/create-event"); // Redirigir si no hay datos
    }
  }, [router]);

  // Renderizar mapa de Google
  useEffect(() => {
    if (eventData) {
      const googleApiKey = process.env.NEXT_PUBLIC_API_DE_GOOGLE;
      const scriptId = "google-maps-script";

      if (!document.querySelector(`#${scriptId}`)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`;
        script.async = true;
        script.onload = () => {
          if (mapRef.current) {
            const map = new google.maps.Map(mapRef.current, {
              center: { lat: Number(eventData.latitude), lng: Number(eventData.longitude) },
              zoom: 15,
            });
            new google.maps.Marker({
              position: { lat: Number(eventData.latitude), lng: Number(eventData.longitude) },
              map,
            });
          }
        };
        document.head.appendChild(script);
      } else {
        if (mapRef.current && window.google) {
          const map = new google.maps.Map(mapRef.current, {
            center: { lat: Number(eventData.latitude), lng: Number(eventData.longitude) },
            zoom: 15,
          });
          new google.maps.Marker({
            position: { lat: Number(eventData.latitude), lng: Number(eventData.longitude) },
            map,
          });
        }
      }
    }
  }, [eventData]);

  // Función para crear el evento
  const handleCreateEvent = async () => {
    if (!session?.accessToken) {
      console.log("Token de autorización:", session?.accessToken); // Verificar que el token está presente
      setIsLoading(false);
      setStatus(401); // Si no hay token, retornamos un error 401
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3001/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": `${session?.accessToken}`, // Enviamos el token en los headers
        },
        body: JSON.stringify(eventData),
      });

      if (response.status === 201) {
        console.log("Evento creado con éxito");
        setStatus(response.status);
        setTimeout(() => {
          setStatus(null);
        }, 3000);
        router.push("/events"); // Redirigir a la página principal
      } else {
        console.error("Error al crear el evento:", response.statusText);
        setStatus(response.status);
        setTimeout(() => {
          setStatus(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setStatus(500);
    } finally {
      setIsLoading(false);
    }
  };

  if (!eventData) {
    return <p className="text-center text-gray-600">Cargando...</p>;
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
  const userName = session?.user?.name;

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
          <div className="h-40 w-80 bg-gray-200 rounded-md overflow-hidden">
            {/* Div que contendrá el mapa de Google */}
            <div ref={mapRef} className="h-full w-full"></div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Hosted by</h3>
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
              <p className="font-semibold">{userName}</p>
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
