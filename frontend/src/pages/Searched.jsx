import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import RecipeList from "../components/recipe-list/recipe-list.component";

function Searched() {
    const [recipes, setRecipes] = useState([]);
    let params = useParams();
    let searchField = params.search;

    useEffect(() => {
            fetch('http://127.0.0.1:8000/recipes/')
            .then((response) => response.json())
            .then((recipes) => setRecipes(
                recipes.filter((recipe) => {
                    return recipe.name.toLocaleLowerCase().includes(searchField);
                })))
    }, [searchField])

    return (
        <RecipeList recipes={recipes}/>
    );
}

export default Searched;