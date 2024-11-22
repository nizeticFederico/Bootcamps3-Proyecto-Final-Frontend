"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CardSections from "@/components/UI/CardSection"; // Importamos las Cards

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
  location: string;
  latitude: number;
  longitude: number;
  creatorId: string;
}

export default function MyEvents() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("Session data:", session);

    if (session?.user) {
      async function fetchUserEvents() {
        try {
          const response = await fetch("http://localhost:3001/event/own-events", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: `${session?.accessToken || ""}`, // Usamos el token si está disponible
            },
          });
          if (!response.ok) {
            console.error("Failed to fetch user events:", response.statusText);
            return;
          }
          const data = await response.json();
          setEvents(data);
        } catch (error) {
          console.error("Error fetching user events:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchUserEvents();
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="flex flex-col w-full max-w-screen-xl">
        <div className="flex-grow ml-4 p-10">
          <h1 className="text-3xl font-bold text-center mt-6">My Events</h1>
        </div>
        <div className="flex-grow ml-4 p-10">
          {loading ? (
            <p className="text-center mt-4">Loading...</p>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {events.map((event) => (
                <CardSections key={event._id} {...event} />
              ))}
            </div>
          ) : (
            <p className="text-center mt-4">You have no events.</p>
          )}
        </div>
      </div>
    </div>
  );
}