import './recipe-detail.style.css'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const RecipeDetail = ({recipe}) => {
    const {id, name, description, ingredients, steps, image} = recipe;
    let navigate = useNavigate();

    const deleteRecipe = async (id) => {
        await axios.delete(`http://localhost:8000/recipes/${id}`)
            .then(response => {
                console.log(response.data);
                navigate('/');
            })
    };

    return (
        <div key={id} className="recipe-detail-container">
            <div className="image-detail-container">
                <img src={image} className="image1"></img>
                <div className="buttons-detail-container">
                    <Link to={`/recipes/${id}/update`}>
                        <button className="button-detail-style">Edit</button>
                    </Link>
                    <button className="button-detail-style" onClick={() => deleteRecipe(id)}>Delete</button>
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
        </div>
    );
}

export default RecipeDetail;