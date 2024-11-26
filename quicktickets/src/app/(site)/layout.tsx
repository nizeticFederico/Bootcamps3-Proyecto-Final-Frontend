"use client";

import Footer from "@/components/UI/Footer";
import NavBar from "@/components/UI/Header";
import ScrollToTopButton from "@/components/UI/ScrollToTopButton";
import { SessionProvider } from "next-auth/react";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"]; // Agrega las librerías necesarias

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  if (loadError) {
    console.error("Google Maps script failed to load.");
    return <div>Error loading Google Maps API</div>;
  }

  return (
    <div className="antialiased">
      <SessionProvider>
        <NavBar />
        {isLoaded ? children : <div>Loading...</div>}
        <ScrollToTopButton />
        <Footer />
      </SessionProvider>
    </div>
  );
}