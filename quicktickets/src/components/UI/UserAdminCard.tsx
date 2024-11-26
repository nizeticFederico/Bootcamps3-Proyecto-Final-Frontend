"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { json } from "stream/consumers";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado del modal
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const fetchUsers = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/user/all-customers`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                token: `${session?.accessToken}`,
              },
            }
          );

          const data: User[] = await response.json();
          setUsers(data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      fetchUsers();
    } else if (status === "unauthenticated") {
      toast.error("You must be logged in to view users");
    }
  }, [session, status]);

  const filteredUsers = searchTerm
    ? users.filter((user) =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  const deleteEvent = async (userId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/user/full-delete/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: `${session?.accessToken}`,
          },
        }
      );

      if (response.ok) {
        setUsers(users.filter((user) => user._id !== userId));
        toast.success("User deleted successfully");
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  const handleDelete = async (userId: string) => {
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

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    const updatedStatus = !currentStatus;
    setUsers(
      users.map((user) =>
        user._id === userId ? { ...user, is_active: updatedStatus } : user
      )
    );

    try {
      const response = await fetch(
        `http://localhost:3001/user/toggle-status/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token: `${session?.accessToken}`,
          },
          body: JSON.stringify({
            userId,
          }),
        }
      );

      if (response.ok) {
        toast.success(
          `User status ${updatedStatus ? "activated" : "deactivated"}`
        );
      } else {
        toast.error("Error updating user status");
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, is_active: !updatedStatus } : user
          )
        );
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Error updating user status");
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, is_active: !updatedStatus } : user
        )
      );
    }
  };

  const handleChangeRole = async (
    userId: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      const response = await fetch(`http://localhost:3001/user/new-admin`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: `${session?.accessToken}`,
        },
        body: JSON.stringify({
          userId,
        }),
      });

      if (response.ok) {
        toast.success(`User ${firstName} ${lastName} is now Admin`);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
      } else {
        toast.error("Error updating user role");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Error updating user role");
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
            <li
              key={user._id}
              className="flex border border-gray-200 p-1 rounded-md w-full min-w-full transition-transform transform hover:scale-105 hover:shadow-lg duration-300 hover:rounded-lg hover:cursor-pointer"
            >
              <div className="flex gap-5 p-2 items-center justify-between w-full">
                <span className="min-w-32 font-bold ">{`${user.first_name}  ${user.last_name}`}</span>

                <label>
                  Role:{" "}
                  <p className="font-bold text-orange-500 inline-block">
                    {String(user.role)}
                  </p>
                </label>

                {user.is_active ? (
                  <label>
                    Is active:{" "}
                    <p className="font-bold text-blue-500 inline-block">
                      {String(user.is_active)}
                    </p>
                  </label>
                ) : (
                  <label>
                    Is active:{" "}
                    <p className="font-bold text-red-500 inline-block">
                      {String(user.is_active)}
                    </p>
                  </label>
                )}
                <div>
                  <button
                    onClick={() =>
                      handleChangeRole(
                        user._id,
                        user.first_name,
                        user.last_name
                      )
                    }
                    className="bg-violet-500 text-white p-1 rounded rounded-md min-w-16"
                  >
                    Make admin
                  </button>

                  <button
                    onClick={() => handleToggleStatus(user._id, user.is_active)}
                    className="ml-2 bg-gray-500 text-white p-1 rounded rounded-md min-w-16"
                  >
                    Toggle Status
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="ml-2 bg-red-500 text-white p-1 rounded rounded-md min-w-16"
                  >
                    Delete
                  </button>
                </div>
              </div>
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
