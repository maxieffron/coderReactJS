import { useState } from "react";
import "./CartWidget.css";
import Cart from "./Cart_Icon.png";

export default function CartWidget(props) {
    const [cantProdCart, setcantProdCart] = useState([0]);

    return (
        <div>
            <p className="cantProductCart">{cantProdCart}</p>
            <img className="img-Cart" src={Cart} alt="Carrito de Compras"></img>
        </div>
    );
}
