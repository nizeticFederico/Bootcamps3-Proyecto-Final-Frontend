"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FaCheckCircle } from "react-icons/fa";

const Page = () => {
  const searchParams = useSearchParams();
  const [eventId, setEventId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    // Extraer eventId y quantity de los parámetros de búsqueda
    const eventIdParam = searchParams.get("eventId");
    const quantityParam = searchParams.get("quantity");

    setEventId(eventIdParam || null);
    setQuantity(quantityParam ? parseInt(quantityParam, 10) : null);
  }, [searchParams]);

  useEffect(() => {
    // Realizar el POST cuando ambos valores y el token están disponibles
    if (eventId && quantity !== null) {
      const postOrderSuccess = async () => {
        try {
          const response = await fetch("http://localhost:3001/order/success", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: `${session.accessToken}`, // Si necesitas token del usuario
            },
            body: JSON.stringify({ eventId, quantity }),
          });

          if (!response.ok) {
            throw new Error("Error en la solicitud");
          }

          const data = await response.json();
          console.log("Respuesta del servidor:", data);
        } catch (error) {
          console.error("Error en el fetch:", error);
        }
      };

      postOrderSuccess();
    }
  }, [eventId, quantity, session]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8 text-center animate-fade-in">
        <div className="animate-bounce-slow">
          <FaCheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Your payment has been received
        </h1>
        <p className="text-gray-600 mb-6 mt-3">
          Thank you for your payment! Your event ticket has been sent to your
          email. Please check your inbox for your ticket and further details
          about the event.
        </p>

        {/* <div className="flex justify-center items-center space-x-4 mb-6">
          <div className="text-gray-600">
            <strong>Event ID:</strong> {eventId}
          </div>
          <div className="text-gray-600">
            <strong>Quantity:</strong> {quantity}
          </div>
        </div> */}

        <button className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded shadow-md hover:shadow-lg transition duration-300 ease-in-out">
          Go to your dashboard
        </button>
      </div>
    </div>
  );
};

export default Page;
