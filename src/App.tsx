import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Meal from './components/meals/Meal';
import { Drinks } from './components/drinks/Drinks';
import { Profile } from './components/profile/Profile';
import { DoneRecipes } from './components/done-recipes/Done-recipes';
import { Favorites } from './components/favorite/Favorites';
import ProviderApi from './components/context/provider';

function App() {
  return (
    <ProviderApi>
      <Routes>
        <Route path="/" Component={ Login } />
        <Route path="/profile" Component={ Profile } />
        <Route path="/meals" Component={ Meal } />
        <Route path="/meals/:id-da-receita" Component={ Meal } />
        <Route path="/meals/:id-da-receita/in-progress" Component={ Meal } />
        <Route path="/drinks" Component={ Drinks } />
        <Route path="/drinks/:id-da-receita" Component={ Drinks } />
        <Route path="/drinks/:id-da-receita/in-progress" Component={ Drinks } />
        <Route path="/profile" Component={ Profile } />
        <Route path="/done-recipes" Component={ DoneRecipes } />
        <Route path="/favorite-recipes" Component={ Favorites } />
      </Routes>
    </ProviderApi>
  );
}

export default App;
