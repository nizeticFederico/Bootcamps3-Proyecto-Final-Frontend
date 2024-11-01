"use client";
import React, { useState } from "react";

const Account = () => {
  // Estado para la sección seleccionada
  const [selectedSection, setSelectedSection] = useState<
    "info" | "email" | "password"
  >("info");

  // Componentes de cada sección
  const renderSection = () => {
    switch (selectedSection) {
      case "info":
        return <AccountInfo />;
      case "email":
        return <ChangeEmail />;
      case "password":
        return <ChangePassword />;
      default:
        return <AccountInfo />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Menú */}
      <div className="w-64 bg-gray-100   py-8">
        <h2 className="font-bold text-2xl ml-4 mt-8 mb-8">Account Settings</h2>
        <ul>
          <li className="mb-4">
            <button
              className={`w-full text-left p-3 pl-6  ${
                selectedSection === "info"
                  ? "bg-white font-bold"
                  : "text-gray-700"
              }`}
              onClick={() => setSelectedSection("info")}
            >
              Account Info
            </button>
          </li>
          <li className="mb-4">
            <button
              className={`w-full text-left p-3 pl-6  ${
                selectedSection === "email"
                  ? "bg-white font-bold"
                  : "text-gray-700"
              }`}
              onClick={() => setSelectedSection("email")}
            >
              Change Email
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-3 pl-6  ${
                selectedSection === "password"
                  ? "bg-white font-bold"
                  : "text-gray-700"
              }`}
              onClick={() => setSelectedSection("password")}
            >
              Password
            </button>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8 bg-white shadow-md">{renderSection()}</div>
    </div>
  );
};
{
  /* Información de mi cuenta */
}
const AccountInfo = () => (
  <div className="p-6 max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold mb-4">Account Information</h2>
    <hr />
    
    {/* Profile Photo Section */}
    <h3 className="flex justify-center font-semibold text-1xl mb-4 mt-8">
      Profile Photo
    </h3>
    <div className="flex items-center justify-center mb-6 mt-5">
      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center relative">
        <span className="text-gray-500">Photo</span>
        <button className="absolute bottom-0 right-0 bg-gray-300 rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>

    {/* Profile Information Section */}
    <form>
      <div className="mb-6">
        <h3 className="flex justify-center font-semibold text-1xl mb-4">
          Profile Information
        </h3>
        
        <div className="flex items-center mb-4 justify-center">
          <label className="w-32 text-gray-700 text-right pr-4">
            First Name:
          </label>
          <input type="text" className="border p-2 w-3/4" />
        </div>

        <div className="flex items-center mb-4 justify-center">
          <label className="w-32 text-gray-700 text-right pr-4">
            Last Name:
          </label>
          <input type="text" className="border p-2 w-3/4" />
        </div>

        <div className="flex items-center mb-4 justify-center">
          <label className="w-32 text-gray-700 text-right pr-4">
            Website:
          </label>
          <input type="text" className="border p-2 w-3/4" />
        </div>

        <div className="flex items-center mb-4 justify-center">
          <label className="w-32 text-gray-700 text-right pr-4">
            Company:
          </label>
          <input type="text" className="border p-2 w-3/4" />
        </div>
      </div>

      {/* Contact Details Section */}
      <div className="mb-6">
        <h3 className="flex justify-center font-semibold text-1xl mb-4">
          Contact Details
        </h3>
        <span className="font-light flex text-center justify-center text-sm mb-4">
          These details are private and only used to contact you for ticketing
          or prizes.
        </span>
        
        <div className="flex items-center mb-4 justify-center">
          <label className="w-32 text-gray-700 text-right pr-4">
            Phone Number:
          </label>
          <input type="text" className="border p-2 w-3/4" />
        </div>

        <div className="flex items-center mb-4 justify-center">
          <label className="w-32 text-gray-700 text-right pr-4">
            Address:
          </label>
          <input type="text" className="border p-2 w-3/4" />
        </div>

        <div className="flex items-center mb-4 justify-center">
          <label className="w-32 text-gray-700 text-right pr-4">
            City/Town:
          </label>
          <input type="text" className="border p-2 w-3/4" />
        </div>

        <div className="flex items-center mb-4 justify-center">
          <label className="w-32 text-gray-700 text-right pr-4">
            Country:
          </label>
          <input type="text" className="border p-2 w-3/4" />
        </div>

        <div className="flex items-center mb-4 justify-center">
          <label className="w-32 text-gray-700 text-right pr-4">
            Pincode:
          </label>
          <input type="text" className="border p-2 w-3/4" />
        </div>
      </div>
      
      {/* Save Button */}
      <div className="flex justify-center mt-6">
        <button className="bg-blue-950 text-white rounded py-2 px-4 mt-4">
          Save My Profile
        </button>
      </div>
    </form>
  </div>
);


const ChangeEmail = () => (
  <div className="p-6 max-w-3xl mx-auto">
    <h2 className="text-2xl font-bold mb-4">Change Email</h2>
    <hr />
    <form>
      <div className="flex items-center mb-4 mt-8">
        <label className="w-1/4 text-gray-700 text-right pr-4">
          Current Email:
        </label>
        <input
          type="email"
          className="border p-2 w-3/4"
          value="user@example.com"
          disabled
        />
      </div>
      
      <div className="flex items-center mb-4">
        <label className="w-1/4 text-gray-700 text-right pr-4">
          New Email:
        </label>
        <input type="email" className="border p-2 w-3/4" />
      </div>
      <div className="flex items-center mb-4">
        <label className="w-1/4 text-gray-700 text-right pr-4">
          Confirm Email:
        </label>
        <input type="email" className="border p-2 w-3/4" />
      </div>
      <div className="flex justify-center mt-6">
        <button className="bg-blue-950 text-white rounded py-2 px-4">
          Save New Email
        </button>
      </div>
    </form>
  </div>
);


const ChangePassword = () => (
  <div className="p-6 max-w-2xl mx-auto">
    <h2 className="text-2xl font-bold mb-4">Change Password</h2>
    <hr />
    <form>
      <div className="flex items-center mb-4 mt-8">
        <label className="w-1/3 text-gray-700 text-right pr-4">
          New Password:
        </label>
        <input type="password" className="border p-2 w-2/3" />
      </div>
      <div className="flex items-center mb-4">
        <label className="w-1/3 text-gray-700 text-right pr-4">
          Confirm Password:
        </label>
        <input type="password" className="border p-2 w-2/3" />
      </div>
      <div className="flex justify-center mt-6">
        <button className="bg-blue-950 text-white rounded py-2 px-4 mt-4">
          Save New Password
        </button>
      </div>
    </form>
  </div>
);

export default Account;
