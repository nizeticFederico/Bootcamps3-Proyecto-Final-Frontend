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

interface SectionConfig {
  title: string;
  endpoint: string;
  sectionId: string;
  params?: Record<string, string>;
}

interface HomeSectionsProps {
  section: SectionConfig;
}

export default function HomeSections({ section }: HomeSectionsProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState(1); 
  const eventsPerPage = 6; 

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        // Construir la URL dinámica
        const url = new URL(`http://localhost:3001${section.endpoint}`);
        if (section.params) {
          Object.entries(section.params).forEach(([key, value]) =>
            url.searchParams.append(key, value)
          );
        }

        const response = await fetch(url.toString());
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
  }, [section]);

  useEffect(() => {
    setCurrentPage(1);
  }, [events]);

  const visibleEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    return events.slice(startIndex, endIndex);
  }, [events, currentPage, eventsPerPage]);

  const totalPages = Math.ceil(events.length / eventsPerPage);

  return (
    <div
      id={section.sectionId}
      className="flex flex-col items-center min-h-screen bg-white"
    >
      <div className="flex flex-row w-full max-w-screen-xl">
        <div className="flex-grow ml-4 p-10">
          <div className="flex my-4">
            <h3>{section.title}</h3>
          </div>

          {loading ? (
            <p>Loading section...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {visibleEvents.map((event) => (
                  <CardSections key={event._id} {...event} />
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