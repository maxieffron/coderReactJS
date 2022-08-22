/*** 
Componente para acceder al detalle del carrito de compras.
 ***/

import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
//Importamos el "CartContext" para accederlo
import { CartContext } from "../../context/CartContext";
//Importamos el hook "useContext" para poder acceder al contenido
//del "CartContext"
import { useContext, useEffect, useState } from "react";
//Importamos el css de este componente
import "./CartDetail.css";

function CartDetail() {
    /*Con esto puedo tener acceso al parámetro "cart" cuyo valor
    se encuentra en el contexto "CartContext"
    */
    const { cart, removeFromCart, removeAll, totalProduct, totalPrice } =
        useContext(CartContext);

    //Cantidad de productos
    const [totalItems, settotalItems] = useState(totalProduct);

    //SubTotal de la compra
    const [subTotal, setSubTotal] = useState(0);

    //Total de la compra
    const [totalImport, setTotalImport] = useState(totalPrice);

    //Descuentos
    const [discount, setDiscount] = useState(0);

    const navigateFn = useNavigate();

    //Con esto actualizamos la cantidad total de productos DENTRO DE LA PANTALLA DETALLE
    useEffect(() => {
        settotalItems(totalProduct);
    }, [totalProduct]);

    //Con esto actualizamos el importe total de la compra DENTRO DE LA PANTALLA DETALLE
    useEffect(() => {
        const imp = (totalPrice() / 100) * discount;
        debugger;
        console.log(imp);

        //Subtotal
        setSubTotal(totalPrice);
        //Total
        setTotalImport(totalPrice() - imp);
    }, [totalPrice, discount]);

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

    //Aplicar descuento
    const ApplyDiscount = () => {
        let cupon = document.getElementById("cuponDiscount").value;
        const btDiscount = document.getElementById("btnDiscount");

        debugger;
        cupon = cupon.toUpperCase();
        cupon = cupon.substr(0, 1);

        switch (cupon) {
            case ("A", "C", "D", "E", "F"):
                setDiscount(10);
                break;

            case ("G", "H", "I", "J", "L"):
                setDiscount(15);
                break;

            case ("M", "N", "P", "Q", "R"):
                setDiscount(20);
                break;
            case ("S", "T", "U", "V", "X"):
                setDiscount(5);
                break;
            default:
                swal.fire({
                    title: "Lo siento. Este cupón ya ha expirado.",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2000,
                });
                setDiscount(10);
                break;
        }

        //Una vez que aplicamos el descuento, bloqueamos el botón
        btDiscount.setAttribute("style", "background-color:#c4c4c4;");
        btDiscount.disabled = true;
        //cupon.setAttribute("style", "background-color:#c4c4c4;");
        //cupon.disabled = true;
    };

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
                setDiscount(0);
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
                        navigateFn(`/Products`);
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
                    <div className="titleContainer">
                        <h2>Orden de Compra</h2>
                    </div>
                    <div className="postalCodeContainer">
                        <input
                            type="text"
                            placeholder="Ingrese Código Postal"
                            maxLength={4}
                        ></input>

                        <button>Calcular</button>
                    </div>

                    <div className="DiscountContainer">
                        <input
                            id="cuponDiscount"
                            type="text"
                            placeholder="Cupón de descuento"
                            maxLength={6}
                        ></input>

                        <button id="btnDiscount" onClick={ApplyDiscount}>
                            Aplicar
                        </button>
                    </div>

                    <div className="priceContainer">
                        <div className="prices">
                            <h4>Cantidad de Productos:</h4>
                            <h4>{totalItems}</h4>
                        </div>

                        <div className="prices">
                            <h4>Subtotal:</h4>
                            <h4>{`$${parseInt(subTotal).toLocaleString(
                                "es"
                            )}`}</h4>
                        </div>

                        <div id="percentDiscount" className="prices">
                            <h4>Descuento:</h4>
                            <h4>{`${discount}%`}</h4>
                        </div>

                        <div className="prices">
                            <h3>Total: </h3>
                            <h3>
                                {" "}
                                {`$${parseInt(totalImport).toLocaleString(
                                    "es"
                                )}`}
                            </h3>
                        </div>
                    </div>
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
