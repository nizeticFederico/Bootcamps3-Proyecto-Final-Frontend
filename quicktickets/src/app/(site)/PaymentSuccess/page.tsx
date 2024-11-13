"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Page = () => {
  // const searchParams = useSearchParams();
  // const [eventId, setEventId] = useState<string | null>(null);
  // const [quantity, setQuantity] = useState<number | null>(null);
  // const { data: session } = useSession();

  // useEffect(() => {
  //   // Extraer eventId y quantity de los parámetros de búsqueda
  //   const eventIdParam = searchParams.get("eventId");
  //   const quantityParam = searchParams.get("quantity");

  //   setEventId(eventIdParam || null);
  //   setQuantity(quantityParam ? parseInt(quantityParam, 10) : null);
  // }, [searchParams]);

  // useEffect(() => {
  //   // Realizar el POST cuando ambos valores están disponibles
  //   if (eventId && quantity !== null) {
  //     const postOrderSuccess = async () => {
  //       try {
  //         const response = await fetch("http://localhost:3001/order/success", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             token: `${session?.accessToken || ""}`, // Si necesitas token del usuario
  //           },
  //           body: JSON.stringify({ eventId, quantity }),
  //         });

  //         if (!response.ok) {
  //           throw new Error("Error en la solicitud");
  //         }

  //         const data = await response.json();
  //         console.log("Respuesta del servidor:", data);
  //       } catch (error) {
  //         console.error("Error en el fetch:", error);
  //       }
  //     };

  //     postOrderSuccess();
  //   }
  // }, [eventId, quantity, session]);

  return <div>Hola</div>;
};

export default Page;

// 'use client';

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";

// const Page = () => {
//   const searchParams = useSearchParams();
//   const [eventId, setEventId] = useState<string | null>(null);
//   const [quantity, setQuantity] = useState<number | null>(null);
//   const { data: session } = useSession();

//   useEffect(() => {
//     // Función asíncrona interna para manejar la solicitud
//     const fetchOrderData = async () => {
//       const orderData = {
//         eventId: searchParams.get("eventId"),
//         quantity: searchParams.get("quantity")
//       };

//       try {
//         const response = await fetch("http://localhost:3001/order/success", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             token: `${session?.accessToken || ""}`,
//           },
//           body: JSON.stringify(orderData)
//         });

//         if (response.ok) {
//           const data = await response.json();
//           // Aquí puedes manejar la respuesta y actualizar el estado si es necesario
//           console.log(data); // O cualquier otra lógica para manejar la respuesta
//         } else {
//           console.error("Error en la solicitud:", response.status);
//         }
//       } catch (error) {
//         console.error("Error de red:", error);
//       }

//       // Actualizar el estado local con los parámetros de la URL
//       setEventId(orderData.eventId || null);
//       setQuantity(orderData.quantity ? parseInt(orderData.quantity, 10) : null);
//     };

//     fetchOrderData(); // Llamada a la función asincrónica

//   }, [searchParams, session]); // Dependencias: cuando cambian los parámetros de búsqueda o la sesión

//   console.log(eventId, quantity);

//   return <div>Hola</div>;
// };

// export default Page;

// TARJETA 4000000320000021

// const { data: session } = useSession();
//   const buyStripe = async () => {
//     const payData = { eventId: _id, quantity: 1 };
//     const response = await fetch("http://localhost:3001/pay", {
//       method: "POST", // Especifica que se trata de una solicitud POST
//       headers: {
//         "Content-Type": "application/json",
//         token: `${session?.accessToken || ""}`,
//       }, // Define el tipo de contenido como JSON
//       body: JSON.stringify(payData),
//     });
//     const data = await response.json();
//     window.open(data);
//   };
