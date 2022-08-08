import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './create-update-recipe-form.style.scss'
import axios from 'axios';
import {IoClose} from "react-icons/io5";

const CreateUpdateRecipeForm = () => {
    let navigate = useNavigate();
    const {id} = useParams();

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState('')
    const [image, setImage] = useState('');

    const [ingredientName, setIngredientName] = useState('')
    const [ingredientAmount, setIngredientAmount] = useState('')

    const [imageFile, setImageFile] = useState(null)

    const EditRecipeTitle = "Edit Recipe";
    const CreateRecipeTitle = "Create Your Own Recipe";

    const loadRecipe = async () => {
        const {data} = await axios.get(`http://localhost:8000/recipes/${id}/`)

        setImage(data.image);
        setName(data.name);
        setDescription(data.description);
        setSteps(data.steps);
        setIngredients(data.ingredients);
    }

    useEffect(() => {
        if (id !== undefined) {
            loadRecipe()
        }
    }, [])

    const handleAddIngredient = (e, name, amount) => {
        e.preventDefault();

        const newIngredients = ingredients.concat({name, amount});
        setIngredients(newIngredients);
    }

    const handleXClick = (ingredient) => {
        setIngredients(ingredients.filter((x) => x !== ingredient));
    };

    const handleCancel = () => {
        navigate('/');
    };

    const CreateUpdateRecipe = (e) => {
        e.preventDefault();

        let ImageUploadPromise = new Promise((resolve) => {
            if (imageFile) {
                axios.post('http://localhost:8000/images/', {image: imageFile},
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    }).then((response) => {
                        console.log(response);
                        resolve(response.data.image);
                    }
                )
            } else {
                resolve(image);
            }
        })

        ImageUploadPromise.then((response) => {
                let newImageUrl = response;
                if (id !== undefined) {
                    axios.put(`http://localhost:8000/recipes/${id}/`,
                        {name, description, ingredients, steps, image: newImageUrl})
                } else {
                    axios.post(`http://localhost:8000/recipes/`,
                        {name, description, ingredients, steps, image: newImageUrl})
                }
                navigate('/');
            }
        )
    }

    return (
        <form onSubmit={CreateUpdateRecipe}>
            <div className='form-container'>
                <div className='header-title-container'>
                    <h1>{id !== undefined ? EditRecipeTitle : CreateRecipeTitle}</h1>
                </div>
                <div className='form-container'>
                    <div className='field-container'>
                        <label className='label-container'>Title</label>
                        <input
                            type="text"
                            className='form-input'
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className='field-container'>
                        <label className='label-container'>Description</label>
                        <textarea
                            className='bigger-form-input'
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className='ingredient-field-container'>
                        <label className='label-container'>Ingredients</label>
                        <span className="ingredients-list-container">
                            {ingredients.map((ingredient) => (
                                <span
                                    key={ingredient}
                                    className="ingredient-in-list-container"
                                >
                                    <span
                                        className="ingredients-text-in-list-container">{ingredient.name} - {ingredient.amount}
                                    </span>
                                    <IoClose className="close-icon" onClick={() => handleXClick(ingredient)}/>
                                </span>
                            ))}
                        </span>
                        {/*<ul>{ingredients.map((ingredient) => (*/}
                        {/*    <li key={ingredient.id}>{ingredient.name} - {ingredient.amount}</li>))}*/}
                        {/*</ul>*/}
                        <div>
                            <input
                                type="text"
                                className='ingredient-form-input'
                                placeholder="ingredient"
                                name="ingredientName"
                                value={ingredientName}
                                onChange={(e) => setIngredientName(e.target.value)}
                            />
                            <input
                                type="text"
                                className='ingredient-form-input'
                                placeholder="amount"
                                name="ingredientAmount"
                                value={ingredientAmount}
                                onChange={(e) => setIngredientAmount(e.target.value)}
                            />
                            <button className='save-button-style'
                                    onClick={(e) => handleAddIngredient(e, ingredientName, ingredientAmount)}>Add
                            </button>
                        </div>
                    </div>

                    <div className='field-container'>
                        <label className='label-container'>Steps</label>
                        <textarea
                            className='bigger-form-input'
                            name="steps"
                            value={steps}
                            onChange={(e) => setSteps(e.target.value)}
                        />
                    </div>
                    <div className='field-container'>
                        <label className='label-container'>Upload Image</label>
                        <div>
                            <input type="file" id="upload-image" hidden name="imageFile"
                                   onChange={(e) => setImageFile(e.target.files[0])}
                            />
                            <input type="hidden" name="image"
                                   onChange={(e) => setImage(e.target.value)}/>
                            <label className='upload-image-button' htmlFor="upload-image">Choose file</label>
                            <span id="file-chosen">{image != null ? image.split("/").pop() : ''}</span>
                        </div>
                    </div>
                    <div className='button-container'>
                        <button type='submit' onClick={handleCancel} className='cancel-button-style'>Cancel</button>
                        <button type='submit'
                                className='update-button-style'>{id !== undefined ? "Update" : "Save"}</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CreateUpdateRecipeForm;
