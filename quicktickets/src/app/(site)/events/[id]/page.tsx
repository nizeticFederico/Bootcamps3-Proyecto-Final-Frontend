"use client"


import React from "react";
import EventPage from ".";

export default function Events({ params }: { params: { id: string } }) {
  // Usamos React.use() para desempaquetar (unwrap) la promesa de params
  const resolvedParams = React.use(params);

  // Ahora, puedes acceder de forma segura a `resolvedParams.id`
  const id = resolvedParams?.id;

  return <EventPage id={id} />;
}


/*import EventPage from ".";


export default function Events({ params }: { params: { id: string } }) {
  const { id } = params; 

  return <EventPage id={id} />;
}*/



/*export default async function Events({ params }: { params: { id: string } }) {
  const { id } = await Promise.resolve(params); // Await para `params` como se requiere
  
  return <EventPage id={id} />;



}*/