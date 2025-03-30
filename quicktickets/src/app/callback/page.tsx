import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function CallbackComponent() {
  const searchParams = useSearchParams();
  const [authCode, setAuthCode] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      setAuthCode(code);
    }
  }, [searchParams]);

  useEffect(() => {
    if (authCode) {
      console.log("Authorization Code:", authCode); 
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

export default function CallbackPage() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <CallbackComponent />
    </Suspense>
  );
}