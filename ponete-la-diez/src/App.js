//import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar"; //Referenciamos el componente "NavBar"
import ItemListContainer from "./components/ItemListContainer";

function App() {
    //Invocamos el componente "NavBar"
    return (
        <div className="App">
            <NavBar />
            <ItemListContainer greeting={"Ponete La Diez"} />
        </div>
    );
}

export default App;
