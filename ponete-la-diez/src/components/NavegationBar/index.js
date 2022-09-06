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
    function ItemActive() {
        //Guardamos el elemento actual que tiene la clase "active"
        let elementActive = document.querySelector(".activo");
        //Guardamos el link sobre el que hicimos "click"
        const linkSelected = document.getElementById(props.id);

        if (!(linkSelected.id === elementActive.id)) {
            document.querySelectorAll(".nav-Items").forEach((element) => {
                document.querySelector(".navbar-toggler").click();

                /*
                if (!elementActive === element.classList.contains("activo")) {
                    //Si son diferentes, removemos la clase "active" de item anterior y lo asignamos
                    //al elemento actual.
                    elementActive.classList.remove("activo");
                    element.classList.add("activo");
                }
                */
                if (
                    !(
                        linkSelected.id ===
                        element.classList.contains("activo").id
                    )
                ) {
                    //Si son diferentes, removemos la clase "active" de item anterior y lo
                    element.classList.remove("activo");
                }
            });
            linkSelected.classList.add("activo");
        }
    }

    return (
        <Link
            to={props.href}
            className={`nav-Items ${props.stateLink}`}
            id={props.id}
            key={props.key}
            onClick={ItemActive}
        >
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
                <Navbar.Toggle
                    className="navbar-toggler"
                    aria-controls="basic-navbar-nav"
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav-Menu">
                        <LinkMenu
                            href={"/"}
                            itemMenu={"Todos"}
                            stateLink={"activo"}
                            id={"todos"}
                            key={"todos"}
                        />
                        <LinkMenu
                            href={"/PrimeraDiv"}
                            itemMenu={"Primera División"}
                            stateLink={""}
                            id={"primDiv"}
                            key={"primDiv"}
                        />
                        <LinkMenu
                            href={"/Ascenso"}
                            itemMenu={"Ascenso"}
                            stateLink={""}
                            id={"ascenso"}
                            key={"ascenso"}
                        />

                        <LinkMenu
                            href={"/PremierLeague"}
                            itemMenu={"Premier League"}
                            stateLink={""}
                            id={"premier"}
                            key={"premier"}
                        />
                    </Nav>
                </Navbar.Collapse>
                <CartWidget />
            </Container>
        </Navbar>
    );
}

export default NavegationBar;
