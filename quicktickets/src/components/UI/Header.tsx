"use client"

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { RxDropdownMenu } from "react-icons/rx";
import { IoMdArrowDropdown } from "react-icons/io";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false); // Estado para el menú en pantallas pequeñas
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(session);

  useEffect(() => {}, [session]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Alternar la visibilidad del menú en pantallas pequeñas
  };

  return (
    <nav className="bg-[#2D2A3E] flex justify-between items-center h-20 gap-2 pl-20 pr-20 max-h-16">
      {/* Logo */}
      <div className="flex items-center text-white">
        <Image
          src="/assets/images/icons/icon.svg"
          width={128}
          height={38}
          alt="IconoQuickTickets"
        />
        <Image
          src="/assets/images/icons/quickticketswhite.svg"
          width={128}
          height={38}
          alt="LogoQuickTickets"
        />
      </div>

      {/* Links */}
      <div className="hidden md:flex space-x-8 text-xl">
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

      {/* Botón de menú desplegable (hamburguesa) para pantallas pequeñas */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white">
          <RxDropdownMenu className="text-white" />
        </button>
      </div>

      {/* Menú desplegable en pantallas pequeñas */}
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

      {/* Login y Sign Up */}
      {session ? (
        <div className="flex items-center justify-center gap-6">
          <Link href="/events/create-event" className="text-white hover:text-yellow-400">
            Create Event
          </Link>
          <div className="flex gap-6 items-center justify-center relative">
            <div className="flex flex-col items-center justify-center text-sm">
              <Link href="/" className="flex flex-col text-white hover:text-yellow-400 items-center">
                <Image src="/assets/images/icons/ticket-white.svg" alt="Ticket" height={25} width={25} />
                Tickets
              </Link>
            </div>
            <div className="flex items-center justify-center text-sm gap-2">
              <div className="flex flex-col items-center justify-center">
                <Link href="/userProfile" className="flex flex-col text-white hover:text-yellow-400 items-center">
                  <Image src="/assets/images/icons/profileImage.svg" alt="Profile" height={25} width={25} />
                  Profile
                </Link>
              </div>
              <button onClick={toggleDropdown} className="flex items-center justify-center">
                <IoMdArrowDropdown className="text-white " />
              </button>
            </div>
            {isOpen && (
              <div className="absolute bg-white rounded shadow-lg mt-[133px] text-sm min-w-[140px]">
                <Link
                  href="/userProfile"
                  onClick={() => setIsOpen(false)}
                  className="block p-2 text-black hover:bg-gray-200 rounded"
                >
                  Account setting
                </Link>
                <div className="flex justify-between hover:bg-gray-200 rounded">
                  <button
                    onClick={handleLogout}
                    className="flex items-center p-2 gap-2 w-full text-start text-red-500 font-bold"
                  >
                    Logout
                    <Image
                      src="/assets/images/icons/logout-logo.svg"
                      alt="Logout logo"
                      height={15}
                      width={15}
                    />
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