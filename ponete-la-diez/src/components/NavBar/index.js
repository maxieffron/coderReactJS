/*** 
Componente para armar la barra de navegación. La misma se compone de otros componentes:
LinkMenu: Link de cada una de las secciones del sitio.
CartWidget: Logo de la marca.
 ***/

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CartWidget from "../CartWidget";
import "../../index.css";
import "./NavBar.css";

//Componente
const LinkMenu = (props) => {
    return (
        <a href={props.href} className="nav-Items">
            {props.itemMenu}
        </a>
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
                        <LinkMenu href={"#home"} itemMenu={"Inicio"} />
                        <LinkMenu href={"#link"} itemMenu={"Nosotros"} />
                        <LinkMenu href={"#link"} itemMenu={"Productos"} />
                        <LinkMenu
                            href={"#link"}
                            itemMenu={"Preguntas Frecuentes"}
                        />
                        <LinkMenu href={"#link"} itemMenu={"Contacto"} />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
