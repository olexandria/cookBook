import './App.css';
import NavBar from "./components/nav-bar/nav-bar-component";
import Pages from "./pages/Pages";

const App = () => {
    return (
        <div className="App">
            <NavBar/>
            <Pages/>
        </div>
    );
}

export default App;
