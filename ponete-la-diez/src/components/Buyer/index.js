import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    getFirestore,
    collection,
    getDoc,
    setDoc,
    doc,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
//Importamos el archivo ConfigFirebase.js, que contiene toda la configuración de la BD.
import firebaseConfig from "../../config/ConfigFirebase";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { CartContext } from "../../context/CartContext";
import "./BuyerForm.css";
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
        //Nos traemos del localStorage todos los parciales,totales y descuentos
        const imports = JSON.parse(localStorage.getItem("buyer"));
        setImports(imports);
    }, []);

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

    function confirmBuy() {
        const name = document.getElementById("name").value;
        const surname = document.getElementById("surname").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;

        debugger;
        /*insertRowOrder(name, surname, phone, email);
        localStorage.clear();
        removeAll();
        navigateFn(`/`);
        */

        if (!isEmptyFields(name, surname, phone, email)) {
            /*
            Swal.fire(
                {
                    title: "Generando orden de compra...",
                    icon: "success",
                    showConfirmButton: false,
                },
                setTimeout(() => {
                    insertRowOrder(name, surname, phone, email);
                    localStorage.clear();
                    removeAll();
                    navigateFn(`/`);
                }, 2000)
            );
            */
            insertRowOrder(name, surname, phone, email);
            localStorage.clear();
            removeAll();
            navigateFn(`/`);
        }
    }

    function isEmptyFields(name, surname, phone, email) {
        if (
            name.length === 0 ||
            surname.length === 0 ||
            phone.length === 0 ||
            email.length === 0
        ) {
            return true;
        } else {
            return false;
        }
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
                .then(({ id }) => {
                    alert("Se generó una orden con id: ", id);
                })
                .catch((error) => alert(error));
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
                        />

                        {/*Apellido*/}
                        <FieldInput
                            placeholder="Apellido"
                            tabIndex={2}
                            type="text"
                            id={"surname"}
                        />

                        {/*Teléfono*/}
                        <FieldInput
                            placeholder="Teléfono"
                            tabIndex={3}
                            type="tel"
                            id={"phone"}
                            keyPress={(evt) => valideKey(evt)}
                        />

                        {/*E-Mail*/}
                        <FieldInput
                            placeholder="E-Mail"
                            tabIndex={4}
                            type="email"
                            id={"email"}
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
                            onClick={confirmBuy}
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
