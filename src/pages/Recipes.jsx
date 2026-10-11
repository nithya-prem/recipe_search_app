import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';
import { Search, Heart, Loader2 } from 'lucide-react';

export function Recipes({ favorites, toggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('a');
  
  const { data: recipes, loading, error } = useRecipes(activeQuery);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveQuery(searchQuery);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <form onSubmit={handleSearch} className="flex gap-3 max-w-xl mx-auto mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes (e.g., chicken, pasta)..."
            className="input-field pl-12"
          />
        </div>
        <button type="submit" className="btn-primary">
          Search
        </button>
      </form>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
        </div>
      )}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && recipes.length === 0 && (
        <p className="text-center text-stone-500 py-12">No recipes found. Try another search term!</p>
      )}

      {!loading && !error && recipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => {
            const isFav = favorites.some((f) => f.idMeal === recipe.idMeal);
            return (
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
                      className={`p-2.5 rounded-full border transition-colors cursor-pointer ${
                        isFav ? 'bg-red-50 border-red-200 text-red-500' : 'border-stone-200 text-stone-400 hover:text-red-500 hover:border-red-200'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}