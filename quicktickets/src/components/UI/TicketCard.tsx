"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Event } from "./EventAdminCard";

interface Ticket {
  eventId: string;
  buyerId: string;
  purchaseDateTime: Date;
  qrCode: string;
  _id: string;
}

interface TicketWithEvent extends Ticket {
  event: Event | null;
}

export default function TicketCard() {
  const [ticketsWithEvents, setTicketsWithEvents] = useState<TicketWithEvent[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();

  const getEventById = async (eventId: string): Promise<Event | null> => {
    try {
      const response = await fetch(
        `https://kit-rich-starling.ngrok-free.app/event/${eventId}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "1",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`No se pudo obtener el evento con eventId: ${eventId}`);
      }
      const event: Event = await response.json();
      return event;
    } catch (error) {
      console.error(
        `Error al obtener el evento para el eventId ${eventId}:`,
        error
      );
      return null;
    }
  };

  const fetchTickets = async () => {
    if (!session?.accessToken) {
      setError("No se pudo obtener la sesión.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://kit-rich-starling.ngrok-free.app/ticket/my-tickets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: `${session.accessToken}`,
          'ngrok-skip-browser-warning': '1',
        },
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("No se pudieron obtener los tickets");
      }

      const tickets: Ticket[] = await response.json();

      const ticketsWithEventDetails = await Promise.all(
        tickets.map(async (ticket) => {
          const event = await getEventById(ticket.eventId);
          return { ...ticket, event };
        })
      );

      setTicketsWithEvents(ticketsWithEventDetails);
    } catch (error) {
      setError("Hubo un problema al obtener los tickets.");
      console.error("Error al obtener los tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchTickets();
    }
  }, [session]);
  console.log(ticketsWithEvents);
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen absolute inset-0">
        <div className="border-t-4 border-black border-solid rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  const downloadPdf = async (
    ticketId: string,
    eventName: string | undefined
  ) => {
    try {
      const response = await fetch(
        `https://kit-rich-starling.ngrok-free.app/ticket/download?ticketId=${ticketId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
            'ngrok-skip-browser-warning': '1',
          },
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo obtener el archivo PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${eventName}`;
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("Error al intentar descargar el archivo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {ticketsWithEvents.length > 0 ? (
        ticketsWithEvents.map((ticket, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col w-full transform transition-all cursor-pointer duration-350 hover:scale-105 "
          >
            <div
              className="w-full h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${ticket.event?.imageUrl})` }}
            ></div>

            <div className="flex flex-col justify-between p-4 h-full">
              <h3 className="text-xl font-semibold ">{ticket.event?.name}</h3>

              <p className="text-sm text-red-500 font-bold text-lg">
                {ticket?.event?.dateTime
                  ? new Date(ticket.event.dateTime).toLocaleDateString()
                  : "Fecha no disponible"}
              </p>

              <p className="text-gray-600">
                Fecha de compra:{" "}
                {new Date(ticket.purchaseDateTime).toLocaleString()}
              </p>

              <div className="flex justify-center items-center my-4">
                <img src={ticket.qrCode} alt="QR Code" className="w-24 h-24" />
              </div>

              <div className="flex items-center justify-center">
                <button
                  onClick={() => downloadPdf(ticket._id, ticket.event?.name)}
                  className="rounded rounded-md p-3 bg-red-500 text-sm text-white"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No tienes tickets disponibles.</div>
      )}
    </div>
  );
}
