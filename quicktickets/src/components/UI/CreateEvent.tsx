"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Message from "@/components/UI/Message";
import Image from "next/image";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";
import { TiGroup } from "react-icons/ti";
import { AiOutlineDollar } from "react-icons/ai";
import Categories from "./Categories";
import { useSession } from "next-auth/react";
import GoogleMapComponent from "./GoogleMaps";

export default function EventCreate() {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const searchParams = useSearchParams(); // Para acceder a los datos enviados desde `DataEvent.tsx`
  const [values, setValues] = useState({
    name: "",
    description: "",
    imageUrl: "",
    date: "",
    time: "",
    price: "0",
    capacity: "0",
    category: "",
    location: "",
    country: "",
    city: "",
    latitude: "-27.46784",
    longitude: "-58.8344",
    creatorId: session?.user?.id || "",
  });
  const router = useRouter();
  
  // Revisar si hay datos iniciales
  useEffect(() => {
    const eventData = {
      id: searchParams.get("_id") || "",
      name: searchParams.get("name") || "",
      description: searchParams.get("description") || "",
      category: searchParams.get("category") || "",
      imageUrl: searchParams.get("imageUrl") || "",
      price: searchParams.get("price") || "0",
      capacity: searchParams.get("capacity") || "0",
      latitude: searchParams.get("latitude") || "",
      longitude: searchParams.get("longitude") || "",
    };

    // Procesar dateTime
    const dateTime = searchParams.get("dateTime");
    if (dateTime) {
      const [date, time] = dateTime.split("T");
      eventData.date = date || "";
      eventData.time = time ? time.slice(0, 5) : ""; // Cortar segundos si los hay
    }

    // Procesar location
    const location = searchParams.get("location");
    if (location) {
      const [city, country] = location.split(", ");
      eventData.city = city || "";
      eventData.country = country || "";
      eventData.location = `${city || ""}, ${country || ""}`.trim();
    }

    setValues((prevValues) => ({
      ...prevValues,
      ...eventData,
    }));

      // Actualizar la previsualización de la imagen
  if (eventData.imageUrl) {
    setPreviewImage(decodeURIComponent(eventData.imageUrl));
  }
  }, [searchParams]);
  

  
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);

  const dateTime = `${values.date}T${values.time}`;
  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toTimeString().slice(0, 5);
  const [eventType, setEventType] = useState<"ticketed" | "free" | null>(null);


  

  // Handle marker drag end
  const handleMarkerDragEnd = (coords: { lat: number; lng: number }) => {
    setMarker(coords);
    setValues((prev) => ({
      ...prev,
      latitude: coords.lat.toString(),
      longitude: coords.lng.toString(),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file); // Almacena el archivo
      setPreviewImage(URL.createObjectURL(file)); // Genera una URL para previsualizar la imagen
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
  
    setValues((prevValues) => {
      const newValues = { ...prevValues, [name]: value };
  
      // Si los campos country o city cambian, actualiza location
      if (name === "country" || name === "city") {
        newValues.location = `${newValues.city}, ${newValues.country}`.trim();
      }
  
      return newValues;
    });
  };
  
  const handleSaveAndContinue = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Validar que haya una imagen seleccionada o cargada
    if (!file && !values.imageUrl) {
      alert("Please select an image for the event.");
      return;
    }
  
    // Validar campos obligatorios
    if (!values.name || !values.category || !values.date || !values.time) {
      alert("Please complete all required fields.");
      return;
    }
  
    setLoading(true);
  
    try {
      let uploadedImageUrl = values.imageUrl; // Por defecto, la URL de la imagen existente
  
      // Subir imagen si hay un nuevo archivo seleccionado
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
  
        const response = await fetch("https://kit-rich-starling.ngrok-free.app/image/upload", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("Image upload failed.");
        }
  
        const dataImage = await response.json();
        uploadedImageUrl = dataImage.url.secure_url;
        console.log(uploadedImageUrl);
      }
  
      // Preparar datos del evento
      const dateTime = `${values.date}T${values.time}`; // Asegurar formato ISO
      const eventData = {
        id: values.id || null, // Incluye el ID si existe; null si no
        name: values.name.toLowerCase(),
        description: values.description,
        imageUrl: uploadedImageUrl,
        dateTime,
        price: parseFloat(values.price) || 0,
        capacity: parseInt(values.capacity) || 0,
        category: values.category,
        location: values.location,
        latitude: parseFloat(values.latitude) || null,
        longitude: parseFloat(values.longitude) || null,
        creatorId: session?.user?.id,
      };
  
      localStorage.setItem("eventData", JSON.stringify(eventData));
      console.log("Datos del evento guardados en localStorage:", eventData);
  
      // Redirigir a PreviewEvent con el ID si está disponible
      const redirectUrl = eventData.id
        ? `/events/previewEvent?_id=${eventData.id}`
        : "/events/previewEvent";
  
      console.log("Redirigiendo a:", redirectUrl);
      router.push(redirectUrl);
    } catch (error) {
      console.error("Error creating or editing event:", error);
  
      alert("An error occurred while processing the event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

   // Geocoding based on country and city
   const geocodeLocation = async (country: string, city: string) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        `${city}, ${country}`
      )}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error("Coordinates not found.");
    }
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!values.country || !values.city) return;

      try {
        const coords = await geocodeLocation(values.country, values.city);
        setValues((prev) => ({
          ...prev,
          latitude: coords.lat.toString(),
          longitude: coords.lng.toString(),
        }));
        setMarker(coords);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [values.country, values.city]);

  const [marker, setMarker] = useState({
    lat: parseFloat(values.latitude),
    lng: parseFloat(values.longitude),
  });

  return (
    <form
      onSubmit={handleSaveAndContinue}
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
            Category
          </label>
          <select
            name="category"
            value={values.category}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full"
            required
          >
            <option value="">Select a category</option>
            <Categories
              renderCategory={(category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              )}
            />
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
                {previewImage ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={previewImage}
                      alt="Preview"
                      layout="fill" // Asegura que ocupe todo el contenedor manteniendo proporciones
                      objectFit="cover" // Recorta la imagen para llenar el espacio sin distorsión
                      quality={100} // Calidad máxima de la imagen
                      className="rounded-lg"
                    />
                  </div>
                ) : (
                  <>
                    <div className="relative">
                      <FaCloudUploadAlt className="text-gray-500 text-8xl" />
                    </div>
                    <span className="text-blue-600 mb-2">Upload your Event Image</span>
                    <p className="text-sm text-gray-500 text-center">
                      Valid file formats: JPG, JPEG, PNG.
                    </p>
                  </>
                )}
              </div>
            </label>
            <input
              type="file"
              id="imageUpload"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
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
                min={today}
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
                min={values.date === today ? currentTime : undefined} // Si la fecha es hoy, usa la hora actual como mínimo
                required
              />
            </div>
            {/* Fin Sección Start Time */}
          </div>
        </div>
        {/* Final Seccion Date and Time */}
      {/* Location Section */}
        <div className="mt-6">
          <h3 className="text-2xl font-bold mb-2">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="country" className="ml-1 text-lg font-medium">
                Country
              </label>
              <input
                type="text"
                name="country"
                placeholder="Enter the country"
                value={values.country}
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
                />
            </div>
            <div>
              <label htmlFor="city" className="ml-1 text-lg font-medium">
                City
              </label>
              <input
                type="text"
                name="city"
                placeholder="Enter the city"
                value={values.city}
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
              />
            </div>
          </div>

          <div className="mt-4">
            <GoogleMapComponent
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
              center={marker}
              markerPosition={marker}
              onMarkerDragEnd={handleMarkerDragEnd}
              isPointerMovable={true} // El marcador no debe moverse
            />
          </div>
        </div>
        {/* Fin Sección Location */}

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
              <IoTicketOutline className="text-gray-500 text-5xl"/>
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
              <span className="pl-4 text-gray-500 mr-1">
              <TiGroup className="" />
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
                <span className="pl-4 text-gray-500 mr-1">
                  <AiOutlineDollar />
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
            "Save and Continue"
          )}
        </button>
        <Message status={status} />
        {/* Final Seccion Boton */}
      </div>
    </form>
  );
}