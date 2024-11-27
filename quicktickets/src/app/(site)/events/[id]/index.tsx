"use client";

import { useEffect, useState } from "react";
import DataEvent from "@/components/UI/DataEvent";

interface Event {
  _id:string
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
  availability: number;
}

interface EventPageProps {
  id: string;
}

export default function EventPage({ id }: EventPageProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(`https://kit-rich-starling.ngrok-free.app/event/${id}`,{
          headers: {
            'ngrok-skip-browser-warning': '1'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setEvent(data);
        } else {
          console.error("Failed to load event");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    }
      fetchEvent();
  }, [id]);

  if (loading) return <p>Loading event...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <main className="flex flex-col items-center min-h-screen bg-white">
      <DataEvent {...event} />
    </main>
  );
}
