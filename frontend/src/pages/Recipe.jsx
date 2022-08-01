import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import RecipeDetail from "../components/recipe-detail/recipe-detail.component";

function Recipe() {
    const [details, setDetails] = useState({});
    let params = useParams();

    useEffect( () => {
        fetch(`http://127.0.0.1:8000/recipes/${params.id}/`)
            .then((response) => response.json())
            .then((details) => setDetails(details))
    }, [params.id])

    console.log(details)

    return (
        <RecipeDetail recipe={details}/>
    );
}

export default Recipe;