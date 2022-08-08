import './nav-bar.style.css'
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const NavBar = () => {
    const [searchField, setSearchField] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate("/searched/" + searchField);
    }

    return (
        <div className="nav-bar-container">
            <Link to="/">
                <div className="header-title-container">
                    <h1 className="header-title">CookBook</h1>
                </div>
            </Link>
            <div className="search-box-container">
                <form className="search-box" onSubmit={submitHandler}>
                    <input
                        className={'search-box'}
                        type='text'
                        placeholder='Search recipe'
                        onChange={(e) => setSearchField(e.target.value)}
                    />
                </form>
            </div>
            <Link to="/recipes/create">
                <div className="button-create-recipe-container">
                    <button className="button-create-recipe">Create Recipe</button>
                </div>
            </Link>
        </div>
    );
}
export default NavBar;
