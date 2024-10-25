import type { Metadata } from "next";
import Footer from "@/components/UI/Footer";
import NavBar from "@/components/UI/Header";



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
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}