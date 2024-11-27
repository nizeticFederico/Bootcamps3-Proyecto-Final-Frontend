"use client";

import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

const CameraPage = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [qrResult, setQrResult] = useState<string | null>(null);  // Almacena el resultado del QR
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let qrScanner: QrScanner | null = null;

    const enableCamera = async () => {
      try {
        if (videoRef.current) {
          qrScanner = new QrScanner(videoRef.current, (result: any) => {
            setQrResult(result.data); // Captura el resultado del QR
            stopScanner();
          }, {
            preferredCamera: 'environment' // Usa la cámara trasera
          });
          await qrScanner.start();
        }
      } catch (error) {
        console.error('Error al acceder a la cámara: ', error);
        setError('No se pudo acceder a la cámara');
      }
    };

    const stopScanner = () => {
      qrScanner?.stop();
      setCameraEnabled(false);
    };

    if (cameraEnabled) {
      enableCamera();
    } else {
      qrScanner?.stop();
    }

    return () => {
      qrScanner?.destroy(); // Limpieza al desmontar
    };
  }, [cameraEnabled]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Escáner QR</h1>
      
      {/* Resultado del escaneo */}
      {qrResult && (
        <div className="mb-4 text-green-600 font-bold text-center">
          Código QR: {qrResult}
        </div>
      )}

      {/* Área de detección */}
      <div className="w-80 max-w-md h-96 bg-gray-300 border-4 border-dashed border-gray-500 rounded flex items-center justify-center mb-4">
        {cameraEnabled ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            className="rounded shadow-md w-full h-full object-cover"
          ></video>
        ) : (
          <p className="text-gray-500">Área de detección</p>
        )}
      </div>

      {/* Botón para activar la cámara */}
      <button
        onClick={() => {
          setQrResult(null);  // Restablece el resultado
          setCameraEnabled(!cameraEnabled);
        }}
        className="px-6 py-3 bg-blue-500 text-white font-semi-bold rounded hover:bg-blue-600"
      >
        {cameraEnabled ? 'Detener Scanner' : 'Iniciar Scanner QR'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default CameraPage;



// import { useRef, useEffect, useState } from "react";

// const CameraPage = () => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const [cameraEnabled, setCameraEnabled] = useState(false);

//   useEffect(() => {
//     const enableCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: {
//             facingMode: { exact: "environment" }, // Seleccionar la cámara trasera
//           },
//         });

//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         console.error("Error al acceder a la cámara: ", error);
//       }
//     };

//     if (cameraEnabled) {
//       enableCamera();
//     } else {
//       if (videoRef.current?.srcObject) {
//         const stream = videoRef.current.srcObject as MediaStream;
//         stream.getTracks().forEach((track) => track.stop());
//         videoRef.current.srcObject = null;
//       }
//     }
//   }, [cameraEnabled]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <h1 className="text-3xl font-bold mb-6">Escáner QR</h1>
//       {/* Área de detección */}
//       <div className="w-80 max-w-md h-96 bg-gray-300 border-4 border-dashed border-gray-500 rounded flex items-center justify-center mb-4">
//         {cameraEnabled ? (
//           <video
//             ref={videoRef}
//             autoPlay
//             className="rounded shadow-md w-full h-full object-cover"
//           ></video>
//         ) : (
//           <p className="text-gray-500">Área de detección</p>
//         )}
//       </div>
//       {/* Botón para activar la cámara */}
//       <button
//         onClick={() => setCameraEnabled(!cameraEnabled)}
//         className="px-6 py-3 bg-blue-500 text-white font-semi-bold rounded hover:bg-blue-600"
//       >
//         {cameraEnabled ? "Detener Scanner" : "Scanner QR"}
//       </button>
//     </div>
//   );
// };

// export default CameraPage;
