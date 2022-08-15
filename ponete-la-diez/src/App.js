//import logo from "./logo.svg";
import "./App.css";
//Referenciamos el componente "NavBar"
import NavBar from "./components/NavegationBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import ItemListContainer from "./components/ItemListContainer";
//import ProductDetailContainer from "./components/ProductDetailContainer";
//Importamos las páginas
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Products from "./pages/Products";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
//import ProductDetailFound from "./pages/Details";
import ProductDetailContainer from "./components/ProductDetailContainer";

function App() {
    //Invocamos el componente "NavBar"
    return (
        <BrowserRouter>
            <div className="App">
                <NavBar />

                <Routes>
                    <Route path="/Home" element={<Home />} />
                    <Route path="/AboutUs" element={<AboutUs />} />
                    <Route path="/Products" element={<Products />} />
                    <Route
                        path="/details/:idProdu"
                        element={<ProductDetailContainer />}
                    />
                    <Route path="/Faq" element={<Faq />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/Cart" element={<Cart />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
