"use client";

import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("");
    setError("");

    if (!email.trim()) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://kit-rich-starling.ngrok-free.app/user/send-forgot-password-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      )

      const data = await response.json();

      if (response.ok) {
        setStatus("Check your email for the reset link.");
        setEmail("");
      } else {   
        if (data.message === "Email not found") {
          setError("The email address is not registered.");
        } else {
          setError(data.message || "Error sending reset email.");
        }
      }
    } catch (err) 
    {
      setError("An error occurred while sending the reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center h-screen">
      
      <div className="flex flex-col justify-center w-2/3 h-screen gap-4 p-4 bg-[#2B293D]">
        <h2 className="font-bold text-4xl text-white p-8 leading-[1.5]">
          Enter your email <br />
          to reset your password <br /> and recover your account
        </h2>
      </div>

      
      <div className="flex flex-col justify-center w-full h-screen bg-white pl-16 pr-16 gap-5">
        <h1 className="font-bold text-3xl pl-32">Reset Your Password</h1>
        <div className="p-32 pb-4 pt-4">
          <form className="flex flex-col gap-2 mt-5" onSubmit={handleSubmit}>
            <label htmlFor="email" className="text-sm font-medium">
              Enter your email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="border w-full rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500"
              required
            />

            <button
              type="submit"
              className="flex items-center justify-center text-lg rounded-md p-3 mt-4 min-h-[50px] text-white font-bold bg-[#2B293D] hover:bg-[#3F3D51] w-full relative"
              disabled={loading}
            >
              {loading ? (
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <div className="loader"></div>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>

            {status && <div className="mt-4 text-green-500">{status}</div>}
            {error && <div className="mt-4 text-red-500">{error}</div>}
          </form>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
