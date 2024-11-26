"use client";

import React from "react"; // Aseguramos importar React
import { useRouter } from "next/navigation";
import { useFetchLocations } from "@/hooks/useFetchLocations";
import SearchBar from "@/components/UI/SearchBar";
import CategoriesBanner from "@/components/UI/CategoriesBanner";
import NewsletterBanner from "@/components/UI/NewsLetterBanner";
import CreateEventBanner from "@/components/UI/CreateEventBanner";
import HomeSections from "@/components/UI/HomeSections";
import sectionsConfig from "@/components/UI/sectionsConfig";

export default function HomePage() {
  const router = useRouter();
  const locations = useFetchLocations("http://localhost:3001/event/all");

  // Función que redirige a EventsPage con los parámetros de búsqueda
  const handleSearch = (name: string, location: string) => {
    const queryParams = new URLSearchParams();
    if (name) queryParams.set("name", name);
    if (location) queryParams.set("location", location);

    router.push(`/events?${queryParams.toString()}`);
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-white">
      {/* Hero Section */}
      <div className="flex flex-col w-full h-80 bg-[url('../../public/assets/images/home2.jpg')] bg-cover bg-center items-center justify-center">
        <h2 className="font-bold text-4xl text-white text-left p-4 mb-5">
          Don&apos;t miss out! <br />
          Explore the <span className="text-[#FFE047]">
            vibrant events
          </span>{" "}
          happening locally and globally.
        </h2>
        <div className="w-full text-base">
          <SearchBar onSearch={handleSearch} locations={locations} />
        </div>
      </div>

      {/* Categories Banner */}
      <CategoriesBanner />

      {/* Dynamic Sections with Banners */}
      {sectionsConfig.map((section, index) => (
        <React.Fragment key={section.sectionId}>
          <HomeSections section={section} />
          {/* Add banners at specific intervals */}
          {index === 0 && <NewsletterBanner />}
          {index === 1 && <CreateEventBanner />}
        </React.Fragment>
      ))}
    </main>
  );
}
