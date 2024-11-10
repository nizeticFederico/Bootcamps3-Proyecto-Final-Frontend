// src/app/(site)/events/[id]/page.tsx
import EventPage from ".";

export default async function Events({ params }: { params: { id: string } }) {
    const id = await Promise.resolve(params.id); // Aseguramos que `params.id` esté await
  
    return <EventPage id={id} />;
  }