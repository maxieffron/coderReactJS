import { useState, useEffect } from "react";
import { useNavigate, input } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { CartContext } from "../../context/CartContext";
import "./BuyerForm.css";

//Componente
const FieldInput = (props) => {
    return (
        <input
            placeholder={`*${props.placeholder}`}
            required
            tabIndex={props.tabIndex}
            type={props.type}
            className="field-input"
        />
    );
};

function BuyerForm() {
    const { cart } = CartContext;

    const [imports, setImports] = useState(0);

    const navigateFn = useNavigate();

    useEffect(() => {
        //Nos traemos del localStorage todos los parciales,totales y descuentos
        const imports = JSON.parse(localStorage.getItem("buyer"));
        setImports(imports);
    }, []);

    return (
        <div>
            <h1>Orden de compra</h1>
            <h2>Completa tus datos de contacto</h2>
            <div id="buyerFormContainer">
                <form>
                    <div id="formContainer">
                        <label id="orderNumber">
                            <span>Orden de compra Nº: {`80201696`}</span>
                        </label>
                        {/*Nombre*/}
                        <FieldInput
                            placeholder={"Nombre"}
                            tabIndex={1}
                            type={"text"}
                            id="name"
                        />

                        {/*Apellido*/}
                        <FieldInput
                            placeholder="Apellido"
                            tabIndex={2}
                            type="text"
                            id="surname"
                        />

                        {/*Teléfono*/}
                        <FieldInput
                            placeholder="Teléfono"
                            tabIndex={3}
                            type="text"
                            id="phone"
                        />

                        {/*E-Mail*/}
                        <FieldInput
                            placeholder="E-Mail"
                            tabIndex={4}
                            type="email"
                            id="email"
                        />

                        <div id="orderItemsContainer">
                            <div className="columnItems">
                                <h4>Nombre</h4>
                                <h4>Cantidad</h4>
                                <h4>Precio</h4>
                                <h4>Total</h4>
                            </div>

                            {/*cart.length > 0 &&
                                cart.map((items) => (
                                    <div className="orderItems">
                                        <h4>{items.nombre}</h4>
                                        <h4>{items.cantidad}</h4>
                                        <h4>
                                            {`$${parseInt(
                                            item.cantidad * items.precio
                                        ).toLocaleString("en")}`}
                                        </h4>
                                        <h4>
                                           {`$${parseInt(
                                            item.cantidad * itema.total
                                        ).toLocaleString("en")}`}
                                        </h4>
                                    </div>
                                            ))*/}

                            <div className="totalOrderContainer">
                                <div className="rowTotalOrder">
                                    <h4>Cantidad de Productos:</h4>
                                    <h4>Subtotal:</h4>
                                    <h4>Descuento:</h4>
                                    <h3>Total:</h3>
                                </div>

                                <div className="totalOrder">
                                    <h4>{imports.cantProductos}</h4>
                                    <h4>{`$${imports.subTotal}`}</h4>
                                    <h4>{`${imports.descuento}%`}</h4>
                                    <h3>{`$${imports.total}`}</h3>
                                </div>
                            </div>
                        </div>
                        <button id="btnSubmit" type="submit" tabIndex={5}>
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BuyerForm;
