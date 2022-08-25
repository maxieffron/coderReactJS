/*** 
Componente para armar la barra de navegación. La misma se compone de otros componentes:
LinkMenu: Link de cada una de las secciones del sitio.
LogoWidget: Logo de la marca.
 ***/

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LogoWidget from "./LogoWidget";
import CartWidget from "../CartWidget";
import { Link } from "react-router-dom";
/*import "../../index.css";*/
import "./NavegationBar.css";

//Componente
const LinkMenu = (props) => {
    return (
        <Link to={props.href} className="nav-Items">
            {props.itemMenu}
        </Link>
    );
};

function NavegationBar() {
    return (
        <Navbar id="navegation-Bar" expand="lg">
            <Container id="nav-Container">
                <Navbar.Brand href={"/"}>
                    <LogoWidget />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav-Menu">
                        <LinkMenu href={"/"} itemMenu={"Todos"} />
                        <LinkMenu
                            href={"/PrimeraDiv"}
                            itemMenu={"Primera División"}
                        />
                        <LinkMenu href={"/Ascenso"} itemMenu={"Ascenso"} />

                        <LinkMenu
                            href={"/PremierLeague"}
                            itemMenu={"Premier League"}
                        />
                        <LinkMenu href={"/Contact"} itemMenu={"Contacto"} />
                    </Nav>
                </Navbar.Collapse>
                <CartWidget />
            </Container>
        </Navbar>
    );
}

export default NavegationBar;
