// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';
import { Utensils, Heart } from 'lucide-react';

export function Navbar({ favoritesCount }) {
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg font-medium transition-colors ${
      isActive 
        ? 'bg-amber-600 text-white' 
        : 'text-stone-700 hover:bg-amber-100'
    }`;

  return (
    <nav className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-amber-700 font-bold text-xl">
          <Utensils className="w-6 h-6" />
          <span>FlavorCraft</span>
        </div>
        <div className="flex space-x-4 items-center">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/recipes" className={linkClass}>Recipes</NavLink>
          <NavLink to="/favourites" className={`${linkClass} flex items-center space-x-1`}>
            <Heart className="w-4 h-4 fill-current" />
            <span>Favourites ({favoritesCount})</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}