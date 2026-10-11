// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Recipes } from './pages/Recipes';
import { RecipeDetail } from './pages/RecipeDetail';
import { Favourites } from './pages/Favourties';

export default function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('recipe_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('recipe_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (recipe) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.idMeal === recipe.idMeal);
      if (exists) {
        return prev.filter(f => f.idMeal !== recipe.idMeal);
      } else {
        return [...prev, recipe];
      }
    });
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
        <Navbar favoritesCount={favorites.length} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route path="/recipes/:id" element={<RecipeDetail favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route path="/favourites" element={<Favourites favorites={favorites} toggleFavorite={toggleFavorite} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}