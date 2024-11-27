"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Message from "@/components/UI/Message";
import Image from "next/image";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Country {
  name: {
    common: string;
  };
  cca3: string;
}

export default function SignIn() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    number: "",
    password: "",
    country: "",
    state: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const sortedCountries = data.sort((a: Country, b: Country) => {
          if (a.name.common < b.name.common) return -1;
          if (a.name.common > b.name.common) return 1;
          return 0;
        });

        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const data = {
      first_name: values.name,
      last_name: values.lastname,
      email: values.email,
      phone: values.number,
      password: values.password,
      country: values.country,
      state: values.state,
      role: "customer",
    };

    try {
      const response = await fetch(
        `https://kit-rich-starling.ngrok-free.app/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "1",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 201) {
        setLoading(false);
        toast.success("User created");
        setTimeout(() => {
          setStatus(null);
          router.push("/login");
        }, 3000);
      } else {
        setLoading(false);
        toast.error("Error");
        setTimeout(() => {
          setStatus(null);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { currentTarget } = event;
    const { name, value } = currentTarget;

    setValues({ ...values, [name]: value });
  }

  return (
    <main className="flex items-center ">
      <div className="hidden sm:flex flex-col justify-start w-2/3 h-screen gap-4 p-4">
        <div>
          <a href="/">
            <Image
              src="/assets/images/icons/icon.svg"
              alt="Aplication Logo"
              width={128}
              height={38}
              className="ml-4"
            />
          </a>
          <Image
            src="/assets/images/icons/quickticketswhite.svg"
            alt="Aplication Logo"
            width={128}
            height={38}
            className="ml-4"
          />
        </div>
        <h2 className="font-bold text-4xl text-white p-8 leading-[1.5]">
          Discover Tailored <br /> events.
          <br /> Sign up for personalized <br /> recommendations <br /> today!
        </h2>
      </div>
      <div className="flex flex-col justify-center w-full h-screen overflow-auto p-2 bg-white  sm:pl-16 sm:pr-16 sm:rounded-tl-[50px] sm:rounded-bl-[50px] ">
        <h1 className="font-bold  text-3xl mt-4">Create Account</h1>
        <form
          className="flex flex-col gap-2  pb-1 pt-1 text-sm"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={values.name}
            onChange={handleChange}
            className="border rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500"
            required
          />

          <label htmlFor="name">Lastname</label>
          <input
            type="text"
            name="lastname"
            placeholder="Enter your lastname"
            value={values.lastname}
            onChange={handleChange}
            className="border rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500"
            required
          />

          <label htmlFor="email">E-mail Adress</label>
          <input
            type="email"
            name="email"
            /* pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"  */
            placeholder="Enter your e-mail"
            value={values.email}
            onChange={handleChange}
            className="border rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500 peer"
          />
          <span className="hidden peer-invalid:flex text-xs text-red-500">
            *Invalid e-mail
          </span>

          <label htmlFor="name">Phone Number</label>
          <input
            type="number"
            name="number"
            placeholder="Enter your Phone Number"
            value={values.number}
            onChange={handleChange}
            className="border rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500"
            required
          />

          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
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
          <label htmlFor="country">Country</label>
          <select
            name="country"
            value={values.country}
            onChange={handleChange}
            className="border rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500"
            required
          >
            <option value="">Select a Country</option>
            {countries.map((country: any) => (
              <option key={country.cca3} value={country.cca3}>
                {country.name.common}
              </option>
            ))}
          </select>

          <label htmlFor="state">State</label>
          <input
            type="text"
            name="state"
            placeholder="Enter your state"
            value={values.state}
            onChange={handleChange}
            className="border rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500"
            required
          />
          <button
            type="submit"
            className=" flex items-center justify-center text-lg rounded-md p-3  min-h-[50px] text-white text-bold bg-[#2B293D] hover:bg-[#3F3D51] w-full relative sm:mt-4"
          >
            {loading ? (
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <div className="loader"></div>
              </div>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="text-sm sm:my-4">
            Already have an account?
            <a href="/login" className="text-gray-500">
              {" "}
              Login
            </a>
          </p>
          <Message status={status} />
        </form>
      </div>
    </main>
  );
}
