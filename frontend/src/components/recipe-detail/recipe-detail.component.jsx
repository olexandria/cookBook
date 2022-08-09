import './recipe-detail.style.css'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import DialogDeleteRecipe from "../delete-recipe/delete-recipe.component";

const RecipeDetail = ({recipe}) => {
    const {id, name, description, ingredients, steps, image} = recipe;
    let navigate = useNavigate();

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
                    navigate('/');
                })
            handleDialog(false);
        } else {
            handleDialog(false);
        }
    };

    return (
        <div key={id} className="recipe-detail-container">
            <div className="image-detail-container">
                <img src={image} className="image1"/>
                <div className="buttons-detail-container">
                    <Link to={`/recipes/${id}/update`}>
                        <button className="button-detail-style">Edit</button>
                    </Link>
                    <button className="button-detail-style" onClick={() => handleDelete()}>Delete</button>
                </div>
            </div>
            <div className="text-detail-container">
                <h1>{name}</h1>
                <h3 className="recipe-detail-description">{description}</h3>
                {ingredients && (<div className="ingredients-detail-container">
                    <h4>Ingredients:</h4>
                    <ul style={{listStyleType: 'circle'}}>
                        {ingredients.map((ingredient) => (
                            <li key={ingredient.name}> {ingredient.name} — {ingredient.amount}</li>
                        ))}
                    </ul>
                </div>)}
                {steps && (<div>
                    <h4>Steps:</h4>
                    <div>
                        {steps.split('.').map(paragraph =>
                            <p>{paragraph.split('.').reduce((total, line) => [total, <br/>, line])}</p>
                        )}
                    </div>
                </div>)}
            </div>
            {dialog.isOpen && (
                <DialogDeleteRecipe
                    onDialog={areUSureDelete}
                />
            )}
        </div>
    );
}

export default RecipeDetail;