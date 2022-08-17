import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartWidget.css";
import CartIcon from "./Cart_Icon.png";

export default function CartWidget(props) {
    const [cantProdCart, setcantProdCart] = useState([0]);

    const navigateToCartDetail = useNavigate();

    function gotoCartDetail() {
        //Esto nos lleva a la pantalla del detalle del carrito
        navigateToCartDetail(`/Cart`);
    }

    return (
        <div id="logoCart" onClick={gotoCartDetail}>
            <p className="cantProductCart">{cantProdCart}</p>
            <img
                className="img-Cart"
                src={CartIcon}
                alt="Carrito de Compras"
            ></img>
        </div>
    );
}
