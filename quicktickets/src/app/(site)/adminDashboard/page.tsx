"use client"

import { useState, useEffect } from "react";
import EventCard from "@/components/UI/EventAdminCard";
import UserCard from "@/components/UI/UserAdminCard";

export default function AdminPage(){
    const [selectedSection, setSelectedSection] = useState<
    "users" | "events"
  >("users");

  const renderSection = () => {
    switch (selectedSection) {
      case "users":
        return <UserCard/>;
      case "events":
        return <EventCard/>;
      default:
        return <p>default</p>;
    }
  };

    return (
        <div className="flex min-h-screen bg-gray-50">
          {/* Menú */}
          <div className="w-64 bg-gray-100   py-4">
            <h2 className="font-bold text-2xl ml-4 mt-8 mb-8">Dashboard</h2>
            <ul>
              <li className="mb-4">
                <button
                  className={`w-full text-left p-3 pl-6  ${
                    selectedSection === "users"
                      ? "bg-white font-bold"
                      : "text-gray-700"
                  }`}
                  onClick={() => setSelectedSection("users")}
                >
                  Users
                </button>
              </li>
              <li className="mb-4">
                <button
                  className={`w-full text-left p-3 pl-6  ${
                    selectedSection === "events"
                      ? "bg-white font-bold"
                      : "text-gray-700"
                  }`}
                  onClick={() => setSelectedSection("events")}
                >
                  Events
                </button>
              </li>
            </ul>
          </div>
          <div className="flex-1 p-8 bg-white shadow-md">{renderSection()}</div>
        </div>
      );
}