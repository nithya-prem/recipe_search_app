import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export function Favourites({ favorites, toggleFavorite }) {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-24 max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-stone-800">No Favourites Saved Yet</h2>
        <p className="text-stone-500 mt-2 mb-6">Explore recipes and save your favorites to view them anytime here.</p>
        <Link to="/recipes" className="btn-primary inline-flex">Browse Recipes</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-stone-900 mb-6">Your Saved Favourites ({favorites.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {favorites.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="badge-category mb-2">{recipe.strCategory || 'General'}</span>
                <h3 className="font-bold text-lg text-stone-800 line-clamp-1">{recipe.strMeal}</h3>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
                <Link to={`/recipes/${recipe.idMeal}`} className="text-amber-600 font-semibold hover:text-amber-700 text-sm">
                  View Recipe →
                </Link>
                <button 
                  onClick={() => toggleFavorite(recipe)}
                  className="p-2.5 rounded-full border bg-red-50 border-red-200 text-red-500 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}