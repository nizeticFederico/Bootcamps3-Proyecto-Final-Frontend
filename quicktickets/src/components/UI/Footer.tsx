import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#2D2A3E] text-white py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-4 md:px-8">
        {/* Company Info */}
        <div>
          <h3 className="font-bold text-lg mb-4">Company Info</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-yellow-400">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-bold text-lg mb-4">Help</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-yellow-400">
                Account Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Listing Events
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Event Ticketing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Ticket Purchase Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-bold text-lg mb-4">Categories</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-yellow-400">
                Concerts & Gigs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Festivals & Lifestyle
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Business & Networking
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Food & Drinks
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Performing Arts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Sports & Outdoors
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Exhibitions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Workshops, Conferences & Classes
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="font-bold text-lg mb-4">Follow Us</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-yellow-400">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Youtube
              </a>
            </li>
          </ul>
        </div>

        {/* Download The App */}
        <div>
          <h3 className="font-bold text-lg mb-4">Download The App</h3>
          <div className="space-y-4">
            <a href="#" className="block">
              <Image
                src="/assets/images/googlePlay.svg"
                width={40}
                height={20}
                alt="Get it on Google Play"
                className="w-40"
              />
            </a>
            <a href="#" className="block">
              <Image
                src="/assets/images/appStore.svg"
                width={40}
                height={20}
                alt="Download on the App Store"
                className="w-40"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-gray-600 pt-4 text-center text-sm">
        ©2024 QuickTickets. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
