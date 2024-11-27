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

  useEffect(() => {
    if (!ticketId) return; // Evita hacer la petición si no hay ticketId

    const fetchTicketStatus = async () => {
      try {
        const response = await fetch("https://kit-rich-starling.ngrok-free.app/ticket/status", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token: `${session?.accessToken || ""}`,
          },
          body: JSON.stringify({ ticketId }), // Usamos el ticketId desde la query
        });

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

        setEventTitle(data.event?.name || "Unknown Event");
      } catch (error) {
        console.error("Error fetching ticket status:", error);
        setStatus("Error");
        setError("Unable to fetch ticket status");
      }
    };

    fetchTicketStatus();
  });

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

// "use client";
// import React, { useState, useEffect } from "react";
// import { FaTicketAlt, FaArrowLeft } from "react-icons/fa";
// import Link from "next/link";
// import { useSession } from "next-auth/react";

// const TicketStatus = () => {
//   const { data: session } = useSession();
//   const [ticketData, setTicketData] = useState({
//     ticketId: "",
//     event: "",
//     date: "",
//     status: "",
//   });

//   useEffect(() => {
//     const fetchTicketStatus = async () => {
//       try {
//         const response = await fetch("http://localhost:3001/ticket/status", {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             token: `${session?.accessToken || ""}`,
//           },
//           body: JSON.stringify({
//             ticketId: ticketData.ticketId,
//           }),
//         });

//         if (!response.ok) {
//           throw new Error(`Error: ${response.statusText}`);
//         }

//         // Actualiza el estado con los datos recibidos
//         const data = await response.json();
//         setTicketData((prevState) => ({
//           ...prevState,
//           event: data.event || prevState.event,
//           date: data.date || prevState.date,
//           status: data.status || prevState.status,
//         }));
//       } catch (error) {
//         console.error("Error fetching ticket status:", error);
//       }
//     };

//     // Ejecutar el fetch solo si hay un ticketId y un token disponible
//     if (ticketData.ticketId && session?.accessToken) {
//       fetchTicketStatus();
//     }
//   }, [ticketData.ticketId, session?.accessToken]);

//   return (
//     <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center">
//           <FaTicketAlt className="mr-2 text-gray-600" /> Ticket ID:{" "}
//           {ticketData.ticketId || "No ticket ID"}
//         </h2>
//         <div className="border p-6 rounded-lg">
//           <div className="mb-4">
//             <span className="font-semibold">Event:</span> {ticketData.event || "N/A"}
//           </div>
//           <div className="mb-4">
//             <span className="font-semibold">Date:</span> {ticketData.date || "N/A"}
//           </div>
//           <div className="mt-4">
//             <span className="font-semibold">Status:</span>{" "}
//             <span
//               className={`font-semibold ${
//                 ticketData.status === "Available"
//                   ? "text-green-500"
//                   : "text-red-500"
//               }`}
//             >
//               {ticketData.status || "N/A"}
//             </span>
//           </div>
//         </div>
//       </div>
//       <Link href="http://localhost:3000/scannerQr">
//         <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 flex items-center justify-center gap-2">
//           <FaArrowLeft className="text-white" /> Go back
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default TicketStatus;
