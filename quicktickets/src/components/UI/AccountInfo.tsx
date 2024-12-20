"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";


import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
/* AccountInfo Section */

const AccountInfo = () => {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    state: "",
    country: "",
    imageUrl: "", 
  });
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null); 

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const form = new FormData();
      form.append("image", file);
  
      try {
        const response = await fetch("https://kit-rich-starling.ngrok-free.app/image/upload", {
          method: "POST",
          body: form,
        });
  
        if (response.ok) {
          const data = await response.json();
          setProfileImage(data.url.secure_url);
          setFormData({ ...formData, imageUrl: data.url.secure_url });
          
        } else {
          toast.error("Error");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error to charge de image.");
      }
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData({ ...formData, [field]: e.target.value });
  };


  const fetchUserData = async () => {
    try {
      const response = await fetch('https://kit-rich-starling.ngrok-free.app/user/information', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: `${session?.accessToken}`,
          'ngrok-skip-browser-warning': '1',
        },
      });

      if (response.ok) {
        const data = await response.json();

        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          phone: data.phone || "",
          state: data.state || "",
          country: data.country || "",
          imageUrl: data.imageUrl || "",
        });
        
        setProfileImage(data.imageUrl || null); 
      } else {
        toast.error("Error to obtain user data.");
      }
    } catch (error) {
      toast.error("Error fetching user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchUserData();
    }
  }, [session]);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const finalData = { ...formData, imageUrl: profileImage };

      const response = await fetch("https://kit-rich-starling.ngrok-free.app/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: `${session?.accessToken}`,
        },
        body: JSON.stringify(finalData),
      });

      const responseData = await response.json(); // Obtener los datos del cuerpo de la respuesta

      console.log("Respuesta del servidor después de actualización:", responseData);

      if (response.ok) {
        toast.success("Profile updated");
      } else {
        toast.error(`Error to update profile: ${responseData.message || 'Error'}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Account Information</h2>
      <hr />

      {/* Profile Photo Section */}
      <h3 className="flex justify-center font-semibold text-1xl mb-4 mt-8">
        Profile Photo
      </h3>
      <div className="flex items-center justify-center mb-6 mt-5">
        <label className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center relative overflow-hidden cursor-pointer">
          {profileImage ? (
            <Image
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
              width={80} 
              height={80}
            />
          ) : (
            <span className="text-gray-500 text-3xl font-bold flex items-center justify-center ">
              +
            </span>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <span className="absolute bottom-0 right-0 bg-gray-300 rounded-full p-1"></span>
        </label>
      </div>


      <form onSubmit={handleSubmit}>
        {/* Profile Information Section */}
        <div className="mb-6">
          <h3 className="flex justify-center font-semibold text-1xl mb-4">
            Profile Information
          </h3>

          <div className="flex items-center mb-4 justify-center">
            <label className="w-32 text-gray-700 text-right pr-4">First Name:</label>
            <input
              type="text"
              className="border p-2 w-3/4 bg-gray-100"
              value={formData.first_name}
              onChange={(e) => handleInputChange(e, "first_name")}
            />
          </div>

          <div className="flex items-center mb-4 justify-center">
            <label className="w-32 text-gray-700 text-right pr-4">Last Name:</label>
            <input
              type="text"
              className="border p-2 w-3/4 bg-gray-100"
              value={formData.last_name}
              onChange={(e) => handleInputChange(e, "last_name")}
            />
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="mb-6">
          <h3 className="flex justify-center font-semibold text-1xl mb-4">
            Contact Details
          </h3>
          <span className="font-light flex text-center justify-center text-sm mb-4">
            These details are private and only used to contact you for ticketing or prizes.
          </span>

          <div className="flex items-center mb-4 justify-center">
            <label className="w-32 text-gray-700 text-right pr-4">Phone Number:</label>
            <input
              type="text"
              className="border p-2 w-3/4"
              value={formData.phone}
              onChange={(e) => handleInputChange(e, "phone")}
            />
          </div>

          <div className="flex items-center mb-4 justify-center">
            <label className="w-32 text-gray-700 text-right pr-4">State:</label>
            <input
              type="text"
              className="border p-2 w-3/4"
              value={formData.state}
              onChange={(e) => handleInputChange(e, "state")}
            />
          </div>

          <div className="flex items-center mb-4 justify-center">
            <label className="w-32 text-gray-700 text-right pr-4">Country:</label>
            <input
              type="text"
              className="border p-2 w-3/4"
              value={formData.country}
              onChange={(e) => handleInputChange(e, "country")}
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-950 text-white rounded py-2 px-4 mt-4"
          >
            Save My Profile
          </button>
        </div>
      </form>
    </div>
  );
};



/* ChangeEmail Section */

const ChangeEmail = () => {
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newEmail !== confirmEmail) {
      toast.error("Los emails no coinciden.");
      return;
    }

    const requestBody = {
      email: newEmail,
    };

    try {
      const response = await fetch("https://kit-rich-starling.ngrok-free.app/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: `${session?.accessToken || ""}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Email cambiado con éxito.", {
          position: "bottom-center",
        });
        // Limpiar los campos después del éxito
        setNewEmail("");
        setConfirmEmail("");
      } else {
        toast.error(data.message || "Error al cambiar el email.");
      }
    } catch {
      toast.error("Hubo un error al intentar cambiar el email.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Change Email</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        {/* Nuevo correo electrónico */}
        <div className="flex items-center mb-4 mt-9">
          <label className="w-1/4 text-gray-700 text-right pr-4">
            New Email:
          </label>
          <input
            type="email"
            className="border p-2 w-3/4"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>

        {/* Confirmar correo electrónico */}
        <div className="flex items-center mb-4">
          <label className="w-1/4 text-gray-700 text-right pr-4">
            Confirm Email:
          </label>
          <input
            type="email"
            className="border p-2 w-3/4"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
        </div>

        {/* Botón para guardar */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-950 text-white rounded py-2 px-4"
          >
            Save New Email
          </button>
        </div>
      </form>

      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
};

/* ChangePassword Section */

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [repeatedNewPassword, setRepeatedNewPassword] = useState("");
  const [showRepeatedNewPassword, setShowRepeatedNewPassword] = useState(false);

  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== repeatedNewPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    const requestBody = { currentPassword, newPassword, repeatedNewPassword };

    try {
      const response = await fetch(
        "https://kit-rich-starling.ngrok-free.app/user/update-password",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token: `${session?.accessToken || ""}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Contraseña cambiada con éxito.");
        // Limpia los campos después del éxito
        setCurrentPassword("");
        setNewPassword("");
        setRepeatedNewPassword("");
      } else {
        toast.error(data.message || "Error al cambiar la contraseña.");
      }
    } catch {
      toast.error("Hubo un error al intentar cambiar la contraseña.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        {/* Current Password */}
        <div className="flex items-center mb-4 mt-8">
          <label className="w-1/3 text-gray-700 text-right pr-4">
            Current Password:
          </label>
          <div className="relative w-2/3">
            <input
              type={showCurrentPassword ? "text" : "password"}
              className="border p-2 w-full"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* New Password */}
        <div className="flex items-center mb-4">
          <label className="w-1/3 text-gray-700 text-right pr-4">
            New Password:
          </label>
          <div className="relative w-2/3">
            <input
              type={showNewPassword ? "text" : "password"}
              className="border p-2 w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="flex items-center mb-4">
          <label className="w-1/3 text-gray-700 text-right pr-4">
            Confirm New Password:
          </label>
          <div className="relative w-2/3">
            <input
              type={showRepeatedNewPassword ? "text" : "password"}
              className="border p-2 w-full"
              value={repeatedNewPassword}
              onChange={(e) => setRepeatedNewPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              onClick={() =>
                setShowRepeatedNewPassword(!showRepeatedNewPassword)
              }
            >
              {showRepeatedNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-950 text-white rounded py-2 px-4 mt-4"
          >
            Save New Password
          </button>
        </div>
      </form>

      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
};

export default Account;