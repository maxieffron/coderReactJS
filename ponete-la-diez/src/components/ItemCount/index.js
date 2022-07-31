/*** 
Componente para incrementar o decrementar la cantidad de productos que  se van a añadir al carrito de compras.
 ***/

import { useState, useEffect } from "react";
// hooks
import "../../index.css";
import "./ItemCount.css";

export default function ItemCount() {
    const [cantProducts, setCantProducts] = useState(0);

    useEffect(() => {
        console.log("%c    Renderizado Siempre", "color: #38761d");
        return () => {
            console.log("Contador listo para ser cleanup!");
        };
    });

    useEffect(() => {
        console.log("%c    >>>>> Renderizado cantProducts", "color: #00761d");
        return () => {
            console.log("Contador listo para ser cleanup!");
        };
    }, [cantProducts]);

    function addProduct() {
        setCantProducts(cantProducts + 1);
    }

    function susProduct() {
        if (cantProducts <= 1) {
            alert("Al menos debe haber un producto disponible");
        } else {
            setCantProducts(cantProducts - 1);
        }
    }

    return (
        <div className="ItemCountContainer">
            <button onClick={susProduct} className="Item-Button">
                <p className="Item-p"> - </p>
            </button>
            <p className="Item-cantProd"> {cantProducts}</p>
            <button onClick={addProduct} className="Item-Button">
                <p className="Item-p"> + </p>
            </button>
        </div>
    );
}
