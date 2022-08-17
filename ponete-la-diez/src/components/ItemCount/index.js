/*** 
Componente para incrementar o decrementar la cantidad de productos que  se van a añadir al carrito de compras.
 ***/

import { useState } from "react";
import swal from "sweetalert2";
// hooks
/*import "../../index.css";*/
import "./ItemCount.css";

export default function ItemCount(props) {
    //En useState inicializo el valor de cantProducts
    const [cantProducts, setCantProducts] = useState(props.cantInitial);

    /*
    useEffect(() => {
        props.onUpdateCount(cantProducts);
    }, [cantProducts]);
    */

    function addProduct() {
        if (cantProducts >= props.stock) {
            swal.fire({
                title: "La cantidad de productos seleccionados no puede superar al stock disponible",
                icon: "warning",
                confirmButtonText: "Aceptar",
                imageAlt: "Logo Ponete La Diez",
                confirmButtonColor: "#4c98df",
            });
        } else {
            setCantProducts(cantProducts + 1);
            props.onUpdateCount(cantProducts + 1);
        }
    }

    function sustProduct() {
        if (cantProducts <= 1) {
            //alert("Al menos debe haber un producto disponible");

            swal.fire({
                title: "Al menos debe haber un producto seleccionado",
                icon: "warning",
                confirmButtonText: "Aceptar",
                imageAlt: "Logo Ponete La Diez",
                confirmButtonColor: "#4c98df",
            });
        } else {
            setCantProducts(cantProducts - 1);
            props.onUpdateCount(cantProducts - 1);
        }
    }

    return (
        <div
            key={props.id}
            id={`cantProd${props.id}`}
            className="ItemCountContainer"
        >
            <button onClick={sustProduct} className="Item-Button">
                <p className="Item-p"> - </p>
            </button>
            <p className="Item-cantProd"> {cantProducts}</p>
            <button onClick={addProduct} className="Item-Button">
                <p className="Item-p"> + </p>
            </button>
        </div>
    );
}
