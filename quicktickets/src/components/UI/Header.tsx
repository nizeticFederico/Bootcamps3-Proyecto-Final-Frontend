import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="bg-[#2D2A3E] p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/assets/images/Logo.svg"
          width={128}
          height={38}
          alt="QuickTickets"
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
        <Link href="/create-event" className="text-white hover:text-yellow-400">
          Create Event
        </Link>
      </div>

      {/* Login y Sign Up */}
      <div className="flex items-center space-x-4">
        <Link href="/login" className="text-white hover:text-yellow-400">
          Login
        </Link>
        <Link
          href="/signup"
          className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-300"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
