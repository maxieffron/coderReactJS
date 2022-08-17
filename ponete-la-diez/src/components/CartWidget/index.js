//Importamos el hook "useContext" para poder acceder al contenido
//del "CartContext"
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
//Importamos el "CartContext" para accederlo
import { CartContext } from "../../context/CartContext";
import "./CartWidget.css";
import CartIcon from "./Cart_Icon.png";

export default function CartWidget(props) {
    /*Con esto puedo tener acceso al parámetro "cart" cuyo valor
    se encuentra en el contexto "CartContext"
    */
    const { totalProduct } = useContext(CartContext);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(totalProduct);
    }, [totalProduct]);

    const navigateToCartDetail = useNavigate();

    function goToCartDetail() {
        //Esto nos lleva a la pantalla del detalle del carrito
        navigateToCartDetail(`/Cart`);
    }

    return (
        <div id="logoCart" onClick={goToCartDetail}>
            <p className="cantProductCart">{total}</p>
            <img
                className="img-Cart"
                src={CartIcon}
                alt="Carrito de Compras"
            ></img>
        </div>
    );
}
