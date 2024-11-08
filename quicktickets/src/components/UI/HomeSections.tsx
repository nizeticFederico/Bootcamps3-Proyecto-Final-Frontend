// HomeSection.tsx
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

interface FilterCriteria {
  category?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  location?: string | null;
  dateRange?: string | null;
}

interface HomeSectionsProps {
  title: string;
  filterCriteria: FilterCriteria;
}

export default function HomeSections({ title, filterCriteria }: HomeSectionsProps) {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState(false);

  const visibleEvents = showAll ? filteredEvents : filteredEvents.slice(0, 6);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3001/event/all");
        if (response.ok) {
          const data = await response.json();
          const filteredData = applyFilters(data, filterCriteria);
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
  }, [filterCriteria]);

  // Función para aplicar filtros de manera condicional
    const applyFilters = (events: Event[], criteria: FilterCriteria) => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfWeek = new Date(startOfDay);
    startOfWeek.setDate(startOfDay.getDate() - (startOfDay.getDay() || 7) + 1);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    return events.filter(event => {
      const eventDate = new Date(event.dateTime);
      if (isNaN(eventDate.getTime())) return false;

      const matchesCategory = criteria.category ? event.category === criteria.category : true;
      const matchesMinPrice = criteria.minPrice !== null ? event.price >= criteria.minPrice : true;
      const matchesMaxPrice = criteria.maxPrice !== null ? event.price <= criteria.maxPrice : true;
      const matchesLocation = criteria.location ? event.location.includes(criteria.location) : true;

      let matchesDateRange = true;
      switch (criteria.dateRange) {
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

  return (
    <main id="HomeSections" className="flex flex-col items-center min-h-screen bg-white">
      <div className="flex flex-row w-full max-w-screen-xl">
        <div className="flex-grow ml-4 p-10">
          <div className="flex my-4">
            <h3>{title}</h3>
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

          <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                setShowAll(!showAll);
                if (showAll) {
                  window.scrollTo({
                    top: document.getElementById("HomeSections")?.offsetTop || 0,
                    behavior: "smooth",
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