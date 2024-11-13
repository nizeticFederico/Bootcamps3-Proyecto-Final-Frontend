import { useRouter } from "next/router";
import React from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRegClock,
  FaRegStar,
  FaShareAlt,
  FaTicketAlt,
} from "react-icons/fa";
import Image from "next/image";

const EventView: React.FC = () => {
  const router = useRouter();
  const eventData = router.query; // Recibir los datos desde la query

  // Si no hay datos, redirigir de nuevo a Create Event
  if (!eventData || Object.keys(eventData).length === 0) {
    router.push("/event/create");
    return null;
  }

  const handleCreateEvent = async () => {
    try {
      const response = await fetch("http://localhost:3001/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${session?.accessToken}`,
        },
        body: JSON.stringify(eventData),
      });

      if (response.status === 201) {
        const createdEvent = await response.json();
        console.log("Evento creado con éxito:", createdEvent);

        // Redirigir a la página del evento
        router.push(`/event/${createdEvent.id}`);
      } else {
        console.error("Error al crear el evento");
      }
    } catch (error) {
      console.error("Error durante la creación del evento:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 bg-white shadow-lg rounded-lg">
      {/* Event Image */}
      <div className="h-64 bg-gray-200 rounded-md overflow-hidden">
        <Image
          src={eventData.imageUrl}
          alt={eventData.name}
          className="w-full h-full object-cover"
          width={800}
          height={400}
        />
      </div>

      {/* Event Title, Share and Buy Tickets */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Vista previa del evento</h1>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{eventData.name}</h2>
        </div>
        <div className="flex items-center space-x-4">
          <FaRegStar className="h-6 w-6 text-gray-400 cursor-pointer" />
          <FaShareAlt className="h-6 w-6 text-gray-400 cursor-pointer" />
          <button className="bg-yellow-500 text-white px-5 py-2 rounded-md font-semibold flex items-center space-x-2">
            <FaTicketAlt className="h-5 w-5" />
            <span>Buy Tickets</span>
          </button>
        </div>
        <div className="mt-6 flex gap-4">
        <button
          onClick={() => router.push("/event/create")}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Volver
        </button>
        <button
          onClick={handleCreateEvent}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Crear evento
        </button>
      </div>
      </div>

      {/* Date and Time */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-700">Date and Time</h2>
        <div className="flex items-center space-x-2 text-gray-600">
          <FaCalendarAlt className="h-5 w-5" />
          <p>{eventData.dateTime}</p>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <FaRegClock className="h-5 w-5" />
          <p>{eventData.dateTime}</p>
        </div>
        <p className="text-blue-500 cursor-pointer">+ Add to Calendar</p>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-700">Location</h2>
        <div className="flex items-center space-x-2 text-gray-600">
          <FaMapMarkerAlt className="h-5 w-5" />
          <p>{eventData.location}</p>
        </div>
        <div className="h-40 w-80 bg-gray-200 rounded-md flex items-center justify-center">
          <span className="text-3xl text-red-500">&#x1F4CD;</span>{" "}
          {/* Pin icon */}
        </div>
      </div>

      {/* Ticket Information */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700">
          Ticket Information
        </h2>
        <div className="flex items-center mt-3 text-gray-600">
          <FaTicketAlt className="mr-2" />
          <p>Ticket Type: ${eventData.price}</p>
        </div>
      </div>

      {/* Hosted by */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Hosted by</h2>
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
          <div>
            <p className="font-semibold">Host Name</p>
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

      {/* Event Description */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700">
          Event Description
        </h2>
        <div className="max-w-lg">
          <p className="text-gray-600 mt-5 mb-8">
          {eventData.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventView;