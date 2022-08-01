import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './update-recipe-form.style.scss'
import axios from 'axios';

const UpdateRecipeForm = () => {
    let navigate = useNavigate();
    const {id} = useParams();

    const [image, setImage] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [ingredientName, setIngredientName] = useState('')
    const [ingredientAmount, setIngredientAmount] = useState('')
    const [steps, setSteps] = useState('')

    const loadRecipe = async () => {
        const {data} = await axios.get(`http://localhost:8000/recipes/${id}/`)
        console.log(data)

        setImage(data.image);
        setName(data.name);
        setDescription(data.description);
        setSteps(data.steps);
        setIngredientName(data.ingredients[0].name);
        setIngredientAmount(data.ingredients[0].amount);
    }

    useEffect(() => {
        loadRecipe()
    }, [])

    const handleCancel = () => {
        navigate('/');
    };

    const UpdateRecipe = (e) => {
        e.preventDefault();
        const obj = {name: ingredientName, amount: ingredientAmount};

        axios.put(
            `http://localhost:8000/recipes/${id}/`,
            {name, description, ingredients: [obj], steps, image},
        )
            .then(response => {
                console.log(response.data);
                navigate('/');
            })
    }

    return (
        <form onSubmit={UpdateRecipe}>
            <div className='form-container'>
                <div className='header-title-container'>
                    <h1>Update Recipe</h1>
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
                        <input
                            type="text"
                            className='bigger-form-input'
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className='ingredient-field-container'>
                        <label className='label-container'>Ingredients</label>
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
                        </div>
                    </div>

                    <div className='field-container'>
                        <label className='label-container'>Steps</label>
                        <input
                            type="text"
                            className='bigger-form-input'
                            name="steps"
                            value={steps}
                            onChange={(e) => setSteps(e.target.value)}
                        />
                    </div>
                    <div className='field-container'>
                        <label className='label-container'>Upload Image</label>
                        <div>
                            <input type="file" id="upload-image" hidden name="image"
                                   onChange={(e) => setImage(e.target.files[0])}
                            />
                            <label className='upload-image-button' htmlFor="upload-image">Choose file</label>
                            <span id="file-chosen">No file chosen</span>
                        </div>
                    </div>
                    <div className='button-container'>
                        <button type='submit' onClick={handleCancel} className='cancel-button-style'>Cancel</button>
                        <button type='submit' className='update-button-style'>Update</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default UpdateRecipeForm;
