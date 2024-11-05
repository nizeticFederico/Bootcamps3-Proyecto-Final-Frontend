import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic'; // Importa dynamic para cargar componentes solo en el lado del cliente
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

interface EventDataProps {
  name: string;
  description: string;
  imageUrl: string;
  dateTime: string;
  price: number;
  capacity: number;
  category: string;
  location: string;
  latitude: number;
  longitude: number;
  creatorId: string;
}

const EventData: React.FC<EventDataProps> = ({
  name,
  imageUrl,
  description,
  dateTime,
  price,
  capacity,
  category,
  location,
  latitude,
  longitude,
/*   creatorId, */
}) => {
  const eventDate = new Date(dateTime);
  const formattedDate = eventDate.toLocaleDateString('en-AR', { day: '2-digit', month: 'short', year: 'numeric' });
  const formattedTime = eventDate.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

  return (
    <main>
        <div className="w-1/2 h-full overflow-hidden rounded relative">
            <Image
                src={imageUrl}
                fill
                className="object-cover"
                alt="Miniatura Evento"
            />
        </div>
        <div>
            <h2>{name}</h2>
            <p>{category}</p>
        </div>
        <div>
            <h4>Date and Time</h4>
            <div>
                <p>{formattedDate}</p>
                <p>{formattedTime}</p>
            </div>
        </div>
        <div>
            <div>
                <h3>Ticket Information</h3>
            </div>
            <div>
                <p>{price}</p>
                <p>{capacity}</p>
            </div>
        </div>
        <div>
            <h4>Location</h4>
            <p>{location}</p>
            {/* Mapa con Leaflet */}
            <MapContainer
                center={[latitude, longitude]}
                zoom={14}
                style={{ width: "100%", height: "300px", marginTop: "10px" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[latitude, longitude]}>
                    <Popup>
                        {name} - {location}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
        <div>
            <h3>Hosted by</h3>
            {/* <p>{creatorId}</p> */}
        </div>
        <div>
            <h3>Description</h3>
            <p>{description}</p>
        </div>
    </main>
  );
};

export default EventData;