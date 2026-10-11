import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Loader2, Heart } from 'lucide-react';

export function RecipeDetail({ favorites, toggleFavorite }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => {
        setRecipe(res.data.meals ? res.data.meals[0] : null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-amber-600" /></div>;
  if (!recipe) return <div className="text-center py-20 text-stone-500">Recipe not found.</div>;

  const isFav = favorites.some((f) => f.idMeal === recipe.idMeal);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/recipes" className="inline-flex items-center space-x-1 text-stone-600 hover:text-amber-600 mb-6 font-medium transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Recipes</span>
      </Link>
      <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-80 object-cover" />
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex gap-2 mb-2">
                <span className="badge-category">{recipe.strCategory}</span>
                <span className="badge-area">{recipe.strArea}</span>
              </div>
              <h1 className="text-3xl font-bold text-stone-900">{recipe.strMeal}</h1>
            </div>
            <button 
              onClick={() => toggleFavorite(recipe)}
              className={`p-3 rounded-full border transition-colors cursor-pointer ${
                isFav ? 'bg-red-50 border-red-200 text-red-500' : 'border-stone-200 text-stone-400 hover:text-red-500'
              }`}
            >
              <Heart className={`w-6 h-6 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          <div className="border-t border-stone-100 pt-6">
            <h3 className="font-bold text-xl text-stone-900 mb-4">Instructions</h3>
            <p className="text-stone-700 whitespace-pre-line leading-relaxed bg-stone-50 p-6 rounded-2xl border border-stone-100">{recipe.strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}