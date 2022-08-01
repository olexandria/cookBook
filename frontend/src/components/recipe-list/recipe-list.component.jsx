import RecipeInList from "../recipe-in-list/recipe-in-list.component";
import './recipe-list.style.scss'

const RecipeList = ({setIsUpToDate, recipes}) => {
    return (
        <div className="recipe-list-container">
            {recipes.map((recipe) => {
                return <RecipeInList setIsUpToDate={setIsUpToDate} key={recipe.id} recipe={recipe}/>
            })}
        </div>
    );
}
export default RecipeList;
