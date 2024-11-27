"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/UI/SearchBar";
import FilterColumn from "@/components/UI/FilterColumn";
import EventCard from "@/components/UI/CardEvent";
import { useFetchLocations } from "@/hooks/useFetchLocations";

interface Event {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  dateTime: string;
  price: number;
  capacity: number;
  availability: number;
  category: string;
  location: string; // Formato: "City, Country"
  latitude: number;
  longitude: number;
  creatorId: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const eventsPerPage = 8;

  const [filters, setFilters] = useState({
    category: "",
    location: "",
    price: "",
    date: "",
    categoryImageUrl: "",
  });

  const searchParams = useSearchParams();
  const locations = useFetchLocations("http://localhost:3001/event/all");

  const onSearch = (name: string, location: string) => {
    let filtered = events;

    if (location) {
      filtered = filtered.filter(
        (event) => event.location.split(", ")[1] === location
      );
    }

    if (name) {
      const lowercasedName = name.toLowerCase();
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(lowercasedName)
      );
    }

    if (filters.category) {
      filtered = filtered.filter(
        (event) => event.category === filters.category
      );
    }

    if (filters.price) {
      if (filters.price === "Free") {
        filtered = filtered.filter((event) => event.price === 0);
      } else if (filters.price === "Paid") {
        filtered = filtered.filter((event) => event.price > 0);
      }
    }

    if (filters.date) {
      const today = new Date();
      if (filters.date === "Today") {
        filtered = filtered.filter(
          (event) =>
            new Date(event.dateTime).toDateString() === today.toDateString()
        );
      } else if (filters.date === "Tomorrow") {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        filtered = filtered.filter(
          (event) =>
            new Date(event.dateTime).toDateString() === tomorrow.toDateString()
        );
      }
    }

    setFilteredEvents(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("http://localhost:3001/event/all");
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
          setFilteredEvents(data);
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

  useEffect(() => {
    const category = searchParams.get("category") || "";
    const imageUrl = searchParams.get("imageUrl") || "";
    setFilters((prevFilters) => ({
      ...prevFilters,
      category,
      categoryImageUrl: imageUrl,
    }));
  }, [searchParams]);

  useEffect(() => {
    const name = searchParams.get("name") || "";
    const location = searchParams.get("location") || "";
    onSearch(name, location);
  }, [events, searchParams, filters]);

  const handleCategoryFilter = (category: string, categoryImageUrl: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category,
      categoryImageUrl: category ? categoryImageUrl : "",
    }));
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  return (
    <main className="flex flex-col items-center min-h-screen bg-white">
      <div
        className="flex flex-col w-full h-52 bg-cover bg-center items-center justify-center"
        style={{
          backgroundImage: filters.categoryImageUrl
            ? `url(${filters.categoryImageUrl})`
            : "none",
          backgroundColor: filters.categoryImageUrl ? "transparent" : "#4f4d6a",
        }}
      >
        <h2 className="font-bold text-4xl text-white text-center mb-5">
          Explore a world of events. Find what excites you!
        </h2>
        <div className="w-full">
          <SearchBar onSearch={onSearch} locations={locations} />
        </div>
      </div>
      <div className="flex flex-row w-full max-w-screen-xl">
        <div className="flex-none ml-0">
          <FilterColumn
            setFilters={setFilters}
            onCategoryFilter={handleCategoryFilter}
          />
        </div>
        <div className="flex-grow ml-4 p-10">
          {loading ? (
            <p>Loading events...</p>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {currentEvents.map((event) => (
                  <EventCard key={event._id} {...event} />
                ))}
              </div>

              {/* Paginación numérica */}
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`px-3 py-1 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
