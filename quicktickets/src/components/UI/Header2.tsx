"use client"

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoTicketOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { TbCirclePlus } from "react-icons/tb";
import { CgMenuRound } from "react-icons/cg";

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
    <nav className="bg-[#2D2A3E] flex justify-between items-center h-20 pr-8 ">
      {/* Logo */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="w-40 h-10 relative">
          <Image
            src="/assets/images/icons/icon.svg"
            alt="IconoQuickTickets"
            fill
            className="object-contain"
          />
        </div>
        <div className="hidden md:block w-40 h-10 relative">
          <Image
            src="/assets/images/icons/quickticketswhite.svg"
            alt="LogoQuickTickets"
            fill
            className="object-contain"
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

      {/* Menú para pantallas pequeñas */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-white hover:text-yellow-400 flex items-center"
        >
          <div className="flex flex-col items-center">
            <CgMenuRound className="text-2xl" />
            <span className="text-sm hidden sm:block">Menu</span>
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-20 right-0 bg-[#2D2A3E] w-full md:hidden z-50">
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

      {/* Perfil / Login */}
      {session ? (
        <div className="flex items-center gap-6 relative">
          <Link
            href="/events/create-event"
            className="flex flex-col items-center text-white hover:text-yellow-400"
          >
            <TbCirclePlus className="text-2xl" />
            <span className="text-sm hidden sm:block">Create</span>
          </Link>
          <Link
            href="/tickets"
            className="flex flex-col items-center text-white hover:text-yellow-400"
          >
            <IoTicketOutline className="text-2xl" />
            <span className="text-sm hidden sm:block">Tickets</span>
          </Link>
          <div className="relative flex items-center">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-1 text-white hover:text-yellow-400"
            >
              <div className="flex flex-col items-center">
                <CgProfile className="text-2xl" />
                <span className="text-sm hidden sm:block">Profile</span>
              </div>
              <IoMdArrowDropdown className="text-2xl" />
            </button>
            {isOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white text-black rounded shadow-md w-40 z-50">
                <Link
                  href="/userProfile"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Account Settings
                </Link>
                <Link
                  href="/my-events"
                  className="block px-4 py-2 hover:bg-gray-200 font-semibold text-orange-500"
                >
                  My Events
                </Link>
                {isAdmin && (
                  <Link
                    href="/adminDashboard"
                    className="block px-4 py-2 hover:bg-gray-200 font-semibold text-violet-500"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-500 font-semibold hover:bg-gray-200 w-full"
                >
                  <MdLogout className="text-lg" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-white hover:text-yellow-400">
            Login
          </Link>
          <Link
            href="/register"
            className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-300"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;