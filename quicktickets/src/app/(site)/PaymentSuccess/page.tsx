"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

const Page: React.FC = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const quantity = searchParams.get("quantity");
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isFetchDone, setIsFetchDone] = useState(false);

  useEffect(() => {
    if (status === "loading") {
      // Si la sesión está cargando, no hacer nada por ahora
      return;
    }
    if (eventId && quantity && session?.accessToken && !isFetchDone) {
      sendPostRequest(eventId, parseInt(quantity));
      setIsFetchDone(true);
    }
  }, [eventId, quantity, session, status]);

  const sendPostRequest = async (eventId: string, quantity: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://kit-rich-starling.ngrok-free.app/order/success",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: `${session?.accessToken || ""}`,
          },
          body: JSON.stringify({ eventId, quantity }),
        }
      );

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  console.log(session);

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

        <Link href="/tickets" className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded shadow-md hover:shadow-lg transition duration-300 ease-in-out">
        Go to your dashboard
        </Link>
       
          
        
      </div>
    </div>
  );
};

export default Page;
