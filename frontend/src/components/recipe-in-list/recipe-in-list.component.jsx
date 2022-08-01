import './recipe-in-list.style.scss'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


const RecipeInList = ({setIsUpToDate, recipe}) => {
    const {id, name, description, image} = recipe;
    let navigate = useNavigate();

    const deleteRecipe = async (id) => {
        await axios.delete(`http://localhost:8000/recipes/${id}/`)
            .then(response => {
                console.log(response.data);
                navigate('/');
                setIsUpToDate(false);
            })
    };

    return (
        <div key={id} className="recipe-container">
            <Link to={"/recipes/" + id}>
                <div className="image-container">
                    <img src={image}></img>
                </div>
                <div className="text-container">
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
            </Link>
            <div className="buttons-container">
                <Link to={`/recipes/${id}/update`}>
                    <button className="button-style">Edit</button>
                </Link>
                <button className="button-style" onClick={() => deleteRecipe(id)}>Delete</button>
            </div>
        </div>
    );
}

export default RecipeInList;