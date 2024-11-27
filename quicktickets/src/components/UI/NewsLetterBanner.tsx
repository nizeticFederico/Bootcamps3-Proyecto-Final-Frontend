import { useState } from "react";
import { useSession } from "next-auth/react";

const NewsletterBanner = () => {
  const [isSubscribed, setIsSubscribed] = useState(false); // Estado inicial manual
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession(); // Aquí obtenemos la sesión

  const handleSubscription = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://kit-rich-starling.ngrok-free.app/user/subscription", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: `${session?.accessToken}`, // Usamos el token si está disponible
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update subscription");
      }

      setIsSubscribed((prev) => !prev); // Alternar el estado de suscripción
    } catch (error) {
      console.error("Error updating subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-yellow-300 py-16 px-4 flex flex-col items-center text-center md:flex-row md:justify-center md:items-center gap-20">
      <div className="md:text-left">
        <h2 className="text-3xl font-bold mb-3">
          {isSubscribed ? "You're Subscribed!" : "Subscribe to our Newsletter"}
        </h2>
        <p className="text-gray-700 mt-2 font-regular leading-relaxed">
          Receive our weekly newsletter & updates with new events from your
          favorite organizers & venues.
        </p>
      </div>

      <button
        onClick={handleSubscription}
        className={`${
          isSubscribed ? "bg-red-600" : "bg-indigo-900"
        } text-white px-6 py-3 rounded-md font-semibold`}
        disabled={loading}
      >
        {loading ? "Processing..." : isSubscribed ? "Unsubscribe" : "Subscribe"}
      </button>
    </div>
  );
};

export default NewsletterBanner;

