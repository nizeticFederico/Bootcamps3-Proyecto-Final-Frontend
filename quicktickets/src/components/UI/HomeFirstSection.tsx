// componentes/UI/HomeFirstSection.tsx

"use client";

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

export default function HomeFirstSection() {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState(false);

  // Cambia los valores de filtro según tus necesidades
  const FILTER_CRITERIA = {
    category: "",
    minPrice: 100,
    maxPrice: "",
  };

  const visibleEvents = showAll ? filteredEvents : filteredEvents.slice(0, 6);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3001/event/all");
        if (response.ok) {
          const data = await response.json();
          const filteredData = applyFilters(data); // Aplicar filtros
          setFilteredEvents(filteredData);
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

  // Función para aplicar filtros de manera interna
  const applyFilters = (events: Event[]) => {
    return events.filter(event => 
/*       event.category === FILTER_CRITERIA.category && */
      event.price >= FILTER_CRITERIA.minPrice /* && */
/*       event.price <= FILTER_CRITERIA.maxPrice */
    );
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-white">
      <div className="flex flex-row w-full max-w-screen-xl">
        <div className="flex-grow ml-4 p-10">
          <div className="flex my-4">
            <h3>Titulo Ejemplo</h3>
          </div>

          {loading ? (
            <p>Loading section...</p>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleEvents.map((event) => (
                <CardSections key={event.name} {...event} />
              ))}
            </div>
          )}

          {/* Boton apra ver mas/ver menos */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-4 py-2 bg-white border border-blue-500 text-blue-500 rounded-md hover:bg-blue-100 transition"
            >
              {showAll ? "Ver menos" : "Ver mas"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}