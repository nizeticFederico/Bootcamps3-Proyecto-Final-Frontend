// components/UI/CreateEvent.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Message from "@/components/UI/Message";
import Image from "next/image";
import { FaCloudUploadAlt } from "react-icons/fa";

interface Category {
  id: string;
  name: string;
}

interface EventCreateProps {
  categories: Category[];
}

export default function EventCreate({ categories }: EventCreateProps) {
  const [file, setFile] = useState<File | null>(null);
  const [values, setValues] = useState({
    name: "",
    description: "",
    imageUrl: "",
    /* imageUrl: "https://grafiasmusic.com/wp-content/uploads/2024/05/38020.webp", */
    date: "",
    time: "",
    price: "",
    capacity: "",
    category: "",
    location: "",
    latitude: "-27.46784",
    longitude: "-58.8344",
    creatorId: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [eventType, setEventType] = useState<"ticketed" | "free" | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  
  const router = useRouter();

  async function uploadImage() {
    if (!file) {
      console.error("No file selected.");
      return null;
    }

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://localhost:3001/image/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data.url.secure_url; // Asegúrate de que esta es la propiedad correcta del objeto `data`
    } else {
      console.error("Error uploading image");
      return null;
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // Sube la imagen primero
    const uploadedImageUrl = await uploadImage();
    if (!uploadedImageUrl) {
      setLoading(false);
      return; // Si hay un error al subir la imagen, no continúa con la creación del evento
    }

    // Combina `date` y `time` en el formato adecuado para `dateTime`
    const dateTime = `${values.date}T${values.time}`;

    const data = {
      role: "admin",
      name: values.name.toLocaleLowerCase(),
      description: values.description,
      imageUrl: uploadedImageUrl,
      dateTime: dateTime,
      price: values.price,
      capacity: values.capacity,
      category: values.category,
      location: values.location,
      latitude: values.latitude,
      longitude: values.longitude,
      creatorId: values.creatorId,
    };

    try {
      const response = await fetch(`http://localhost:3001/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        setLoading(false);
        setStatus(response.status);
        setTimeout(() => {
          setStatus(null);
        }, 3000);
        router.push("/");
      } else {
        setStatus(response.status);
        setLoading(false);
        setTimeout(() => {
          setStatus(null);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  }



  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { currentTarget } = event;
    const { name, value } = currentTarget;

    setValues({ ...values, [name]: value });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-7xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md"
    >
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-4xl font-bold mt-10 mb-10 text-center">
          Create a New Event
        </h2>
        <hr className="mb-10" />
        <h3 className="ml-1  font-semibold text-2xl">Event Details</h3>
        {/* Inicio Seccion DAtos */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Inicio Seccion Nombre */}
          <div>
            <label htmlFor="name" className="ml-1 text-lg font-medium">
              Event Title
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter the name of your event"
              value={values.name}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
              required
            />
          </div>
          {/* Final Seccion Nombre */}

          {/* Inicio Seccion Categoria */}
          <div>
          <label htmlFor="category" className="ml-1 text-lg font-medium">
            Event Category
          </label>
            <select
              name="category"
              value={values.category}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
        </div>
          {/* Final Seccion Categoria */}
        </div>

        {/* Final Seccion DAtos */}

        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sección de descripción del evento */}
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-lg font-medium ml-1 mb-2"
            >
              Event Description
            </label>
            <textarea
              name="description"
              placeholder="Describe what's special about your event & other important details."
              value={values.description}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full h-72"
              required
            />
          </div>

          {/* Inicio Sección de imagen */}
          <div className="flex flex-col">
            <h3 className="text-lg font-medium mb-2 ml-1">Upload Image</h3>
            <label htmlFor="imageUpload" className="cursor-pointer">
              <div className="flex flex-col items-center justify-center border rounded-lg p-6 bg-gray-50 w-full h-72">
                <div className="relative">
                  <FaCloudUploadAlt className="text-gray-500 text-8xl" />
                </div>
                <span className="text-blue-600 mb-2">Upload your Event Image</span>
                <div>
                  <p className="text-sm text-gray-500 text-center">
                    Valid file formats: JPG, JPEG, PNG.
                  </p>
                </div>
              </div>
            </label>
              <input
                type="file"
                id="imageUpload"  // Asegúrate de que el id coincide con el htmlFor del label
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className="hidden"
              />
          </div>
        </div>
        {/* Finak Sección de imagen */}

        {/* Final Seccion Date and Time */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2">Date & Time</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Inicio Sección Start Day */}
            <div>
              <label htmlFor="date" className="ml-1 text-lg font-medium">
                Start Day
              </label>
              <input
                type="date"
                name="date"
                value={values.date}
                onChange={handleChange}
                className="border rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500 w-full"
                required
              />
            </div>
            {/* Fin Sección Start Day */}

            {/* Inicio Sección Start Time */}
            <div>
              <label htmlFor="time" className="ml-1 text-lg font-medium">
                Start Time
              </label>
              <input
                type="time"
                name="time"
                value={values.time}
                onChange={handleChange}
                className="border rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500 w-full"
                required
              />
            </div>
            {/* Fin Sección Start Time */}
          </div>
        </div>
        {/* Final Seccion Date and Time */}

        {/* Inicio Seccion Location */}
        <label htmlFor="location" className="text-2xl font-medium ml-1">
          Event Location
        </label>
        <div className="mb-4">
          <input
            type="text"
            name="location"
            placeholder="Where will your event take place?"
            value={values.location}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <input
              type="number"
              name="latitude"
              placeholder="Latitude"
              value={values.latitude}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="longitude"
              placeholder="Longitude"
              value={values.longitude}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
        {/* Final Seccion Location */}

        {/* Inicio Seccion Informacion adicional */}
        {/* Inicio Seccion tipo de evento */}
        <h3 className="text-2xl mb-2 font-semibold flex text-center justify-center text-gray-800">
          What tickets are you selling?
        </h3>
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Opción Regular */}
          <div
            onClick={() => setEventType("ticketed")}
            className={`cursor-pointer border rounded-md p-4 text-center transition-all flex flex-col items-center ${
              eventType === "ticketed"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <div className="flex justify-center mb-2">
              <Image
                src="/assets/images/icons/ticket-blue.svg"
                width={50}
                height={50}
                alt="Ticketed Event Icon"
              />
            </div>
            <p className="text-lg font-semibold mt-2">Ticketed Event</p>
            <p className="text-sm text-gray-500">
              My event requires tickets for entry
            </p>
          </div>

          {/* Opción Free */}
          <div
            onClick={() => setEventType("free")}
            className={`cursor-pointer border rounded-md p-4 text-center transition-all flex flex-col items-center ${
              eventType === "free"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <div className="flex justify-center mb-2">
              <Image
                src="/assets/images/icons/free-grey.svg"
                width={50}
                height={50}
                alt="Free Event Icon"
              />
            </div>
            <p className="text-lg font-semibold mt-2">Free Event</p>
            <p className="text-sm text-gray-500">
              I&apos;m running a free event
            </p>
          </div>
        </div>

        {/* Final Seccion tipo de evento */}

        {/* Inicion Seccion capacity y price */}

        <div className="flex space-x-4">
          {/* capacidad del evento */}
          <div className="flex-1 relative">
            <label className="text-lg font-medium">Event Capacity</label>
            <div className="flex items-center border border-gray-300 rounded">
              <span className="pl-4 text-gray-500">
                <Image
                  src="/assets/images/icons/group-grey.svg"
                  width={20}
                  height={20}
                  alt="Capacity"
                />
              </span>
              <input
                type="number"
                name="capacity"
                placeholder="0"
                value={values.capacity}
                onChange={handleChange}
                min={0}
                className="w-full border rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500"
              />
            </div>
          </div>

          {/* precio del ticket (se muestra solo si el evento es ticketed) */}
          {eventType === "ticketed" && (
            <div className="flex-1 relative">
              <label className="text-lg font-medium">Ticket Price</label>
              <div className="flex items-center border border-gray-300 rounded">
                <span className="pl-4 text-gray-500">
                  <Image
                    src="/assets/images/icons/dollar-rounded.svg"
                    width={20}
                    height={20}
                    alt="Ticket Price Icon"
                  />
                </span>
                <input
                  type="number"
                  name="price"
                  placeholder="0"
                  value={values.price}
                  onChange={handleChange}
                  min={0}
                  className="w-full border rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Final Seccion capacity ande price */}

        {/* Inicio Seccion Boton */}
        <button
          type="submit"
          className=" flex items-center justify-center text-lg rounded-md p-3 mt-4  text-white text-bold bg-[#2B293D] hover:bg-[#3F3D51] w-full relative"
        >
          {loading ? (
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="loader"></div>
            </div>
          ) : (
            "Create Event"
          )}
        </button>
        <Message status={status} />
        {/* Final Seccion Boton */}
      </div>
    </form>
  );
}
