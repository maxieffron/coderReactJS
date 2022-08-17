/*** 
Componente para acceder al detalle del carrito de compras.
 ***/

//Importamos el "CartContext" para accederlo
import { CartContext } from "../../context/CartContext";
//Importamos el hook "useContext" para poder acceder al contenido
//del "CartContext"
import { useContext } from "react";
//Importamos el css de este componente
import "./CartDetail.css";

function CartDetail() {
    /*Con esto puedo tener acceso al parámetro "cart" cuyo valor
    se encuentra en el contexto "CartContext"
    */
    const { cart } = useContext(CartContext);

    return (
        <div className="CartDetailContainer">
            {/*<h2>{cart.nombre}</h2>*/}

            <div className="detailContainer">
                <div className="itemDetails">
                    <h4>Nombre</h4>
                    <h4>Cantidad</h4>
                    <h4>Precio</h4>
                    <h4>Total</h4>
                </div>
                <div className="itemDetails"></div>
                <div className="itemDetails"></div>
                <div className="itemDetails"></div>
            </div>

            <div className="OrderSummaryContainer">
                <div className="OrderContainer"></div>
                <div className="btnBuyContainer">
                    <button className="btnBuy">Comprar</button>
                </div>
            </div>
        </div>
    );
}

export default CartDetail;
