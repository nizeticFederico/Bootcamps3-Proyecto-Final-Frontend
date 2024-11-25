"use client";

import React, { useEffect, useState } from "react";
import GoogleMapComponent from "@/components/UI/GoogleMaps";

interface EventData {
  _id: string;
  name: string;
  latitude: number;
  longitude: number;
}

const AllEventsMap: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch events from the backend
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://kit-rich-starling.ngrok-free.app/events"); // Ajusta la URL de tu backend
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p>Loading map...</p>;
  }

  return (
    <main className="flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Events Map</h1>
      <div className="w-full h-[500px] rounded-md overflow-hidden">
        <GoogleMapComponent
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
          center={{
            lat: events[0]?.latitude || 0,
            lng: events[0]?.longitude || 0,
          }}
          markers={events.map((event) => ({
            position: { lat: event.latitude, lng: event.longitude },
            label: event.name,
          }))}
        />
      </div>
    </main>
  );
};

export default AllEventsMap;