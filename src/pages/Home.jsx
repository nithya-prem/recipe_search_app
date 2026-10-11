import { Link } from 'react-router-dom';
import { ChefHat, Search } from 'lucide-react';

export function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center">
      <div className="bg-white border border-stone-200 rounded-3xl p-12 shadow-sm max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-amber-100">
          <ChefHat className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-stone-900 mb-4 tracking-tight">Discover & Cook Delicious Recipes</h1>
        <p className="text-stone-600 leading-relaxed mb-8">
          Explore global dishes, search through hundreds of ingredients, and save your personal favorites all in one place.
        </p>
        <Link to="/recipes" className="btn-primary inline-flex">
          <Search className="w-5 h-5" />
          <span>Explore Recipes Now</span>
        </Link>
      </div>
    </div>
  );
}