import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuickTickets",
  description: "QuickTcikets app",
  icons: {
    icon: "/assets/images/icons/ticket1.ico", // Ruta a tu favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
