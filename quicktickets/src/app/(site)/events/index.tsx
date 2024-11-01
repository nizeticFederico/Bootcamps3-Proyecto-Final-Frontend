"use client"

import { useEffect, useState } from "react";
import SearchBar from "@/components/UI/SearchBar";
import FilterColumn from "@/components/UI/FilterColumn";
import EventCard from "@/components/UI/CardEvent";

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

export default function EventsPage() {
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
      <div className="flex flex-col w-full h-52 bg-[#4f4d6a] bg-cover bg-center items-center justify-center">
        <h2 className="font-bold text-4xl text-white text-center mb-5">
          Explore a world of events. Find what excites you!
        </h2>
        <div className="w-full">
          <SearchBar />
        </div>
      </div>
      <div className="flex flex-row w-full max-w-screen-xl">
        <div className="flex-none ml-0">
          <FilterColumn />
        </div>
        <div className="flex-grow ml-4 p-10">
        {/* le copie a lo de la clase */}
          {loading ? (
            <p>Loading events...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {events.map((event) => (
                <EventCard key={event.name} {...event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}