import './recipe-in-list.style.scss'
import {Link} from "react-router-dom";
import axios from "axios";
import DialogDeleteRecipe from "../delete-recipe/delete-recipe.component";
import {useState} from "react";


const RecipeInList = ({setIsUpToDate, recipe}) => {
    const {id, name, description, image} = recipe;

    const [dialog, setDialog] = useState({
        isOpen: false,
    });

    const handleDialog = (isOpen) => {
        setDialog({
            isOpen,
        });
    };

    const handleDelete = () => {
        handleDialog(true);
    };

    const areUSureDelete = async (choiceYes) => {
        if (choiceYes) {
            await axios.delete(`http://localhost:8000/recipes/${id}/`)
                .then(response => {
                    console.log(response.data);
                    setIsUpToDate(false);
                })
            handleDialog(false);
        } else {
            handleDialog(false);
        }
    };

    return (
        <div key={id} className="recipe-container">
            <Link to={"/recipes/" + id}>
                <div className="image-container">
                    <img src={image}/>
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
                <button className="button-style" onClick={() => handleDelete()}>Delete</button>
            </div>
            {dialog.isOpen && (
                <DialogDeleteRecipe
                    onDialog={areUSureDelete}
                />
            )}
        </div>
    );
}

export default RecipeInList;