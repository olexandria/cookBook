import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import Searched from "./Searched";
import Recipe from "./Recipe";
import CreateUpdateRecipe from "./CreateUpdateRecipe";

function Pages() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/searched/:search' element={<Searched/>}/>
            <Route path='/recipes/:id' element={<Recipe/>}/>
            <Route path='/recipes/create' element={<CreateUpdateRecipe/>}/>
            <Route path='/recipes/:id/update' element={<CreateUpdateRecipe/>}/>
        </Routes>
    );
}

export default Pages;