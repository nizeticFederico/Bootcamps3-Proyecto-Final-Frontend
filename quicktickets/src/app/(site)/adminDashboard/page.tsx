"use client"

import { useState, useEffect } from "react";
import EventCard from "@/components/UI/EventAdminCard";
import UserCard from "@/components/UI/UserAdminCard";
import PausedEventCard from "@/components/UI/PausedEvents";
import CategoryCard from "@/components/UI/CategoryAdminCard";

export default function AdminPage(){
    const [selectedSection, setSelectedSection] = useState<
    "Users" | "Events" | "Paused Events" | "Categories"
  >("Users");

  const renderSection = () => {
    switch (selectedSection) {
      case "Users":
        return <UserCard/>;
      case "Events":
        return <EventCard/>;
      case "Paused Events":
        return <PausedEventCard/>
      case "Categories":
        return <CategoryCard/>
      default:
        return <p>default</p>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col lg:flex-row">
      {/* Menú */}
      <div className="w-full lg:w-64 bg-gray-100 py-4 lg:block flex-shrink-0">
        {/* Título centrado */}
        <h2 className="font-bold text-2xl mx-auto text-center mt-8 mb-8">Dashboard</h2>
  
        {/* Menú de lista centrado */}
        <ul className="flex  space-y-4 items-center justify-center lg:block lg:space-y-0 lg:space-x-0">
          <li className="w-full text-center">
            <button
              className={`w-full text-left p-3 pl-6 ${
                selectedSection === "Users" ? "bg-white font-bold" : "text-gray-700"
              }`}
              onClick={() => setSelectedSection("Users")}
            >
              Users
            </button>
          </li>
          <li className="w-full text-center">
            <button
              className={`w-full text-left p-3 pl-6 ${
                selectedSection === "Events" ? "bg-white font-bold" : "text-gray-700"
              }`}
              onClick={() => setSelectedSection("Events")}
            >
              Events
            </button>
          </li>
          <li className="w-full text-center">
            <button
              className={`w-full text-left p-3 pl-6 ${
                selectedSection === "Paused Events" ? "bg-white font-bold" : "text-gray-700"
              }`}
              onClick={() => setSelectedSection("Paused Events")}
            >
              Paused Events
            </button>
          </li>
          <li className="w-full text-center">
            <button
              className={`w-full text-left p-3 pl-6 ${
                selectedSection === "Categories" ? "bg-white font-bold" : "text-gray-700"
              }`}
              onClick={() => setSelectedSection("Categories")}
            >
              Categories
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
  