/*** 
Componente que contiene el logo de la marca para insertarlo en el navBar.
 ***/

import "./LogoWidget.css";
import logo from "./logo.png";

function LogoWidget() {
    return <img src={logo} className="nav-Logo" alt="logo"></img>;
}

export default LogoWidget;
