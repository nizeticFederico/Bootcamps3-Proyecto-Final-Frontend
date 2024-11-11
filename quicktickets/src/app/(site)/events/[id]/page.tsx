import EventPage from ".";

export default async function Events({ params }: { params: { id: string } }) {
  const { id } = await Promise.resolve(params); // Await para `params` como se requiere
  
  return <EventPage id={id} />;
}