
import { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';
function App() {

  const [recipes, setrecipes] = useState([]);
  const [search, setsearch] = useState('')
  const [query, setquery] = useState('chicken')

  useEffect( () => {
   getrecipies();
  },[query]);
    

  const getrecipies = async() =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=57138b3e&app_key=f1727c97b4ea4f9b9463ba481c42dd98`)
    const data = await response.json();
    setrecipes(data.hits);
   
    
  };

  const updateSearch = (e) =>{
    setsearch(e.target.value)
    console.log(search)
  }

  const getSearch =(e) => {
    e.preventDefault();
    setquery(search)
    setsearch('');
  }

  return (
    <div className="App">
      
      <form onSubmit={getSearch} className='search-form'>
        <input  placeholder='Search For Recipe' type="text" className='search-bar'value={search} onChange={updateSearch}/>
        <button type='submit' className='search-button'>Search</button>
      </form>
     <div className='recipees'>
     { recipes.map(recipe=>(
      <Recipe title={recipe.recipe.label} calories={recipe.recipe.calories}
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}
      />
     ))}
     </div>
    </div>
  );
}

export default App;
