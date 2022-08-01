import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import Searched from "./Searched";
import Recipe from "./Recipe";
import CreateRecipe from "./CreateRecipe";
import UpdateRecipe from "./UpdateRecipe";

function Pages() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/searched/:search' element={<Searched/>}/>
            <Route path='/recipes/:id' element={<Recipe/>}/>
            <Route path='/create_recipe' element={<CreateRecipe/>}/>
            <Route path='/recipes/:id/update' element={<UpdateRecipe/>}/>
        </Routes>
    );
}

export default Pages;