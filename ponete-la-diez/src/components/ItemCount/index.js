/*** 
Componente para incrementar o decrementar la cantidad de productos que  se van a añadir al carrito de compras.
 ***/

import { useState, useEffect } from "react";
// hooks
import "../../index.css";
import "./ItemCount.css";

export default function ItemCount(props) {
    //En useState inicializo el valor de cantProducts
    const [cantProducts, setCantProducts] = useState(props.cantInitial);

    /*
    useEffect(() => {
        console.log("%c    >>>>> Renderizado cantProducts", "color: #00761d");
        return () => {
            //console.log("Contador listo para ser cleanup!");
        };
    }, [cantProducts]);
    */

    function addProduct() {
        if (cantProducts >= props.stock) {
            alert(
                "La cantidad de productos seleccionados no puede superar al stock disponible."
            );
        } else {
            setCantProducts(cantProducts + 1);
        }
    }

    function sustProduct() {
        if (cantProducts <= 1) {
            alert("Al menos debe haber un producto disponible");
        } else {
            setCantProducts(cantProducts - 1);
        }
    }

    return (
        <div id={`cantProd${props.id}`} className="ItemCountContainer">
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
