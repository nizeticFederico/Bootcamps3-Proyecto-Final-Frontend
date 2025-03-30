"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CallbackPage() {
  const router = useRouter();
  const [authCode, setAuthCode] = useState<string | null>(null);

  useEffect(() => {
    // Asegúrate de que el código solo se capture en el cliente
    if (router.query.code) {
      setAuthCode(router.query.code as string); // Captura el código de autorización
    }
  }, [router.query.code]);

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