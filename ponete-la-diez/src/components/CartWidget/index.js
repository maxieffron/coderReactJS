/*** 
Componente que contiene el logo de la marca para insertarlo en el navBar.
 ***/

import "./CartWidget.css";
import logo from "./logo.png";

function CartWidget() {
    return <img src={logo} className="nav-Logo" alt="logo"></img>;
}

export default CartWidget;
