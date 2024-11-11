// src/app/(site)/events/index.tsx

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/UI/SearchBar";
import FilterColumn from "@/components/UI/FilterColumn";
import EventCard from "@/components/UI/CardEvent";

interface Event {
  _id: string;
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
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    price: "",
    date: "",
    categoryImageUrl: "",
  });

  const searchParams = useSearchParams();
  const locations = Array.from(new Set(events.map((event) => event.location)));

  const onSearch = (name: string, location: string) => {
    let filtered = events;

    if (location) {
      filtered = filtered.filter((event) => event.location === location);
    }

    if (name) {
      const lowercasedName = name.toLowerCase();
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(lowercasedName)
      );
    }

    if (filters.category) {
      filtered = filtered.filter((event) => event.category === filters.category);
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
          (event) => new Date(event.dateTime).toDateString() === today.toDateString()
        );
      } else if (filters.date === "Tomorrow") {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        filtered = filtered.filter(
          (event) => new Date(event.dateTime).toDateString() === tomorrow.toDateString()
        );
      } else if (filters.date === "This Week") {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        filtered = filtered.filter((event) => {
          const eventDate = new Date(event.dateTime);
          return eventDate >= startOfWeek && eventDate <= endOfWeek;
        });
      } else if (filters.date === "This Weekend") {
        const startOfWeekend = new Date(today);
        const endOfWeekend = new Date(today);

        startOfWeekend.setDate(today.getDate() + (6 - today.getDay()));
        endOfWeekend.setDate(today.getDate() + (7 - today.getDay()));

        filtered = filtered.filter((event) => {
          const eventDate = new Date(event.dateTime);
          return eventDate >= startOfWeekend && eventDate <= endOfWeekend;
        });
      }
    }

    setFilteredEvents(filtered);
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
          <FilterColumn setFilters={setFilters} onCategoryFilter={handleCategoryFilter} />
        </div>
        <div className="flex-grow ml-4 p-10">
          {loading ? (
            <p>Loading events...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {filteredEvents.map((event) => (
                <EventCard key={event._id} {...event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}