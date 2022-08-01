import RecipeList from "../components/recipe-list/recipe-list.component";
import {useEffect, useState} from "react";


function Home() {
    const [recipes, setRecipes] = useState([]);
    const [isUpToDate, setIsUpToDate] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/recipes/')
            .then((response) => response.json())
            .then((recipes) => setRecipes(recipes))
        setIsUpToDate(true);
    }, [isUpToDate])

    return (
        <RecipeList setIsUpToDate={setIsUpToDate} recipes={recipes}/>
    );
}

export default Home;