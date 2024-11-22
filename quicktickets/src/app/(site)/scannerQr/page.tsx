'use client';

import { useRef, useEffect, useState } from 'react';

const CameraPage = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);

  useEffect(() => {
    if (cameraEnabled) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error('Error al acceder a la cámara: ', error);
        });
    } else {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [cameraEnabled]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Escáner QR</h1>
      {/* Área de detección */}
      <div className="w-full max-w-md h-64 bg-gray-300 border-4 border-dashed border-gray-500 rounded flex items-center justify-center mb-4">
        {cameraEnabled ? (
          <video ref={videoRef} autoPlay className="rounded shadow-md w-full h-full object-cover"></video>
        ) : (
          <p className="text-gray-500">Área de detección</p>
        )}
      </div>
      {/* Botón para activar la cámara */}
      <button
        onClick={() => setCameraEnabled(!cameraEnabled)}
        className="px-6 py-3 bg-blue-500 text-white font-semi-bold rounded hover:bg-blue-600"
      >
        {cameraEnabled ? 'Detener Scanner' : 'Scanner QR'}
      </button>
    </div>
  );
};

export default CameraPage;


