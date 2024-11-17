"use client";

import React, { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

// Tipado de las props
type GoogleMapComponentProps = {
  center: { lat: number; lng: number }; // Coordenadas iniciales del centro del mapa
  zoom?: number; // Nivel de zoom (opcional)
  markerPosition?: { lat: number; lng: number }; // Posición inicial del marcador
  onMapClick?: (lat: number, lng: number) => void; // Callback al hacer clic en el mapa
  onMarkerDragEnd?: (coords: { lat: number; lng: number }) => void; // Callback al mover el marcador
  isPointerMovable?: boolean; // Controla si el marcador puede moverse
};

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  center,
  zoom = 14, // Zoom por defecto
  markerPosition,
  onMapClick,
  onMarkerDragEnd,
  isPointerMovable = false, // Por defecto, el marcador no es movible
}) => {
  const [currentCenter, setCurrentCenter] = useState(center);
  const [currentMarker, setCurrentMarker] = useState(markerPosition);

  // Actualizar `center` dinámicamente si cambia
  useEffect(() => {
    setCurrentCenter(center);
  }, [center]);

  // Actualizar `markerPosition` dinámicamente si cambia
  useEffect(() => {
    if (markerPosition) setCurrentMarker(markerPosition);
  }, [markerPosition]);

  // Callback para el clic en el mapa
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (isPointerMovable && onMapClick && e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      onMapClick(lat, lng);
      setCurrentMarker({ lat, lng });
    }
  };

  // Callback para mover el marcador
  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (isPointerMovable && onMarkerDragEnd && e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      onMarkerDragEnd({ lat, lng });
      setCurrentMarker({ lat, lng });
    }
  };

  const containerStyle = {
    width: "100%",
    height: "400px", // Ajusta según tus necesidades
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentCenter}
      zoom={zoom}
      onClick={handleMapClick}
    >
      {currentMarker && (
        <Marker
          position={currentMarker}
          draggable={isPointerMovable}
          onDragEnd={handleMarkerDragEnd}
        />
      )}
    </GoogleMap>
  );
};

export default GoogleMapComponent;