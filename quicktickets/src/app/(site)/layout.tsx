"use client"

import Footer from "@/components/UI/Footer";
import NavBar from "@/components/UI/Header";
import ScrollToTopButton from "@/components/UI/ScrollToTopButton";
import { SessionProvider } from "next-auth/react";
import { LoadScript } from "@react-google-maps/api";
/* import { auth } from "@/auth";

const session = await auth(); */


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className= "antialiased">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
        <SessionProvider>
        <NavBar/>
        {children}
        <ScrollToTopButton/>
        <Footer/>
        </SessionProvider>
      </LoadScript>
    </div>
  );
}