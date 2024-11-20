"use client"

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { RxDropdownMenu } from "react-icons/rx";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoTicketOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false); // Estado para el menú en pantallas pequeñas
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAdmin = session?.user?.role === "admin";

  console.log(session);

  useEffect(() => {}, [session]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Alternar la visibilidad del menú en pantallas pequeñas
  };

  return (
    <nav className="bg-[#2D2A3E] flex justify-between items-center h-20 px-10">
      {/* Logo */}
      <div className="flex items-center justify-start space-x-0">
        {/* Ícono */}
        <div className="w-40 h-12 relative">
          <Image
            src="/assets/images/icons/icon.svg"
            alt="IconoQuickTickets"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 10vw, 5vw"
          />
        </div>
        {/* Logo */}
        <div className="w-40 h-12 relative">
          <Image
            src="/assets/images/icons/quickticketswhite.svg"
            alt="LogoQuickTickets"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 10vw, 5vw"
          />
        </div>
      </div>

      {/* Links */}
      <div className="hidden md:flex space-x-8 text-lg">
        <Link href="/" className="text-white hover:text-yellow-400">
          Home
        </Link>
        <Link href="/events" className="text-white hover:text-yellow-400">
          Events
        </Link>
        <Link href="/about" className="text-white hover:text-yellow-400">
          About
        </Link>
        <Link href="/contact" className="text-white hover:text-yellow-400">
          Contact
        </Link>
      </div>

      {/* Menú desplegable para pantallas pequeñas */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white">
          <RxDropdownMenu className="text-4xl" />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-20 right-0 bg-[#2D2A3E] w-full md:hidden">
          <Link href="/" className="block text-white hover:text-yellow-400 py-2 px-4">
            Home
          </Link>
          <Link href="/events" className="block text-white hover:text-yellow-400 py-2 px-4">
            Events
          </Link>
          <Link href="/about" className="block text-white hover:text-yellow-400 py-2 px-4">
            About
          </Link>
          <Link href="/contact" className="block text-white hover:text-yellow-400 py-2 px-4">
            Contact
          </Link>
        </div>
      )}

      {/* Login / Profile */}
      {session ? (
        <div className="flex items-center justify-center gap-6">
          <Link href="/events/create-event" className="text-white hover:text-yellow-400">
            Create Event
          </Link>
          <div className="flex gap-6 items-center justify-center relative">
            <div className="flex flex-col items-center justify-center text-sm">
              <Link href="/tickets" className="flex flex-col text-white hover:text-yellow-400 items-center">
                <IoTicketOutline className="text-white text-2xl" />
                Tickets
              </Link>
            </div>
            <div className="flex items-center justify-center text-sm gap-2">
              <div className="flex flex-col items-center justify-center">
                <Link href="/userProfile" className="flex flex-col text-white hover:text-yellow-400 items-center">
                  <CgProfile className="text-white text-2xl" />
                  Profile
                </Link>
              </div>
              <button onClick={toggleDropdown} className="flex items-center justify-center">
                <IoMdArrowDropdown className="text-white text-2xl " />
              </button>
            </div>
            {isOpen && (
              <div className="absolute bg-white rounded shadow-lg mt-[167px] text-sm min-w-[140px]">
                <Link
                  href="/userProfile"
                  onClick={() => setIsOpen(false)}
                  className="block p-2 text-black hover:bg-gray-200 rounded"
                >
                  Account setting
                </Link>
                {isAdmin && (<Link
                  href="/adminDashboard"
                  onClick={() => setIsOpen(false)}
                  className="block font-bold p-2 text-violet-500 hover:bg-gray-200 rounded"
                >Admin Dashboard
                </Link>)}
                <div className="flex justify-between hover:bg-gray-200 rounded">
                  <button
                    onClick={handleLogout}
                    className="flex items-center p-2 gap-2 w-full text-start text-red-500 font-bold"
                  >
                    Logout
                    <MdLogout />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Link href="/events/create-event" className="text-white hover:text-yellow-400">
            Create Event
          </Link>
          <Link href="/login" className="text-white hover:text-yellow-400">
            Login
          </Link>
          <Link href="/register" className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-300">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;