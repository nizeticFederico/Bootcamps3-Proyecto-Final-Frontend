"use client"

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";



const NavBar = () => {

  const {data:session} = useSession();
  
  return (
    <nav className="bg-[#2D2A3E] p-4 flex justify-between items-center">
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
        <Link href="/events/create-event" className="text-white hover:text-yellow-400">
          Create Event
        </Link>
      </div>

      {/* Login y Sign Up */}

      {session ? (
          <div className="hidden md:flex space-x-8 text-xl">
              <Link href="/" className="text-white hover:text-yellow-400">
                Create Event
              </Link><Link href="/" className="text-white hover:text-yellow-400">
                Tickets
              </Link><Link href="/" className="text-white hover:text-yellow-400">
                Interested
              </Link><Link href="/userProfile" className="text-white hover:text-yellow-400">
                Profile
              </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
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
