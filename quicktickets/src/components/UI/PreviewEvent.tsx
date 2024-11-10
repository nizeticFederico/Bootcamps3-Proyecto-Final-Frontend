import React from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRegClock,
  FaRegStar,
  FaShareAlt,
  FaTicketAlt,
} from "react-icons/fa";
import Image from "next/image";

const EventView: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 bg-white shadow-lg rounded-lg">
      {/* Event Image */}
      <div className="h-64 bg-gray-200 rounded-md overflow-hidden">
        <Image
          src="https://e.rpp-noticias.io/xlarge/2019/03/28/583758_771183.jpg"
          alt="Event"
          className="w-full h-full object-cover"
          width={800}
          height={400}
        />
      </div>

      {/* Event Title, Share and Buy Tickets */}
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold text-gray-800">Event Title</h1>
        <div className="flex items-center space-x-4">
          <FaRegStar className="h-6 w-6 text-gray-400 cursor-pointer" />
          <FaShareAlt className="h-6 w-6 text-gray-400 cursor-pointer" />
          <button className="bg-yellow-500 text-white px-5 py-2 rounded-md font-semibold flex items-center space-x-2">
            <FaTicketAlt className="h-5 w-5" />
            <span>Buy Tickets</span>
          </button>
        </div>
      </div>

      {/* Date and Time */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-700">Date and Time</h2>
        <div className="flex items-center space-x-2 text-gray-600">
          <FaCalendarAlt className="h-5 w-5" />
          <p>Day, Date</p>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <FaRegClock className="h-5 w-5" />
          <p>Time</p>
        </div>
        <p className="text-blue-500 cursor-pointer">+ Add to Calendar</p>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-700">Location</h2>
        <div className="flex items-center space-x-2 text-gray-600">
          <FaMapMarkerAlt className="h-5 w-5" />
          <p>Address</p>
        </div>
        <div className="h-40 w-80 bg-gray-200 rounded-md flex items-center justify-center">
          <span className="text-3xl text-red-500">&#x1F4CD;</span>{" "}
          {/* Pin icon */}
        </div>
      </div>

      {/* Ticket Information */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700">
          Ticket Information
        </h2>
        <div className="flex items-center mt-3 text-gray-600">
          <FaTicketAlt className="mr-2" />
          <p>Ticket Type: Price / Free</p>
        </div>
      </div>

      {/* Hosted by */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Hosted by</h2>
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
          <div>
            <p className="font-semibold">Host Name</p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm border rounded-md">
                Contact
              </button>
              <button className="px-3 py-1 text-sm border rounded-md">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Description */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700">
          Event Description
        </h2>
        <div className="max-w-lg">
          <p className="text-gray-600 mt-5 mb-8">
            Lorem ipsum dolor sit amet consectetur. Eget vulputate sociis sit
            urna sit aliquet. Vivamus facilisis diam libero dolor volutpat diam
            eu. Quis a id posuere etiam at enim vivamus. Urna nisi malesuada
            libero enim ornare in viverra. Nibh commodo quis tellus aliquet nibh
            tristique lobortis id. Consequat ultricies vulputate turpis neque
            viverra tempor nunc. Et amet massa tellus consequat mauris imperdiet
            tellus. Praesent risus magna nisl turpis egestas ultrices viverra
            pellentesque blandit. Rutrum consequat eu penatibus ipsum at.
            Vestibulum a pharetra facilisis varius proin ultricies tellus. Ac
            viverra pharetra sit elementum magna nullam ornare in a. Egestas
            velit id nisi a. Elementum eget vulputate dignissim urna sed tellus
            felis. Tellus in et sed mattis morbi velit massa donec. Pharetra
            congue ut posuere etiam ac arcu vel. Vitae venenatis ipsum sed non
            non nibh cursus. Viverra mauris nunc proin bibendum risus quis
            aliquet et est. Vel etiam nunc quis ullamcorper nulla velit arcu.
            Volutpat interdum fermentum est tellus amet scelerisque sit. Est
            tellus neque nisl dictum et cras et. Nunc ullamcorper imperdiet ut
            adipiscing pellentesque ullamcorper. Mauris sit consectetur mi
            quisque in fermentum non urna. Cras tortor elementum arcu risus
            faucibus odio amet. Ac molestie laoreet et integer molestie. Aliquam
            volutpat egestas convallis sit erat. Viverra nulla tellus a
            pulvinar. Fermentum vitae sit phasellus tellus ut nulla volutpat
            risus. Laoreet condimentum sodales mauris feugiat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventView;
