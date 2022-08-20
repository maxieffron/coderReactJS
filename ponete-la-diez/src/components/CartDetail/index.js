/*** 
Componente para acceder al detalle del carrito de compras.
 ***/

import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
//Importamos el "CartContext" para accederlo
import { CartContext } from "../../context/CartContext";
//Importamos el hook "useContext" para poder acceder al contenido
//del "CartContext"
import { useContext, useEffect } from "react";
//Importamos el css de este componente
import "./CartDetail.css";

function CartDetail() {
    /*Con esto puedo tener acceso al parámetro "cart" cuyo valor
    se encuentra en el contexto "CartContext"
    */
    const { cart, removeFromCart, removeAll } = useContext(CartContext);

    const navigateFn = useNavigate();

    //Para validar si hay productos o no en el carrito. En base a eso, habilitamos
    //o deshabilitamos los botones de "Borrar Todo" o "Finalizar Compra"
    useEffect(() => {
        const btClear = document.querySelector(".btnClear");
        const btBuy = document.querySelector(".btnBuy");

        if (cart.length === 0) {
            btClear.disabled = true;
            btBuy.disabled = true;
            btBuy.setAttribute("style", "background-color:#c4c4c4;");
            btClear.setAttribute("style", "background-color:#c4c4c4;");
        } else {
            btClear.disabled = false;
            btBuy.disabled = false;
        }
    });

    const cleanCart = () => {
        swal.fire({
            title: `¿Realmente desea limpiar el carrito de compras?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#5bb669",
            cancelButtonColor: "#4c98df",
            confirmButtonText: "Sí",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                /*Se limpia el carrito*/
                removeAll();
            }
        });
    };

    const endBuy = () => {
        swal.fire({
            title: `¿Realmente desea finalizar la compra?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#4c98df",
            cancelButtonColor: "#5bb669",
            confirmButtonText: "Seguimos comprando",
            cancelButtonText: "Finalizar la compra",
        }).then((result) => {
            if (!result.isConfirmed) {
                swal.fire(
                    {
                        icon: "success",
                        title: "¡¡Muchas gracias por elegirnos!!",
                        showConfirmButton: false,
                        timer: 2000,
                    },
                    setTimeout(() => {
                        /*Se llama a la navegación que nos llevará a la páginal principal del sitio y se limpia el carrito*/
                        removeAll();
                        navigateFn(`/Home`);
                    }, 2000)
                );
            }
        });
    };

    return (
        <div className="CartDetailContainer">
            <div className="detailContainer">
                <div className="itemDetailsHeader">
                    <h4>Nombre</h4>

                    <h4>Cantidad</h4>

                    <h4>Precio</h4>

                    <h4>Total</h4>
                </div>

                {
                    //Si tenemos productos en el carrito...
                    cart.length > 0 &&
                        //Recorremos todo el carrito y vamos agregando todos los productos que tenemos.
                        cart.map((item) => (
                            <div className="itemDetailsContainer">
                                <div className="itemDetails">
                                    <img
                                        className="itemImage"
                                        src={item.imagenAnverso}
                                        alt={item.nombre}
                                    ></img>
                                    <h5 className="name-product">
                                        {item.nombre}
                                    </h5>
                                </div>
                                <div className="itemDetails">
                                    <h5>{item.cantidad}</h5>
                                </div>
                                <div className="itemDetails">
                                    <h5>{`$${parseInt(item.precio).toFixed(
                                        2
                                    )}`}</h5>
                                </div>
                                <div className="itemDetails">
                                    <h5>
                                        {" "}
                                        {`$${parseInt(
                                            item.cantidad * item.precio
                                        ).toFixed(2)}`}
                                    </h5>
                                    <button
                                        onClick={() =>
                                            removeFromCart(item.idProducto)
                                        }
                                        className="buttonDelete"
                                        id={`btnDelete-${item.idProducto}`}
                                    >
                                        Quitar Producto
                                    </button>
                                </div>
                            </div>
                        ))
                }
            </div>

            <div className="OrderSummaryContainer">
                <div className="OrderContainer">
                    <h2>Orden de Compra</h2>
                </div>
                <div className="btnBuyContainer">
                    <button className="btnClear" onClick={cleanCart}>
                        Borrar Todo
                    </button>
                    <button onClick={endBuy} className="btnBuy">
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartDetail;
