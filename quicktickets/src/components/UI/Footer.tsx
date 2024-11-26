"use client";

import Link from "next/link";
import Image from "next/image";
import Categories from "./Categories";

const Footer = () => {
  return (
    <footer className="bg-[#2D2A3E] text-white py-10">
      <div className="hidden md:grid max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4 md:px-8">
        {/* Company Info */}
        <div>
          <h3 className="font-bold text-lg mb-4">Company Info</h3>
          <ul className="space-y-2">
            
            <li>
              <Link href="/about" className="hover:text-yellow-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-yellow-400">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-yellow-400">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-yellow-400">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-yellow-400">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-yellow-400">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-bold text-lg mb-4">Help</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-yellow-400">
                Account Support
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-yellow-400">
                Listing Events
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-yellow-400">
                Event Ticketing
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-yellow-400">
                Ticket Purchase Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-bold text-lg mb-4">Categories</h3>
          <ul className="space-y-2">
            <Categories
              renderCategory={(category) => (
                <li key={category.name}>
                  <Link href="#" className="hover:text-yellow-400">
                    {category.name}
                  </Link>
                </li>
              )}
            />
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="font-bold text-lg mb-4">Follow Us</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-yellow-400">
                Facebook
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-yellow-400">
                Instagram
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-yellow-400">
                Twitter
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-yellow-400">
                Youtube
              </Link>
            </li>
          </ul>
        </div>

        {/* Download The App */}
        <div>
          <h3 className="font-bold text-lg mb-4">Download The App</h3>
          <div className="space-y-4">
            <Link href="#" className="block">
              <Image
                src="/assets/images/icons/googlePlay.svg"
                width={40}
                height={20}
                alt="Get it on Google Play"
                className="w-40"
              />
            </Link>
            <Link href="#" className="block">
              <Image
                src="/assets/images/icons/appStore.svg"
                width={40}
                height={20}
                alt="Download on the App Store"
                className="w-40"
              />
            </Link>
          </div>
        </div>
      </div>


      <div className="mt-8 md:border-t md:border-gray-600 md:pt-4 text-center text-sm flex flex-col justify-center items-center h-16">
        <span className="hidden md:block md:mt-4">
          ©2024 QuickTickets. All rights reserved.
        </span>
        <span className="block md:hidden">
          ©2024 QuickTickets. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;