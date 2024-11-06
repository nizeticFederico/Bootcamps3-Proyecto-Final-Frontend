
import { FaRegCalendarPlus } from 'react-icons/fa';
import Link from "next/link";

const CreateEventBanner = () => {
    return (
      <div className="bg-[#2D2A3E] text-white py-20 px-4 mb-10 flex flex-col items-center text-center md:flex-row md:justify-center md:items-center md:space-x-32">
        <div className="text-center md:text-left max-w-3xl mb-4 md:mb-0 md:mr-20">
          <h2 className="text-3xl font-medium text-yellow-300 whitespace-normal">Create an event with Quicktickets</h2>
          <p className="text-lg font-regular leading-relaxed text-yellow-300 mt-2">
            Got a show, event, activity or a great experience? Partner with us & get listed on Quicktickets.
          </p>
        </div>
        <Link
          href="/events/create-event"
          className="text-2xl flex items-center bg-yellow-400 text-indigo-900 px-6 py-3 rounded-md font-semibold mt-10 md:mt-0 md:ml-10"
        >
          <FaRegCalendarPlus className="mr-2 text-2xl" />
          Create Event
        </Link>
      </div>
    );
  };

  
  

export default CreateEventBanner;

