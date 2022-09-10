import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    getFirestore,
    collection,
    setDoc,
    updateDoc,
    increment,
    doc,
    serverTimestamp,
} from "firebase/firestore";
//Importamos el archivo ConfigFirebase.js, que contiene toda la configuración de la BD.
import firebaseConfig from "../../config/ConfigFirebase";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { CartContext } from "../../context/CartContext";
import "./Buyer.css";
import Swal from "sweetalert2";

//Componente
const FieldInput = (props) => {
    return (
        <input
            placeholder={`*${props.placeholder}`}
            required
            tabIndex={props.tabIndex}
            type={props.type}
            className="field-input"
            id={props.id}
            onKeyPress={props.keyPress}
        />
    );
};

function BuyerForm() {
    const { cart, removeAll } = useContext(CartContext);

    const [imports, setImports] = useState(0);

    const navigateFn = useNavigate();

    useEffect(() => {
        if (cart.length === 0) {
            /*Esto puede pasar porque le di refresh a la página y se perdieron los 
            productos. Al no tenerlos en el Storage, hay que inicializar los totalizadores
            e inhabilitar el botón "Confirmar"
            */
            const btnConfirm = document.getElementById("btnSubmit");
            const buyerImports = {
                cantProductos: 0,
                subTotal: 0,
                descuento: 0,
                total: 0,
            };
            setImports(buyerImports);
            localStorage.removeItem("buyer");
            btnConfirm.setAttribute("style", "background-color:#c4c4c4;");
            btnConfirm.disabled = true;
        } else {
            //Actualizamos "imports" con lo productos que hay en el carrito.
            setImports(JSON.parse(localStorage.getItem("buyer")));
        }
    }, [cart.length]);

    function valideKeyNumber(event) {
        /*
        Valida que el caracter ingresado SEA UN NÚMERO
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

    function validateKey(event) {
        /*
        Valida que el caracter ingresado NO SEA UN NÚMERO
        */

        const re = new RegExp("^[a-zA-Z]+$");
        // Nos guardamos el código ASCII de la tecla presionada
        const code = event.which ? event.which : event.keyCode;

        if (code === 8 || code === 32) {
            // Si presionamos backspace o space es válido también.
            return true;
        } else if ((code >= 48 && code <= 57) || re.test(code)) {
            // Es un número
            event.preventDefault();
            return false;
        } else {
            // Es otro caracter
            return true;
        }
    }

    function confirmBuy(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const surname = document.getElementById("surname").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const emailConf = document.getElementById("emailConf").value;

        if (!isEmptyFields(name, surname, phone, email, emailConf)) {
            if (!(email === emailConf)) {
                Swal.fire({
                    title: "eMails diferentes",
                    icon: "error",
                    text: "El eMail ingresado debe coincidir con el campo de confirmación de eMail.",
                    showConfirmButton: true,
                });
            } else {
                // TODO OK
                Swal.fire(
                    {
                        title: "Generando orden de compra...",
                        showConfirmButton: false,
                        html: `<div class="progressBar"></div>`,
                    },
                    setTimeout(() => {
                        insertRowOrder(name, surname, phone, email);
                        /*localStorage.clear();
                        removeAll();
                        navigateFn(`/`);*/
                    }, 2000)
                );
            }
        }
    }

    function isEmptyFields(name, surname, phone, email, emailConf) {
        //Campo Nombre
        if (name.length === 0) {
            Swal.fire({
                title: "Campo incompleto",
                icon: "error",
                text: "Es obligatorio ingresar un nombre.",
                showConfirmButton: true,
            });
            return true;
        }

        //Campo Apellido
        if (surname.length === 0) {
            Swal.fire({
                title: "Campo incompleto",
                icon: "error",
                text: "Es obligatorio ingresar un apellido.",
                showConfirmButton: true,
            });
            return true;
        }

        //Campo Teléfono
        if (phone.length === 0) {
            Swal.fire({
                title: "Campo incompleto",
                icon: "error",
                text: "Es obligatorio ingresar un teléfono.",
                showConfirmButton: true,
            });
            return true;
        }

        //Campo eMail
        if (email.length === 0) {
            Swal.fire({
                title: "Campo incompleto",
                icon: "error",
                text: "Es obligatorio ingresar un eMail.",
                showConfirmButton: true,
            });
            return true;
        }

        //Campo Confirmación eMail
        if (emailConf.length === 0) {
            Swal.fire({
                title: "Campo incompleto",
                icon: "error",
                text: "Es obligatorio confirmar eMail ingresado en el campo anterior.",
                showConfirmButton: true,
            });
            return true;
        }

        return false;
    }

    function insertRowOrder(name, surname, phone, email) {
        //Aquí se hace la inserción de la orden de compra en la Base de Datos

        /* 1) Initializamos Firebase creando una instancia de la app, a partir de la 
        configuración que nos da Firebase y que la pusimos en el archivo ConfigFirebase.js*/
        const app = initializeApp(firebaseConfig);

        // 2) Vamos a conectar la app con la Base de Datos
        const db = getFirestore(app);

        // 3) Generamos la orden de compra a insertar en la BD
        const order = createOrder(name, surname, phone, email);
        console.log("Orden: " + order);

        // 4) Creamos una colección
        //const colOrders = collection(db, "orders");
        const colOrders = doc(collection(db, "orders"));

        /* 5) Insertamos la orden en la Base de Datos.
        pasamos por parámetro la colección y la llamada para generar la orden.
        con "setDoc", si el documento no existe, se crea. Si existe, se actualiza.
        */

        const newDoc = async () => {
            await setDoc(colOrders, order)
                .then(() => {
                    /*Aquí debemos actualizar el stock en la BD de Productos.
                    Para ello recorremos todo el carrito. 
                    */
                    for (const dataStock of cart) {
                        const colProducts = doc(
                            db,
                            "products",
                            `${dataStock.id}`
                        );

                        updateDoc(colProducts, {
                            stock: increment(`${-dataStock.cantidad}`),
                        });
                    }

                    Swal.fire(
                        {
                            title: `La orden de compra fue generada correctamente.\n Muchas gracias por elegirnos!!`,
                            imageUrl: "./logo.png",
                            imageWidth: 150,
                            imageHeight: 150,
                            imageAlt: "Ponete La Diez",
                            showConfirmButton: false,
                            time: 6000,
                        },
                        setTimeout(() => {
                            localStorage.clear();
                            removeAll();
                            navigateFn(`/`);
                        }, 2000)
                    );
                })
                .catch((error) => {
                    Swal.fire({
                        title: `Error al generar la orden de compra.`,
                        text: "Por favor, comuníquese con el local para solucionar el inconveniente.",
                        icon: "error",
                        time: 6000,
                    });
                });
        };
        newDoc();
    }

    // 3) Generamos la orden de compra a insertar en la BD
    function createOrder(name, surname, phone, email) {
        /*Recorremos el carrito y creamos el array de productos que luego
          ira a parar a la BD en el campo "items"
        */
        const productsDB = cart.map((itemDB) => ({
            id: itemDB.id,
            title: itemDB.nombre,
            quantity: itemDB.cantidad,
            price: `${parseInt(itemDB.precio).toLocaleString("en")}`,
        }));

        //Creamos la orden
        const rowOrder = {
            buyer: {
                name: name,
                surname: surname,
                phone: parseInt(phone),
                email: email,
            },
            items: productsDB,
            quantityProducts: imports.cantProductos,
            subTotal: `${parseInt(imports.subTotal).toLocaleString("en")}`,
            discount: imports.descuento,
            total: `${parseInt(imports.total).toLocaleString("en")}`,
            date: serverTimestamp(),
        };

        return rowOrder;
    }

    return (
        <div>
            <h1>Orden de compra</h1>
            <h2>Completa tus datos de contacto</h2>
            <div id="buyerFormContainer">
                <form>
                    <div id="formContainer">
                        {/*
                        <label id="orderNumber">
                            <span>Orden de compra Nº: {`80201696`}</span>
                        </label>
                        */}
                        {/*Nombre*/}
                        <FieldInput
                            placeholder={"Nombre"}
                            tabIndex={1}
                            type={"text"}
                            id={"name"}
                            keyPress={(evt) => validateKey(evt)}
                        />

                        {/*Apellido*/}
                        <FieldInput
                            placeholder="Apellido"
                            tabIndex={2}
                            type="text"
                            id={"surname"}
                            keyPress={(evt) => validateKey(evt)}
                        />

                        {/*Teléfono*/}
                        <FieldInput
                            placeholder="Teléfono"
                            tabIndex={3}
                            type="tel"
                            id={"phone"}
                            keyPress={(evt) => valideKeyNumber(evt)}
                        />

                        {/*E-Mail*/}
                        <FieldInput
                            placeholder="e-Mail"
                            tabIndex={4}
                            type="email"
                            id={"email"}
                        />

                        {/*E-Mail*/}
                        <FieldInput
                            placeholder="Confirmar e-Mail"
                            tabIndex={5}
                            type="email"
                            id={"emailConf"}
                        />

                        <div id="orderItemsContainer">
                            <div className="columnItems">
                                <h4>Nombre</h4>
                                <h4>Cantidad</h4>
                                <h4>Precio</h4>
                                <h4>Total</h4>
                            </div>

                            {cart.length > 0 &&
                                //Recorremos todo el carrito y vamos agregando todos los productos que tenemos.
                                cart.map((items) => (
                                    <div className="orderItems">
                                        <h4>{items.nombre}</h4>
                                        <h4>{items.cantidad}</h4>
                                        <h4>
                                            {`$${parseInt(
                                                items.precio
                                            ).toLocaleString("en")}`}
                                        </h4>
                                        <h4>
                                            {`$${parseInt(
                                                items.cantidad * items.precio
                                            ).toLocaleString("en")}`}
                                        </h4>
                                    </div>
                                ))}

                            <div className="totalOrderContainer">
                                <div className="rowTotalOrder">
                                    <div className="totalOrder">
                                        <h4>Cantidad de Productos:</h4>
                                        <h4>{imports.cantProductos}</h4>
                                    </div>
                                    <div className="totalOrder">
                                        <h4>Subtotal:</h4>
                                        <h4>{`$${parseInt(
                                            imports.subTotal
                                        ).toLocaleString("en")}`}</h4>
                                    </div>
                                    <div className="totalOrder">
                                        <h4>Descuento:</h4>
                                        <h4>{`${imports.descuento}%`}</h4>
                                    </div>
                                    <div className="totalOrder">
                                        <h3>Total:</h3>
                                        <h3>{`$${parseInt(
                                            imports.total
                                        ).toLocaleString("en")}`}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            id="btnSubmit"
                            onClick={(evt) => confirmBuy(evt)}
                            tabIndex={5}
                        >
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BuyerForm;
