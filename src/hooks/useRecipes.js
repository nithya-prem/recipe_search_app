// src/hooks/useRecipes.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useRecipes(query = '') {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If no query, fetch default recipes or clear
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = query 
          ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
          : `https://www.themealdb.com/api/json/v1/1/search.php?s=a`; // Default list
        
        const response = await axios.get(url);
        setData(response.data.meals || []);
      } catch (err) {
        setError('Failed to fetch recipes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [query]);

  return { data, loading, error };
}