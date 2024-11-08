"use client"

import { useEffect, useState } from "react";
import CardSections from "./CardSection";

interface Event {
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

export default function HomeSection() {
  //el Event guarda la lista de eventos que viene de la BD
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("http://localhost:3001/event/all"); // Aca tenemos que ver la ruta segun el endpoint
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error("Failed to load events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen bg-white">
      <div className="flex flex-row w-full max-w-screen-xl">
        <div className="flex-grow ml-4 p-10">
            <div className="flex my-4">
                <h3>Titulo Ejemplo</h3>
            </div>
        {/* le copie a lo de la clase */}
          {loading ? (
            <p>Loading section...</p>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((event) => (
                <CardSections key={event.name} {...event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}