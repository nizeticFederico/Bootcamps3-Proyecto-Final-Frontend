"use client";

import { useState, useEffect } from "react";
import { useSession  } from "next-auth/react";
import Modal from "./Modal";
import { toast } from "react-toastify";

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  role: string;
  is_active: boolean;
}


export default function UserCard() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<User| null>(null); 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado del modal
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const {data:session , status}= useSession();
  


  useEffect(() => {
    if (status === "authenticated") {
      const fetchUsers = async () => {
        try {
          const response = await fetch(`http://localhost:3001/user/all-customers`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'token': `${session?.accessToken}`,
            }
          });

          const data: User[] = await response.json();
          setUsers(data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      fetchUsers();
    } else if (status === "unauthenticated") {
      toast.error("You must be logged in to view users");
    }
  }, [session, status]);

  const filteredUsers = searchTerm
    ? users.filter(user =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;


  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof User) => {
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        [field]: e.target.value,
      });
    }
  };


  const handleEditClick = (userId: string) => {
    const userToEdit = users.find(user => user._id === userId);
    if (userToEdit) {
      setEditingUserId(userId);
      setEditedUser({ ...userToEdit });
    }
  };



  const deleteEvent = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/user/full-delete/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'token': `${session?.accessToken}`,
        },
      });
  
      if (response.ok) {
        setUsers(users.filter(user => user._id !== userId));
        toast.success('User deleted succesfully')
      } else {
          toast.error('Error');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  const handleDelete = async (userId:string) => {

    setUserIdToDelete(userId);
    setIsModalOpen(true);

  };

  const handleDeleteConfirm = async () => {
    if (userIdToDelete) {
      await deleteEvent(userIdToDelete); 
      setIsModalOpen(false); 
    }
  };

  const handleDeleteCancel = () => {
    setIsModalOpen(false);
    setUserIdToDelete(null); 
  };

  const handleSaveClick = async (userId:string) => {
    if (!editedUser) return;
    console.log(session?.accessToken);

    const userToUpdate = {
        first_name: editedUser.first_name,
        last_name: editedUser.last_name,
        email: editedUser.email,
        role: editedUser.role
      };

    try {
      const response = await fetch(`http://localhost:3001/user/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token':`${session?.accessToken}`
        },
        body: JSON.stringify(userToUpdate),
      });

      if (response.ok) {

        console.log(response)
        const updatedUser = await response.json();
        setUsers(users.map(user =>
          user._id === userId ? updatedUser : user
        ));
        setEditingUserId(null);
        setEditedUser(null); 
        toast.success('Event succesfully updated ');
      } else {
        console.log(response)
        toast.error('Error due to save changes')
      }
    } catch (error) {
      console.error('Error al enviar los datos a la API:' , error);
    }
  };

  const handleCancelClick = () => {
    setEditingUserId(null);
    setEditedUser(null);
  };

  const handleToggleStatus = async () => {
    if (!editedUser) return;

    const updatedStatus = !editedUser.is_active;
    setEditedUser(prevState => ({
      ...prevState!,
      is_active: updatedStatus,
    }));

    try {

      const response = await fetch(`http://localhost:3001/user/toggle-status/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'token': `${session?.accessToken}`,
        },
        body: JSON.stringify({
          userId: editedUser._id,
        }),
      });

      if (response.ok) {
        toast.success(`User status ${updatedStatus ? 'activated' : 'deactivated'}`);
      } else {
        toast.error('Error updating user status');
        setEditedUser(prevState => ({
          ...prevState!,
          is_active: !updatedStatus,
        }));
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Error updating user status');
      setEditedUser(prevState => ({
        ...prevState!,
        is_active: !updatedStatus,
      }));
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-center p-8 gap-4">
      <h3 className="text-4xl">Users</h3>
      <input
        className="rounded border border-black w-[50%] p-2 focus:outline-none"
        type="text"
        placeholder="Find users by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul className="flex flex-col items-start p-4 gap-4 min-w-[50%]">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user._id} className="flex border border-gray-200 p-1 rounded-md w-full min-w-full transition-transform transform hover:scale-105 hover:shadow-lg duration-300 hover:rounded-lg hover:cursor-pointer">
              {editingUserId === user._id && editedUser ? (
                <div className="flex flex-col gap-2 w-full p-2">
                  <div className="flex items-center gap-2">
                    <label>Name:</label>
                    <input
                      type="text"
                      value={editedUser.first_name}
                      onChange={(e) => handleEditChange(e, 'first_name')}
                      className="border p-1 focus:outline-none rounded rounded-md p-2"
                    />
                  </div>

                  
                  <div className="flex items-center gap-2">
                    <label>Lastname:</label>
                    <input
                      type="text"
                      value={editedUser.last_name}
                      onChange={(e) => handleEditChange(e, 'last_name')}
                      className="border p-1 mb-2 focus:outline-none rounded rounded-md"
                    />
                  </div>

                  
                  <div className="flex items-center gap-2">
                    <label>Email:</label>
                    <input
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => handleEditChange(e, 'email')}
                      className="border p-1 mb-2 focus:outline-none  rounded rounded-md"
                    />
                  </div>

                
                  <div className="flex items-center gap-2">
                    <label>Phone: <p className="inline-block">{editedUser.phone}</p></label>
                    
                  </div>

                  
                  <div className="flex items-center gap-2">
                    <label>Role:</label>
                    <input
                      type="text"
                      value={editedUser.role}
                      onChange={(e) => handleEditChange(e, 'role')}
                      className="border p-1 mb-2 focus:outline-none rounded rounded-md"
                    />
                  </div>

                  
                  <div className="flex items-center gap-2">
                    {editedUser.is_active ? 
                    ( <label>Is active:  <p className="font-bold text-blue-500 inline-block">{String(editedUser.is_active)}</p></label>) 
                    : 
                    (<label>Is active: <p className="font-bold text-red-500 inline-block">{String(editedUser.is_active)}</p></label>)}
                    
                    <button className="p-1 rounded rounded-md bg-gray-500 text-white ml-2"
                            onClick={handleToggleStatus}>Toggle Status</button>
                    
                  </div>

                  
                  <button
                    onClick={() => handleSaveClick(user._id)}
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
                 
                  <span>{`${user.first_name}  ${user.last_name}`}</span>
                  <div>
                  <button
                    onClick={() => handleEditClick(user._id)}
                    className=" bg-gray-500 text-white p-1 rounded rounded-md min-w-16"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
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
          <p>No Users found</p>
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
