"use client";

import { useSearchParams } from "next/navigation"; // Usamos esta función para obtener los parámetros de la URL
import { useEffect, useState } from "react";

export default function CallbackPage() {
  const searchParams = useSearchParams();
  const [authCode, setAuthCode] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code"); // Obtenemos el parámetro "code" de la URL
    if (code) {
      setAuthCode(code); // Captura el código de autorización
    }
  }, [searchParams]);

  useEffect(() => {
    if (authCode) {
      console.log("Authorization Code:", authCode); // Aquí es donde se mostrará el código
      // Aquí podrías hacer una llamada para obtener el access token si lo necesitas
    }
  }, [authCode]);

  return (
    <div>
      <h1>Autenticación Completa</h1>
      {authCode ? (
        <p>El código de autorización es: {authCode}</p>
      ) : (
        <p>Esperando el código de autorización...</p>
      )}
    </div>
  );
}