"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formLogin } from "@/actions/authActions";  
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Link from "next/link";

export default function LogIn() {
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
          router.push("/");
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
    <main className="flex items-center h-screen">
      <div className="hidden sm:flex flex-col justify-start w-2/3 h-screen gap-4 p-4">
        <div>
          <Link href="/">
            <Image
              src="/assets/images/icons/icon.svg"
              width={128}
              height={38}
              alt="Aplication Logo"
              className="ml-4"
            />
          </Link>
          <Image
            src="/assets/images/icons/quickticketswhite.svg"
            width={128}
            height={38}
            alt="Aplication Logo"
            className="ml-4"
          />
        </div>
        <h2 className="font-bold text-4xl text-white p-8 leading-[1.5]">
          Discover Tailored <br /> events.<br /> Sign up for personalized <br /> recommendations <br /> today!
        </h2>
      </div>

      <div className="flex flex-col justify-center w-full h-screen bg-white rounded-tl-[50px] rounded-bl-[50px] sm:pl-32 sm:pr-32 gap-5">
        
        <div className="sm:hidden flex justify-center mb-8">
        <Link href="/">
            <Image
              src="/assets/images/icons/icon.svg"
              width={200}
              height={200}
              alt="Aplication Logo"
              className="ml-4"
            />
          </Link>
        </div>

        <h1 className="font-bold text-3xl pl-8 ">Login</h1>
        <div className="p-8 pb-4 pt-4">
          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form className="flex flex-col gap-2 mt-5" onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your e-mail"
              className="border rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500 peer"
            />
            <span className="hidden peer-invalid:flex text-xs text-red-500">*Invalid e-mail</span>

            <label htmlFor="password">Password</label>
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
                  <FaEye className="text-2xl" />
                ) : (
                  <FaEyeSlash className="text-2xl" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center text-lg rounded-md p-3 mt-4 min-h-[50px] text-white text-bold bg-[#2B293D] hover:bg-[#3F3D51] w-full relative"
            >
              {loading ? (
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <div className="loader"></div>
                </div>
              ) : (
                "Login"
              )}
            </button>

            <Link href="/auth" className="text-sm text-gray-500">
              Forgot your password?
            </Link>

            <p className="text-sm my-4">
              Do you not have an account?{" "}
              <Link href="/register" className="text-gray-500">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
