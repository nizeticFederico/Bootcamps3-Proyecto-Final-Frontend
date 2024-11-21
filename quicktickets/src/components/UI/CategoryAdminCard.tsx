"use client";

import { useState, useEffect } from "react";
import { useSession  } from "next-auth/react";
import Modal from "./Modal";
import { toast } from "react-toastify";
import CreateCategoryModal from "./CategoryModal";
import { CategoryData } from "./CategoryModal";

interface Category {
  _id:string
  name: string;
  description: string;
  
}


export default function CategoryCard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editedCategory, setEditedCategory] = useState<Category | null>(null); 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado del modal
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false); 
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<string | null>(null);
  const {data:session , status}= useSession();
  


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/category/all'); 
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = searchTerm
    ? categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categories;


  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Category) => {
    if (editedCategory) {
      setEditedCategory({
        ...editedCategory,
        [field]: e.target.value,
      });
    }
  };


  const handleEditClick = (categoryId: string) => {
    const categoryToEdit = categories.find(category => category._id === categoryId);
    if (categoryToEdit) {
      setEditingCategoryId(categoryId);
      setEditedCategory({ ...categoryToEdit });
    }
  };



  const deleteEvent = async (categoryId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/category/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'token': `${session?.accessToken}`,
        },
      });
  
      if (response.ok) {
        setCategories(categories.filter(category => category._id !== categoryId));
        toast.success('Category deleted succesfully')
      } else {
          toast.error('Error');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  const handleDelete = async (categoryId:string) => {

    setCategoryIdToDelete(categoryId);
    setIsModalOpen(true);

  };

  const handleDeleteConfirm = async () => {
    if (categoryIdToDelete) {
      await deleteEvent(categoryIdToDelete); // Call deleteEvent with the event ID
      setIsModalOpen(false); // Close the modal
    }
  };

  const handleDeleteCancel = () => {
    setIsModalOpen(false);
    setCategoryIdToDelete(null); 
  };

  const handleSaveClick = async (categoryId: string) => {
    if (!editedCategory) return;

    try {
      const response = await fetch(`http://localhost:3001/category/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token':`${session?.accessToken}`
        },
        body: JSON.stringify(editedCategory),
      });

      if (response.ok) {
        const { category: updatedCategory } = await response.json();
        setCategories(categories.map(category =>
          category._id === categoryId ? updatedCategory : category
        ));
        setEditingCategoryId(null);
        setEditedCategory(null); 
        toast.success('Categorysuccesfully updated ');
      } else {
        toast.error('Error due to save changes')
      }
    } catch (error) {
      console.error('Error al enviar los datos a la API:' , error);
    }
  };

  const handleCancelClick = () => {
    setEditingCategoryId(null);
    setEditedCategory(null);
  };
  const toggleCategoryModal = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  };

  const handleCreateCategory = async (categoryData: CategoryData) => {
    const newCategoryData = {
      name: categoryData.categoryName,
      description: categoryData.description,
      imageUrl: categoryData.imageUrl
    };
  
    try {
      const response = await fetch('http://localhost:3001/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': `${session?.accessToken}`,
        },
        body: JSON.stringify(newCategoryData),
      });
  
      if (!response.ok) {
        console.log(response);
        throw new Error('Failed to create category');
      }
  
      const newCategory = await response.json();
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      toast.success('Category created successfully!');
    } catch (error) {
      console.error('Error al crear la categoría:', error);
      toast.error('Error creating category');
    }
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
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <li key={category._id} className="flex border border-gray-200 p-1 rounded-md w-full min-w-full transition-transform transform hover:scale-105 hover:shadow-lg duration-300 hover:rounded-lg hover:cursor-pointer">
              {editingCategoryId === category._id && editedCategory ? (
                <div className="flex flex-col gap-2 w-full p-2">
                  <div className="flex items-center gap-2">
                    <label>Name:</label>
                    <input
                      type="text"
                      value={editedCategory.name}
                      onChange={(e) => handleEditChange(e, 'name')}
                      className="border p-1 focus:outline-none rounded rounded-md p-2"
                    />
                  </div>

                  
                  <div className="flex items-center gap-2">
                    <label>Description:</label>
                    <input
                      type="text"
                      value={editedCategory.description}
                      onChange={(e) => handleEditChange(e, 'description')}
                      className="border p-1 mb-2 focus:outline-none rounded rounded-md"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label>Description:</label>
                    <input
                      type="text"
                      value={editedCategory.description}
                      onChange={(e) => handleEditChange(e, 'description')}
                      className="border p-1 mb-2 focus:outline-none rounded rounded-md"
                    />
                  </div>



                  
                  <button
                    onClick={() => handleSaveClick(category._id)}
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
                 
                  <span>{category.name}</span>
                  <div>
                  <button
                    onClick={() => handleEditClick(category._id)}
                    className=" bg-gray-500 text-white p-1 rounded rounded-md min-w-16"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
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
          <p>Didn't find categories</p>
        )}
      </ul>
      <div className="flex items-center justify-center p-3">
              <button onClick = {toggleCategoryModal} className="p-3 rounded rounded-md bg-green-600 text-white">
                Create a new
              </button>
            </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />

    <CreateCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={toggleCategoryModal}
        onCreateCategory={handleCreateCategory}
      />
    </div>
  );
}
