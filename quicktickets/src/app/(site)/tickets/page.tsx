"use client"

import { useState, useEffect } from "react";
import TicketCard from "@/components/UI/TicketCard";


export default function TicketsPage(){
    const [selectedSection, setSelectedSection] = useState<
    "My tickets"
  >("My tickets");

  const renderSection = () => {
    switch (selectedSection) {
      case "My tickets":
        return <TicketCard/> ;
      default:
        return <p>default</p>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col lg:flex-row">
      {/* Menú */}
      <div className="w-full lg:w-64 bg-gray-100 py-4 lg:block flex-shrink-0">
        {/* Título centrado */}
        <h2 className="font-bold text-2xl mx-auto text-center mt-8 mb-8">My Tickets</h2>
  
        {/* Menú de lista centrado */}
        <ul className="flex  space-y-4 items-center justify-center lg:block lg:space-y-0 lg:space-x-0">
          <li className="w-full text-center">
            <button
              className={`w-full sm:text-left p-3 pl-6 ${
                selectedSection === "My tickets" ? "bg-white font-bold" : "text-gray-700"
              }`}
              onClick={() => setSelectedSection("My tickets")}
            >
              Tickets
            </button>
          </li>
        </ul>
      </div>
  
      {/* Contenido principal */}
      <div className="flex-1 p-8 bg-white shadow-md">
        {renderSection()}
      </div>
    </div>
  );
};   