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
        <div className="flex min-h-screen bg-gray-50">
          {/* Menú */}
          <div className="w-64 bg-gray-100   py-4">
            <h2 className="font-bold text-2xl ml-4 mt-8 mb-8">My tickets</h2>
            <ul>
              <li className="mb-4">
                <button
                  className={`w-full text-left p-3 pl-6  ${
                    selectedSection === "My tickets"
                      ? "bg-white font-bold"
                      : "text-gray-700"
                  }`}
                  onClick={() => setSelectedSection("My tickets")}
                >
                  Tickets
                </button>
              </li>
            </ul>
          </div>
          <div className="flex-1 p-8 bg-white shadow-md">{renderSection()}</div>
        </div>
      );
}