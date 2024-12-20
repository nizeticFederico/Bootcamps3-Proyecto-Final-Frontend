"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface CategoriesProps {
  renderCategory: (category: Category) => JSX.Element;
}

const Categories: React.FC<CategoriesProps> = ({ renderCategory }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://kit-rich-starling.ngrok-free.app/category/all", {
          headers: {
            "ngrok-skip-browser-warning": "1",
          },
        });
        const data = await response.json()
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <option>Loading categories...</option>;
  }

  return <>{categories.map((category) => renderCategory(category))}</>;
};

export default Categories;
