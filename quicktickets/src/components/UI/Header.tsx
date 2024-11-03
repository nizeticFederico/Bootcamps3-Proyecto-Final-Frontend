"use client"

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";
import { logOut } from "@/actions/authActions";



const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(()=>{
  },[session])
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut =  () => {
    logOut();
    router.push("/")
}


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
        <Link href="/events/create-event" className="text-white hover:text-yellow-400">
          Create Event
        </Link>
      </div>

      {/* Login y Sign Up */}

      {session ? (
        <div className="flex items-center justify-center gap-6">
          <Link href="/" className="text-white hover:text-yellow-400">
            Create Event
          </Link>
          <div className="flex gap-6 items-center justify-center relative">

          <div className="flex flex-col items-center justify-center text-sm">
            <Link href="/"  className="flex flex-col text-white hover:text-yellow-400 items-center">
              <Image src="/assets/images/icons/ticket-white.svg" alt="Ticket" height={25} width={25} />
              Tickets
            </Link>
          </div>
          <div className="flex items-center justify-center text-sm gap-2">
            <div className="flex flex-col items-center justify-center">
              <Link href="/userProfile"  className="flex flex-col text-white hover:text-yellow-400 items-center">
                <Image src="/assets/images/icons/profileImage.svg" alt="Profile" height={25} width={25} />
                Profile
              </Link>
            </div>
            <button onClick={toggleDropdown} className="flex items-center justify-center">
              <Image src="/assets/images/icons/Vector.svg" alt="button" height={10} width={10} />
            </button>
          </div>
          {isOpen && (
            <div className="absolute bg-white rounded shadow-lg mt-[133px] text-sm min-w-[140px]">
              {/* Contenido del div desplegable */}
              <Link href="/userProfile"  onClick={() => setIsOpen(false)} className="block p-2 text-black hover:bg-gray-200 rounded">
                Account setting
              </Link>
              <button onClick = {handleLogOut} className="p-2 text-black hover:bg-gray-200 w-full text-start rounded">
                  Log out
              </button> 
              {/* Agrega más opciones según sea necesario */}
            </div>
          )}
          </div>
          </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Link href="/create-event" className="text-white hover:text-yellow-400">
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
