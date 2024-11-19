"use client";

import { useState, useEffect } from "react";
import { useSession  } from "next-auth/react";
import Modal from "./Modal";
import { toast } from "react-toastify";

interface Event {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  dateTime: Date;
  price: number;
  capacity: number;
  availability: number;
  category: string;
  location: string;
  latitude: number;
  longitude: number;
  creatorId: string;
}


export default function EventCard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [editedEvent, setEditedEvent] = useState<Event | null>(null); 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado del modal
  const [eventIdToDelete, setEventIdToDelete] = useState<string | null>(null);
  const {data:session , status}= useSession();
  


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/event/all'); 
        const data: Event[] = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = searchTerm
    ? events.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : events;


  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Event) => {
    if (editedEvent) {
      setEditedEvent({
        ...editedEvent,
        [field]: e.target.value,
      });
    }
  };


  const handleEditClick = (eventId: string) => {
    const eventToEdit = events.find(event => event._id === eventId);
    if (eventToEdit) {
      setEditingEventId(eventId);
      setEditedEvent({ ...eventToEdit });
    }
  };



  const deleteEvent = async (eventId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/event/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'token': `${session?.accessToken}`,
        },
      });
  
      if (response.ok) {
        setEvents(events.filter(event => event._id !== eventId));
        toast.success('Event deleted succesfully')
      } else {
          toast.error('Error');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  const handleDelete = async (eventId:string) => {

    setEventIdToDelete(eventId);
    setIsModalOpen(true);

  };

  const handleDeleteConfirm = async () => {
    if (eventIdToDelete) {
      await deleteEvent(eventIdToDelete); // Call deleteEvent with the event ID
      setIsModalOpen(false); // Close the modal
    }
  };

  const handleDeleteCancel = () => {
    setIsModalOpen(false);
    setEventIdToDelete(null); 
  };

  const handleSaveClick = async (eventId: string) => {
    if (!editedEvent) return;

    try {
      const response = await fetch(`http://localhost:3001/event/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token':`${session?.accessToken}`
        },
        body: JSON.stringify(editedEvent),
      });

      if (response.ok) {
        const { event: updatedEvent } = await response.json();
        setEvents(events.map(event =>
          event._id === eventId ? updatedEvent : event
        ));
        setEditingEventId(null);
        setEditedEvent(null); 
        toast.success('Event succesfully updated ');
      } else {
        toast.error('Error due to save changes')
      }
    } catch (error) {
      console.error('Error al enviar los datos a la API:' , error);
    }
  };

  const handleCancelClick = () => {
    setEditingEventId(null);
    setEditedEvent(null);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center p-8 gap-4">
      <h3 className="text-4xl">Events</h3>
      <input
        className="rounded border border-black w-[50%] p-2 focus:outline-none"
        type="text"
        placeholder="Find events by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul className="flex flex-col items-start p-4 gap-4 min-w-[50%]">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <li key={event._id} className="flex border border-gray-200 p-1 rounded-md w-full min-w-full transition-transform transform hover:scale-105 hover:shadow-lg duration-300 hover:rounded-lg hover:cursor-pointer">
              {editingEventId === event._id && editedEvent ? (
                <div className="flex flex-col gap-2 w-full p-2">
                  <div className="flex items-center gap-2">
                    <label>Name:</label>
                    <input
                      type="text"
                      value={editedEvent.name}
                      onChange={(e) => handleEditChange(e, 'name')}
                      className="border p-1 focus:outline-none rounded rounded-md p-2"
                    />
                  </div>

                  
                  <div className="flex items-center gap-2">
                    <label>Description:</label>
                    <input
                      type="text"
                      value={editedEvent.description}
                      onChange={(e) => handleEditChange(e, 'description')}
                      className="border p-1 mb-2 focus:outline-none rounded rounded-md"
                    />
                  </div>

                  
                  <div className="flex items-center gap-2">
                    <label>Date & Time:</label>
                    <input
                      type="datetime-local"
                      value={editedEvent.dateTime.toString().slice(0, 16)}
                      onChange={(e) => handleEditChange(e, 'dateTime')}
                      className="border p-1 mb-2 focus:outline-none  rounded rounded-md"
                    />
                  </div>

                
                  <div className="flex items-center gap-2">
                    <label>Price:</label>
                    <input
                      type="number"
                      value={editedEvent.price}
                      onChange={(e) => handleEditChange(e, 'price')}
                      className="border p-1 mb-2 focus:outline-none rounded rounded-md"
                    />
                  </div>

                  
                  <div className="flex items-center gap-2">
                    <label>Capacity:</label>
                    <input
                      type="number"
                      value={editedEvent.capacity}
                      onChange={(e) => handleEditChange(e, 'capacity')}
                      className="border p-1 mb-2 focus:outline-none rounded rounded-md"
                    />
                  </div>

                  
                  <div className="flex items-center gap-2">
                    <label>Availability:</label>
                    <input
                      type="number"
                      value={editedEvent.availability}
                      onChange={(e) => handleEditChange(e, 'availability')}
                      className="border p-1 mb-2 focus:outline-none  rounded rounded-md"
                    />
                  </div>

                  
                  <button
                    onClick={() => handleSaveClick(event._id)}
                    className="bg-green-500 text-white p-2 rounded rounded-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="bg-red-500 text-white p-2 rounded rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 p-2 items-center justify-between w-full">
                 
                  <span>{event.name}</span>
                  <div>
                  <button
                    onClick={() => handleEditClick(event._id)}
                    className=" bg-gray-500 text-white p-1 rounded rounded-md min-w-16"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="ml-2 bg-red-500 text-white p-1 rounded rounded-md min-w-16"
                  >
                    Delete
                  </button>

                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>No se encontraron eventos</p>
        )}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
