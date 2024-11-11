"use client"

import { useRouter } from 'next/navigation';
import SearchBar from "@/components/UI/SearchBar";
import CategoriesBanner from "@/components/UI/CategoriesBanner";
import NewsletterBanner from "@/components/UI/NewsLetterBanner";
import CreateEventBanner from "@/components/UI/CreateEventBanner";
import HomeFirstSection from "@/components/UI/HomeFirstSection";
import HomeSecondSection from "@/components/UI/HomeSecondSection";
import HomeThirdSection from "@/components/UI/HomeThirdSection";

export default function HomePage() {
  const router = useRouter();

  // Función que redirige a EventsPage con los parámetros de búsqueda
  const handleSearch = (name: string, location: string) => {
    const queryParams = new URLSearchParams();
    if (name) queryParams.set("name", name);
    if (location) queryParams.set("location", location);

    router.push(`/events?${queryParams.toString()}`);
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-white">
      <div className="flex flex-col w-full h-80 bg-[url('../../public/assets/images/home2.jpg')] bg-cover bg-center items-center justify-center">
        <h2 className="font-bold text-4xl text-white text-left p-4 mb-5">
          Don&apos;t miss out! <br />
          Explore the <span className="text-[#FFE047]">vibrant events</span> happening locally and globally.
        </h2>
        <div className="w-full text-base">
          <SearchBar onSearch={handleSearch} locations={[]} />
        </div>
      </div>
      <div>
        <CategoriesBanner />
        <HomeFirstSection />
        <NewsletterBanner />
        <HomeSecondSection />
        <CreateEventBanner />
        <HomeThirdSection />
      </div>
    </main>
  );
}