import { useEffect, useState } from "react";

interface Event {
  location: string; // Formato: "City, Country"
}

export function useFetchLocations(apiUrl: string) {
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data: Event[] = await response.json();

          // Extraer y procesar las ubicaciones únicas
          const uniqueCountries = Array.from(
            new Set(data.map((event) => event.location.split(", ").pop() || ""))
          ).filter(Boolean);

          setLocations(uniqueCountries);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, [apiUrl]);

  return locations;
}