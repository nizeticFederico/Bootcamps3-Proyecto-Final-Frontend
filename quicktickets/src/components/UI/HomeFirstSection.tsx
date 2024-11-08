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

  // Configura los criterios de filtro según sea necesario; si un valor está vacío, no se aplicará ese filtro
  
  const visibleEvents = showAll ? filteredEvents : filteredEvents.slice(0, 6);
  
  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3001/event/all");
        if (response.ok) {
          const data = await response.json();
          
          const FILTER_CRITERIA = {
            category: "Teatro",
            minPrice: null as number | null, // Cambiar a null si no se aplica el filtro
            maxPrice: null as number | null, // Cambiar a null si no se aplica el filtro
            location: "",
            dateRange: "", // Puede ser "today", "week", o "month"
          };

          // Mover applyFilters aquí mismo
          const applyFilters = (events: Event[]) => {
            const today = new Date();
            const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const startOfWeek = new Date(startOfDay);
            startOfWeek.setDate(startOfDay.getDate() - (startOfDay.getDay() || 7) + 1);
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            
            return events.filter(event => {
              const eventDate = new Date(event.dateTime);
              if (isNaN(eventDate.getTime())) {
                console.error(`Invalid date format for event: ${event.dateTime}`);
                return false;
              }
              
              const matchesCategory = FILTER_CRITERIA.category ? event.category === FILTER_CRITERIA.category : true;
              const matchesMinPrice = FILTER_CRITERIA.minPrice !== null ? event.price >= FILTER_CRITERIA.minPrice : true;
              const matchesMaxPrice = FILTER_CRITERIA.maxPrice !== null ? event.price <= FILTER_CRITERIA.maxPrice : true;
              const matchesLocation = FILTER_CRITERIA.location ? event.location.includes(FILTER_CRITERIA.location) : true;
              
              let matchesDateRange = true;
              switch (FILTER_CRITERIA.dateRange) {
                case "today":
                  matchesDateRange = eventDate >= startOfDay && eventDate < new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
                  break;
                case "week":
                  matchesDateRange = eventDate >= startOfWeek && eventDate < new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000);
                  break;
                case "month":
                  matchesDateRange = eventDate >= startOfMonth && eventDate < new Date(today.getFullYear(), today.getMonth() + 1, 1);
                  break;
              }
              return matchesCategory && matchesMinPrice && matchesMaxPrice && matchesLocation && matchesDateRange;
            });
          };
  
          const filteredData = applyFilters(data);
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
  
  return (
    <main id="HomeFirstSection" className="flex flex-col items-center min-h-screen bg-white">
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

          {/* Botón para ver más/ver menos */}
          <div className="flex justify-center mt-4">
          <button
            onClick={() => {
              setShowAll(!showAll);
              if (showAll) {
                window.scrollTo({
                  top: document.getElementById('HomeFirstSection')?.offsetTop || 0,
                  behavior: 'smooth',
                });
              }
            }}
            className="px-4 py-2 bg-white border border-blue-500 text-blue-500 rounded-md hover:bg-blue-100 transition"
          >
            {showAll ? "Ver menos" : "Ver más"}
          </button>
          </div>
        </div>
      </div>
    </main>
  );
}