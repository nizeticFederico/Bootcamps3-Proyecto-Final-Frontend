import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Category {
  id: string;
  name: string;
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
        const response = await axios.get('http://localhost:3001/category/all');
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
    return <option>Loading categories...</option>;
  }

  return (
    <>
      {categories.map((category) => renderCategory(category))}
    </>
  );
};

export default Categories;