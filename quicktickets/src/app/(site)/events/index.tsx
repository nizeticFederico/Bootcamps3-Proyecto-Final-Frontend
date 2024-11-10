"use client"

import { useEffect, useState } from "react";
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
  const [filters, setFilters] = useState({ category: "", location: "", price: "", date: "" });

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
    const filtered = events.filter((event) => {
      const matchesCategory = !filters.category || event.category === filters.category;
      const matchesLocation = !filters.location || event.location === filters.location;
      const matchesPrice = !filters.price || (filters.price === "Free" ? event.price === 0 : event.price > 0);
      return matchesCategory && matchesLocation && matchesPrice;
    });
    setFilteredEvents(filtered);
  }, [filters, events]);

  return (
    <main className="flex flex-col items-center min-h-screen bg-white">
      <div className="flex flex-col w-full h-52 bg-[#4f4d6a] bg-cover bg-center items-center justify-center">
        <h2 className="font-bold text-4xl text-white text-center mb-5">
          Explore a world of events. Find what excites you!
        </h2>
        <div className="w-full">
          <SearchBar setFilters={setFilters} />
        </div>
      </div>
      <div className="flex flex-row w-full max-w-screen-xl">
        <div className="flex-none ml-0">
          <FilterColumn setFilters={setFilters} />
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