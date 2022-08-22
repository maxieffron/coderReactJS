//import logo from "./logo.svg";
import "./App.css";
//Referenciamos el componente "NavBar"
import NavBar from "./components/NavegationBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import ItemListContainer from "./components/ItemListContainer";
//import ProductDetailContainer from "./components/ProductDetailContainer";
//Importamos las páginas
import PrimeraDiv from "./pages/PrimeraDiv";
import Ascenso from "./pages/Ascenso";
import Products from "./pages/Products";
import PremierLeague from "./pages/PremierLeague";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
//import ProductDetailFound from "./pages/Details";
import ProductDetailContainer from "./components/Detail/ProductDetailContainer";
//Importamos el CartContext
import CartCustomContext from "./context/CartContext";

function App() {
    return (
        <CartCustomContext>
            <BrowserRouter>
                <div className="App">
                    <NavBar />

                    <Routes>
                        <Route path="/Products" element={<Products />} />
                        <Route path="/PrimeraDiv" element={<PrimeraDiv />} />
                        <Route path="/Ascenso" element={<Ascenso />} />

                        <Route
                            path="/details/:idProdu"
                            element={<ProductDetailContainer />}
                        />
                        <Route
                            path="/PremierLeague"
                            element={<PremierLeague />}
                        />
                        <Route path="/Contact" element={<Contact />} />
                        <Route path="/Cart" element={<Cart />} />
                    </Routes>

                    <a href="#" className="back-to-top">
                        <i>
                            <img
                                className="arrow-up"
                                src="../images/simple-up.png"
                                alt="Arrow"
                            ></img>
                        </i>
                    </a>
                </div>
            </BrowserRouter>
        </CartCustomContext>
    );
}

export default App;
