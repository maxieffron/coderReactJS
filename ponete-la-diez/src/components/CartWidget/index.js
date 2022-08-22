//Importamos el hook "useContext" para poder acceder al contenido
//del "CartContext"
import { useState, useEffect, useContext } from "react";
import swal from "sweetalert2";
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
        if (total === 0) {
            swal.fire(
                {
                    title: "Lo siento. Todavía no tenes productos agregados al carrito.",
                    //text: "Ingresando al shopping...",
                    icon: "warning",
                    showConfirmButton: false,
                    timer: 2000,
                },
                setTimeout(() => {
                    //Si no hay productos en el carrito, nos lleva a la pantalla de los productos
                    //y no a la del detalle del carrito.
                    navigateToCartDetail(`/products`);
                }, 2000)
            );
        } else {
            //Esto nos lleva a la pantalla del detalle del carrito
            navigateToCartDetail(`/Cart`);
        }
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
