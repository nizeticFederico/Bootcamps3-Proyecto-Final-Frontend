"use client"

import { useEffect, useState } from "react";
import EventPage from ".";

export default function Events({ params }: { params: { id: string } }) {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      try {
        const resolvedParams = await params; // Esperamos que `params` se resuelva
        setId(resolvedParams.id); // Ahora que `params` se resolvió, podemos usar `id`
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    };

    fetchParams();
  }, [params]); // Dependencia de `params`

  if (!id) {
    return <div>Loading...</div>; // Muestra un mensaje de carga si `id` aún no está disponible
  }

  return <EventPage id={id} />;
}

//import EventPage from ".";


/*export default function Events({ params }: { params: { id: string } }) {
  const { id } = params; 

  return <EventPage id={id} />;
}*/



/*export default async function Events({ params }: { params: { id: string } }) {
  const { id } = await Promise.resolve(params); // Await para `params` como se requiere
  
  return <EventPage id={id} />;



}*/