/*** 
Componente que funciona como "contenedor principal" para todo lo que va a estar dentro
de una página del sitio.
 ***/
import { useState, useEffect } from "react";
import "../../index.css";
import "./ItemListContainer.css";
//import { useState, useEffect } from "react";
import ItemProduct from "../ItemProduct";
import Products from "../../products_Definition.json";

function ItemListContainer(props) {
    const [prod, setProduct] = useState([]);

    useEffect(() => {
        //Acá vamos a hacer correr el fetch para traer todos los productos POR ÚNICA VEZ
        const getProductos = new Promise(() => {
            getProductos.then(
                setTimeout(() => {
                    setProduct(Products.productos);
                }, 2000)
            );
            getProductos.catch(
                console.log("Error al intentar obtener los productos")
            );
        });
    }, []);

    return (
        <div className="ItemListContainer">
            <h1>{props.greeting}</h1>
            {/*<ItemProduct itemProds={1} stock={6} id={1} />*/}

            {/*Pasamos el array de productos que traje del JSON */}
            <ItemProduct product={prod} />
        </div>
    );
}

export default ItemListContainer;
