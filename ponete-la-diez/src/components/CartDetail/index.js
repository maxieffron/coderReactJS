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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../config/ConfigFirebase";
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
        const btDiscount = document.getElementById("btnDiscount");

        if (cart.length === 0) {
            btClear.disabled = true;
            btBuy.disabled = true;
            btBuy.setAttribute("style", "background-color:#c4c4c4;");
            btClear.setAttribute("style", "background-color:#c4c4c4;");
            //Una vez que aplicamos el descuento, bloqueamos el botón
            btDiscount.setAttribute("style", "background-color:#c4c4c4;");
            btDiscount.disabled = true;
        } else {
            btClear.disabled = false;
            btBuy.disabled = false;
        }
    });

    function valideKey(event) {
        /*
    Función para validar si la tecla presionada es un número
    */
        // Nos guardamos el código ASCII de la tecla presionada
        const code = event.which ? event.which : event.keyCode;

        if (code === 8) {
            // Si presionamos backspace es válido también.
            return true;
        } else if ((code >= 48 && code <= 57) || !code === 32) {
            // Es un número
            return true;
        } else {
            // Es otro caracter
            event.preventDefault();
            return false;
        }
    }

    //Aplicar descuento
    const ApplyDiscount = () => {
        let cupon = document.getElementById("cuponDiscount").value;
        //const btDiscount = document.getElementById("btnDiscount");

        if (cupon.length < 6) {
            swal.fire({
                title: "El código ingresado no es válido.",
                text: "El cupón a ingresar debe contar con 6 caracteres.",
                icon: "error",
                showConfirmButton: true,
            });
        } else {
            cupon = cupon.toUpperCase();
            cupon = cupon.substr(0, 1);

            switch (cupon) {
                case "A":
                case "C":
                case "D":
                case "E":
                case "F":
                    setDiscount(10);
                    break;

                case "G":
                case "H":
                case "I":
                case "J":
                case "L":
                    setDiscount(15);
                    break;

                case "M":
                case "N":
                case "P":
                case "Q":
                case "R":
                    setDiscount(20);
                    break;
                case "S":
                case "T":
                case "U":
                case "V":
                case "X":
                    setDiscount(5);
                    break;
                default:
                    swal.fire({
                        title: "Lo siento. Este cupón ya ha expirado.",
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    setDiscount(0);
                    break;
            }

            /*
            //Una vez que aplicamos el descuento, bloqueamos el botón
            btDiscount.setAttribute("style", "background-color:#c4c4c4;");
            btDiscount.disabled = true;
            */
        }
    };

    function ValidateInputCupon(event) {
        /*let cupon = document.getElementById("cuponDiscount").value;
        let cuponInput = document.getElementById("cuponDiscount");
        const re = new RegExp("^[a-zA-Z]+$");

        cupon = cupon.toUpperCase();
        console.log(cupon);
        if (re.test(cupon)) {
        } else {
            cupon = cupon.substr(0, cupon.length - 1);
            console.log(cupon);
            cuponInput.value = cupon;
        }*/

        /*
    Función para validar si la tecla presionada es un número
    */

        const re = new RegExp("^[a-zA-Z]+$");
        // Nos guardamos el código ASCII de la tecla presionada
        const code = event.which ? event.which : event.keyCode;

        if (code === 8) {
            // Si presionamos backspace es válido también.
            return true;
        } else if (
            (code >= 48 && code <= 57) ||
            (code === 32) & !re.test(code)
        ) {
            // Es un número
            event.preventDefault();
            return false;
        } else {
            // Es otro caracter
            return true;
        }
    }

    const cleanCart = () => {
        swal.fire({
            title: `¿Realmente queres limpiar el carrito de compras?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#5bb669",
            cancelButtonColor: "#4c98df",
            confirmButtonText: "Sí",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                /*Se limpia el carrito*/
                removeAll();
                setDiscount(0);
            }
        });
    };

    const endBuy = () => {
        swal.fire({
            title: `¿Realmente queres finalizar la compra?`,
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
                        title: "Ya falta poquito para que los productos sean tuyos",
                        showConfirmButton: false,
                        timer: 2000,
                    },
                    setTimeout(() => {
                        const buyerImports = JSON.stringify({
                            cantProductos: totalItems,
                            subTotal: subTotal,
                            descuento: discount,
                            total: totalImport,
                        });
                        localStorage.setItem("buyer", buyerImports);

                        /*Se llama a la navegación que nos llevará a completar el formulario de compra*/
                        navigateFn(`/OrderBuyer`);
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
                                    <h5>{`$${parseInt(
                                        item.precio
                                    ).toLocaleString("en")}`}</h5>
                                </div>
                                <div className="itemDetails">
                                    <h5>
                                        {`$${parseInt(
                                            item.cantidad * item.precio
                                        ).toLocaleString("en")}`}
                                    </h5>

                                    <FontAwesomeIcon
                                        onClick={() => removeFromCart(item.id)}
                                        className="icon-trash"
                                        icon={faTrash}
                                    />
                                    {/*
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="buttonDelete"
                                        id={`btnDelete-${item.id}`}
                                    >
                                        <FontAwesomeIcon
                                            className="icon-trash"
                                            icon={faTrash}
                                        />
                                    </button>
                                        */}
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
                            tabIndex="1"
                            type="tel"
                            placeholder="Ingrese Código Postal"
                            maxLength={4}
                            onKeyPress={(evt) => valideKey(evt)}
                        ></input>

                        <button tabIndex="2">Calcular</button>
                    </div>

                    <div className="DiscountContainer">
                        <input
                            tabIndex="3"
                            id="cuponDiscount"
                            name="cupon"
                            type="text"
                            placeholder="Cupón de descuento"
                            maxLength={6}
                            title={
                                "El cupón a ingresar debe contar con 6 caracteres"
                            }
                            onKeyPress={(evt) => {
                                ValidateInputCupon(evt);
                            }}
                        ></input>

                        <button
                            tabIndex="4"
                            id="btnDiscount"
                            onClick={ApplyDiscount}
                        >
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
                                "en"
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
                                    "en"
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
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartDetail;
