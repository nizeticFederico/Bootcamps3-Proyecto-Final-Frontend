"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formLogin } from "@/actions/authActions";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Link from "next/link";

export default function LogInM() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const result = await formLogin(formData);
      if (result.success) {
        setLoading(false);
        setError(null);
        toast.success("Login successful");
        setTimeout(() => {
          router.push("/scannerQr");
        }, 1500);
      } else {
        setError(result.error);
        toast.error("Error");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full md:w-2/3 p-4 gap-4">
        <Link href="/">
          <Image
            src="/assets/images/icons/icon.svg"
            width={200}
            height={50}
            alt="Aplication Logo"
            className="mb-5 mt-5"
          />
        </Link>
      </div>

      <div className="flex flex-col w-full md:w-2/3 bg-white rounded-tl-2xl rounded-tr-2xl p-6 shadow-lg">
        <h1 className="text-center text-2xl font-bold mb-4">Login</h1>

        <div className="flex justify-between gap-4 mb-6">
          <button className="flex items-center justify-center w-full border border-gray-300 rounded-md p-2">
            Google
          </button>
          <button className="flex items-center justify-center w-full border border-gray-300 rounded-md p-2">
            Facebook
          </button>
        </div>

        <div className="flex items-center mb-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-sm">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your e-mail"
            className="border rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500"
            required
          />

          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="border w-full rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <FaEye className="text-xl" />
              ) : (
                <FaEyeSlash className="text-xl" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center w-full text-white bg-[#2B293D] hover:bg-[#3F3D51] rounded-md py-2 mt-4 relative"
          >
            {loading ? <div className="loader"></div> : "Login"}
          </button>

          <p className="text-center text-sm mt-4">
            Do you not have an account?{" "}
            <Link href="/register" className="text-gray-500">
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
