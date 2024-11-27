"use client";
import React, { useState, useEffect } from "react";
import { FaTicketAlt, FaArrowLeft } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const TicketStatusSimple = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams(); // Hook para acceder a los parámetros de la URL
  const ticketId = searchParams.get("ticketId"); // Obtenemos el parámetro ticketId desde la query

  const [status, setStatus] = useState<string>("Loading...");
  const [eventTitle, setEventTitle] = useState<string>("Loading...");
  const [error, setError] = useState<string | null>(null);

  // if (!ticketId) return; // Evita hacer la petición si no hay ticketId
  useEffect(() => {
    if (ticketId != null) {
      fetchTicketStatus();
    }
  }, [ticketId]);

  const fetchTicketStatus = async () => {
    try {
      const response = await fetch(
        "https://kit-rich-starling.ngrok-free.app/ticket/status",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token: `${session?.accessToken || ""}`,
          },
          body: JSON.stringify({ ticketId }), // Usamos el ticketId desde la query
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      // Actualiza el estado con la información del ticket
      if (data.message === "Authorized") {
        setStatus("Available");
      } else {
        setStatus("Used");
      }

      setEventTitle(data.eventName || "Unknown Event");
    } catch (error) {
      console.error("Error fetching ticket status:", error);
      setStatus("Error");
      setError("Unable to fetch ticket status");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-3xl font-bold mb-6 flex items-center justify-center">
          <FaTicketAlt className="mr-2 text-gray-600" /> Ticket
        </h1>
        <div className="text-xl text-start font-semibold mb-4">
          <span className="text-gray-700">Title:</span> {eventTitle}
        </div>
        <div className="text-xl text-start font-semibold mb-4">
          <span className="text-gray-700">TicketId:</span> {ticketId}
        </div>
        <div className="text-xl text-start font-semibold mb-4">
          <span className="text-gray-700">Status:</span>{" "}
          <span
            className={`${
              status === "Available"
                ? "text-green-500"
                : status === "Used"
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            {status}
          </span>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      <div className="mt-6 w-full flex justify-center">
        <Link href="/scannerQr">
          <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 flex items-center justify-center gap-2">
            <FaArrowLeft className="text-white" /> Go back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TicketStatusSimple;
