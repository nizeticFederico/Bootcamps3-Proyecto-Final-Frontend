"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const url = new URL(window.location.href); // Obtiene la URL actual
    const params = new URLSearchParams(url.search); // Obtiene los parámetros de la query
    const token = params.get("token"); // Extrae el valor del token

    console.log(token);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setStatus("");
    setError("");

    try {
      const response = await fetch("http://localhost:3001/user/new-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword,
          newPasswordRepeated: confirmPassword,
          token: token,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update password");
      }

      const data = await response.json();
      setStatus("Password updated successfully!");
    } catch (error: any) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center h-screen">
      <div className="flex flex-col justify-center w-2/3 h-screen gap-4 p-4 bg-[#2B293D]">
        <h2 className="font-bold text-4xl text-white p-8 leading-[1.5]">
          Reset your password and <br />
          secure your account today!
        </h2>
      </div>

      <div className="flex flex-col justify-center w-full h-screen bg-white pl-16 pr-16 gap-5">
        <h1 className="font-bold text-3xl pl-32">Reset Your Password</h1>
        <div className="p-32 pb-4 pt-4">
          <form className="flex flex-col gap-2 mt-5" onSubmit={handleSubmit}>
            <label htmlFor="newPassword" className="text-sm font-medium">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter your new password"
                className="border w-full rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showNewPassword ? (
                  <FaEye className="text-xl" />
                ) : (
                  <FaEyeSlash className="text-xl" />
                )}
              </button>
            </div>

            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium mt-4"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your new password"
                className="border w-full rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? (
                  <FaEye className="text-xl" />
                ) : (
                  <FaEyeSlash className="text-xl" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center text-lg rounded-md p-3 mt-4 min-h-[50px] text-white text-bold bg-[#2B293D] hover:bg-[#3F3D51] w-full"
              disabled={loading}
            >
              {loading ? "Updating..." : "Submit"}
            </button>

            {status && <div className="mt-4 text-green-500">{status}</div>}
            {error && <div className="mt-4 text-red-500">{error}</div>}
          </form>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
