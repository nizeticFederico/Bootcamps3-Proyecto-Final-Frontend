"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Message from "@/components/UI/Message";
import Image from "next/image";
/* import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"; */

// Configuraciones dl mapita de Google Maps
/* const mapContainerStyle = {
  width: "100%",
  height: "400px",
};
const center = { lat: -27.46784, lng: -58.8344 }; */
// Coordenadas iniciales (Corrientes, Capital)

export default function EventCreate() {

  const [values, setValues] = useState({
    name:"",
    description:"" ,
    imageUrl:"", 
    date:"",
    time:"", 
    price:"", 
    capacity:"", 
    category:"" , 
    location:"", 
    latitude:"", 
    longitude:"",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [eventType, setEventType] = useState<'ticketed' | 'free' | null>(null);
  const [categories, setCategories] = useState<[]>([]);
  const [status , setStatus] = useState<number | null >(null)

  const router = useRouter();
/* 
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  }); */

/*  
  const {
    ready,
    value: address,
    setValue: setAddress,
    suggestions: { status: suggestionsStatus, data: suggestions },
    clearSuggestions,
  } = usePlacesAutocomplete();
*/
/* 
  const handleSelectAddress = async (address: string) => {
    setAddress(address);
    clearSuggestions(); */

/*     
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);

      setValues({
        ...values,
        location: address,
        latitude: lat.toString(),
        longitude: lng.toString(),
      });
    } catch (error) {
      console.error("Error al obtener coordenadas:", error);
    }
  };
*/
/*  
    const onMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setValues({
      ...values,
      latitude: lat.toString(),
      longitude: lng.toString(),
    });
*/

    // Obtener dirección inversa de lat/lng
/*    
    getGeocode({ location: { lat, lng } })
      .then((results) => {
        const address = results[0].formatted_address;
        setAddress(address);
        setValues({
          ...values,
          location: address,
          latitude: lat.toString(),
          longitude: lng.toString(),
        });
      })
      .catch((error) => console.error("Error al obtener dirección inversa:", error));
  }, [values]);
*/
  
  /*   
  // Nueva función para cargar la imagen
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // Cambia con tu configuración de Cloudinary
  
      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        setValues({ ...values, imageUrl: data.secure_url });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };
  
    };
  */

    useEffect(() => {
      // Función para cargar las categorías desde la API
      async function fetchCategories() {
        try {
          const response = await fetch("http://localhost:3001/category/all");
          if (response.ok) {
            const data = await response.json();
            setCategories(data);
          } else {
            console.error("Error al cargar las categorías");
          }
        } catch (error) {
          console.error("Error de red al cargar las categorías:", error);
        }
      }
  
      fetchCategories();
    }, []);

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
      e.preventDefault();
      setLoading(true);

      // Combina `date` y `time` en el formato adecuado para `dateTime`
      const dateTime = `${values.date}T${values.time}`;

      const data = {
          role: "admin",
          name: values.name.toLocaleLowerCase(),
          description: values.description,
          imageUrl: values.imageUrl,
          dateTime: dateTime,
          price: values.price,
          capacity: values.capacity,
          category: values.category,
          location: values.location,
          latitude: values.latitude,
          longitude: values.longitude,
          /* creatorId: values.creatorId, */
      }


      try {
          const response = await fetch(`http://localhost:3001/event`,{
              method:"POST",
              headers:{
                  "Content-Type":"application/json",
              },
              body: JSON.stringify(data)
          })

          if (response.status === 201) {
              setLoading(false)
              setStatus(response.status)
              setTimeout(()=>{
                  setStatus(null)
              }, 3000)
              router.push("/events") //ver en la Daily
              
          }else{
              setStatus(response.status);
              setLoading(false)
              setTimeout(()=>{
                  setStatus(null)
              }, 3000)
          }
      } catch (error) {
          console.log(error);
      }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement| HTMLSelectElement | HTMLTextAreaElement>){
      const {currentTarget} = event;
      const {name , value} = currentTarget;
     
      setValues({ ...values, [name]:value});
  }

  
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex">
          <h2 className="flex-col">Create a New Event</h2>
        </div>
        <div>
          <h3 className="flex-col">Event Details</h3>
          <form className="flex flex-col w-1/3" onSubmit={handleSubmit}>
            {/* Inicio Seccion Nombre */}
            <label htmlFor="name">Event Title</label>
              <input  type="text" 
              name="name" 
              placeholder="Enter the name of your event" 
              value={values.name}  
              onChange = {handleChange} 
              className="border rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500"
              required/>
            {/* Final Seccion Nombre */}

            {/* Inicio Seccion Categoria */}
            <label htmlFor="category">Event Category</label>
            <select
              name="category"
              value={values.category}
              onChange={handleChange}
              className="border border-gray-300 rounded focus:outline-none focus:ring-0 bg-white text-gray-600"
              required
            >
              <option value="">Please select one</option>
              {categories.map((category: { id: string; name: string }) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {/* Final Seccion Categoria */}

            {/* Inicio Seccion Date and Time */}
            <h3 className="flex-col">Date & Time</h3>
            <div>
            <label htmlFor="date">Start Day</label>
              <input type="date" 
              name="date"
              value={values.date}  
              onChange = {handleChange}
              className="border rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500"
              required/>
              
            <label htmlFor="time">Start Time</label>
              <input type="time" 
              name="time"
              value={values.time}  
              onChange = {handleChange} 
              className="border rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500"
              required/>
            </div>
            {/* Final Seccion Date and Time */}

            {/* Inicio Seccion Location */}
            <label htmlFor="location">Event Location</label>
            {/*         
              <input
                type="text"
                name="location"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onBlur={() => handleSelectAddress(address)}
                placeholder="Enter address"
                className="border rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500"
                required
              />
              {suggestionsStatus === "OK" && (
                <ul className="bg-white border border-gray-300 mt-2 rounded">
                  {suggestions.map(({ place_id, description }) => (
                    <li
                      key={place_id}
                      onClick={() => handleSelectAddress(description)}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                    >
                      {description}
                    </li>
                  ))}
                </ul>
              )}
              */}
              {/* Mapita de Google para seleccionar ubicacion */}
              {/*         
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={{
                  lat: values.latitude ? parseFloat(values.latitude) : center.lat,
                  lng: values.longitude ? parseFloat(values.longitude) : center.lng,
                }}
                zoom={14}
                onClick={onMapClick}
              >
                {values.latitude && values.longitude && (
                  <Marker
                    position={{
                      lat: parseFloat(values.latitude),
                      lng: parseFloat(values.longitude),
                    }}
                  />
                )}
              </GoogleMap>
              */}

            {/* Inicio Seccion Informacion adicional */}
            <h3 className="flex-col">Aditional Information</h3>
            <label htmlFor="description">Event description</label>
              <textarea
              name="description" 
              placeholder="Describe what's special about your event & other important details." 
              value={values.description}  
              onChange = {handleChange}
              className="border rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500"
              required/>
            {/* Final Seccion Informacion adicional */}

            {/* Inicion Seccion Imagen */}
            <h3 className="flex-col">Upload Image</h3>
            <label htmlFor="imageUrl">Upload Image</label>
              <input type="file"
              /* esto determina lo tipo de archivos que se pueden cargar */
              accept=".jpg,.jpeg,.png"
              name="imageUrl" 
              placeholder="No file chosen." 
              value={values.imageUrl}
              onChange={handleChange}
              /* onChange={handleImageUpload} */
              className="border rounded-md p-2 focus:outline-none border-gray-300 focus:border-gray-500"
              required/>
              <p className="text-sm text-gray-500 mt-2">
                Feature Image must be at least 1170 pixels wide by 504 pixels high.
              </p>
              <p className="text-sm text-gray-500">
                Valid file formats: JPG, JPEG, PNG.
              </p>
            {/* Final Seccion Imagen */}

            {/* Inicio Seccion tipo de evento */} 
            <h3 className="flex-col">What type of event are you running?</h3>
              <div className="flex flex-row">
                {/* opcion Regular */}
                <div
                  onClick={() => setEventType('ticketed')}
                  className={`cursor-pointer border rounded-md focus:outline-none transition-all ${
                    eventType === 'ticketed' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <span className="text-4xl">
                    <Image
                      src="/assets/images/icons/ticket-blue.svg"
                      width={50}
                      height={50}
                      alt="Ticketed Event Icon"
                    />
                  </span>
                  <p className="text-lg font-semibold ">Ticketed Event</p>
                  <p className="text-sm text-gray-500">My event requires tickets for entry</p>
                </div>

                {/* opcion FREE */}
                <div
                  onClick={() => setEventType('free')}
                  className={`cursor-pointer border rounded-md focus:outline-none transition-all ${
                    eventType === 'free' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <span className="text-4xl">
                    <Image
                      src="/assets/images/icons/free-grey.svg"
                      width={50}
                      height={50}
                      alt="Free Event Icon"
                    />
                  </span>
                  <p className="text-lg font-semibold">Free Event</p>
                  <p className="text-sm text-gray-500">I&apos;m running a free event</p>
                </div>
              </div>
              {/* Final Seccion tipo de evento */} 

              {/* Inicion Seccion capacity ande price */}
              <h3 className="text-xl font-semibold text-gray-800">What tickets are you selling?</h3>        
              <div className="flex space-x-4">

                {/* capacidad del envento */}
                <div className="flex-1 relative">
                  <label className="">Event Capacity</label>
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

                {/* precio del ticket */}
                <div className="flex-1 relative">
                  <label>Ticket Price</label>
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
              </div>
              {/* Final Seccion capacity ande price */}

              {/* Inicio Seccion Boton */}
              <button type="submit" 
                className=" flex items-center justify-center text-lg rounded-md p-3 mt-4  text-white text-bold bg-[#2B293D] hover:bg-[#3F3D51] w-full relative">
                  {loading ? (
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                      <div className="loader"></div>
                  </div>
                        ) : (
                      'Create Event'
                  )}
              </button>
              <Message status={status}/>
              {/* Final Seccion Boton */}
          </form>
        </div>
      </div>
    </main>
  );
}