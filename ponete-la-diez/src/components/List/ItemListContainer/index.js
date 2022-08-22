/*** 
Componente que funciona como "contenedor principal" para todo lo que va a estar dentro
de una página del sitio.
 ***/
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
/*import "../../index.css";*/
import "./ItemListContainer.css";
import ItemList from "../ItemList";
import Products from "../../../products_Definition.json";

function ItemListContainer(props) {
    const [prod, setProduct] = useState([]);
    //const [loadingProd, setLoadingProd] = useState(true);

    useEffect(() => {
        //Acá vamos a crear una promesa para traer todos los productos POR ÚNICA VEZ
        const getProductos = new Promise(() => {});
        getProductos.then(
            Swal.fire({
                title: "Bienvenido/a!!",
                text: "Ingresando al shopping...",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
            }),
            setTimeout(() => {
                setProduct(Products.productos);
            }, 2000)
        );
        getProductos.catch(
            console.log("Error al intentar obtener los productos")
        );

        /*
        getProductos.finally(
            //Con esto indicamos que la apertura del e-commerce ya está hecha.
            setLoadingProd(false)
        );
        */
    }, []);

    return (
        <div className="ItemListContainer">
            <h1>{props.greeting}</h1>

            {/*Pasamos el array de productos que traje del JSON*/}
            <ItemList category={props.category} product={prod} />
        </div>
    );
}

export default ItemListContainer;
