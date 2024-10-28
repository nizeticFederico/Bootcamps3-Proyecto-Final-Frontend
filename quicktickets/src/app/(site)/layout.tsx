import type { Metadata } from "next";
import Footer from "@/components/UI/Footer";
import NavBar from "@/components/UI/Header";
import ScrollToTopButton from "@/components/UI/ScrollToTopButton";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

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
    <html lang="en">
      <body
        className= "antialiased"
      >
        <SessionProvider session={session}>
        <NavBar/>
        {children}
        <ScrollToTopButton/>
        <Footer/>
        </SessionProvider>
      </body>
    </html>
  );
}