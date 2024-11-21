// HomeSections.tsx

"use client";

import { useEffect, useState, useMemo } from "react";
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
  sectionId: string;
}

export default function HomeSections({ title, filterCriteria, sectionId }: HomeSectionsProps) {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  
  const [currentPage, setCurrentPage] = useState(1); 
  const eventsPerPage = 6; 

  
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

  const applyFilters = (events: Event[], criteria: FilterCriteria) => {
    return events.filter((event) => {
      const matchesCategory = criteria.category ? event.category === criteria.category : true;
      const matchesMinPrice = criteria.minPrice !== null ? event.price >= criteria.minPrice : true;
      const matchesMaxPrice = criteria.maxPrice !== null ? event.price <= criteria.maxPrice : true;
      const matchesLocation = criteria.location ? event.location.includes(criteria.location) : true;
      return matchesCategory && matchesMinPrice && matchesMaxPrice && matchesLocation;
    });
  };


  useEffect(() => {
    setCurrentPage(1);
  }, [filteredEvents]);

  
  const visibleEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    return filteredEvents.slice(startIndex, endIndex);
  }, [filteredEvents, currentPage, eventsPerPage]);

  
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  return (
    <div id={sectionId} className="flex flex-col items-center min-h-screen bg-white">
      <div className="flex flex-row w-full max-w-screen-xl">
        <div className="flex-grow ml-4 p-10">
          <div className="flex my-4">
            <h3>{title}</h3>
          </div>

          {loading ? (
            <p>Loading section...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {visibleEvents.map((event) => (
                  <CardSections key={event.name} {...event} />
                ))}
              </div>
              
              <div className="flex justify-center mt-4">          
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 mx-1 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}              
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}