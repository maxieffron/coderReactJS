/*** 
Componente para armar la barra de navegación. La misma se compone de otros componentes:
LinkMenu: Link de cada una de las secciones del sitio.
CartWidget: Logo de la marca.
 ***/

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CartWidget from "../CartWidget";
import { Link } from "react-router-dom";
/*import "../../index.css";*/
import "./NavBar.css";

//Componente
const LinkMenu = (props) => {
    return (
        <Link to={props.href} className="nav-Items">
            {props.itemMenu}
        </Link>
    );
};

function NavBar() {
    return (
        <Navbar id="navegation-Bar" expand="lg">
            <Container id="nav-Container">
                <Navbar.Brand href="#home">
                    <CartWidget />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav-Menu">
                        <LinkMenu href={"/home"} itemMenu={"Inicio"} />
                        <LinkMenu href={"/AboutUs"} itemMenu={"Nosotros"} />
                        <LinkMenu href={"/Products"} itemMenu={"Productos"} />
                        <LinkMenu
                            href={"/Faq"}
                            itemMenu={"Preguntas Frecuentes"}
                        />
                        <LinkMenu href={"/Contact"} itemMenu={"Contacto"} />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
