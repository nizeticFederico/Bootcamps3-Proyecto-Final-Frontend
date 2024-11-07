import type { Metadata } from "next";
import Footer from "@/components/UI/Footer";
import NavBar from "@/components/UI/Header";
import ScrollToTopButton from "@/components/UI/ScrollToTopButton";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import NewsletterBanner from "@/components/UI/NewsLetterBanner";
import CreateEventBanner from "@/components/UI/CreateEventBanner";

const session = await auth();

export const metadata: Metadata = {
  title: "QuickTickets",
  description: "QuickTickets app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className= "antialiased">
        <SessionProvider session={session}>
        <NavBar/>
        {children}
        <ScrollToTopButton/>
{/*         <CreateEventBanner />
        <NewsletterBanner/> */}
        <Footer/>
        </SessionProvider>

    </div>
  );
}