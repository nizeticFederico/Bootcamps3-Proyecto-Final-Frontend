// components/UI/Categories.tsx

"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCreate from './CreateEvent';

const CategoryContainer = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/category/all'); // ruta al back
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  return <EventCreate categories={categories} />;
};

export default CategoryContainer;