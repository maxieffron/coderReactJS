/*** 
Componente que funciona como contenedor del sitio en donde se van a mostrar los detalles de cada producto seleccionado.
 ***/
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../ProductDetail";
import Products from "../../products_Definition.json";
import "./ProductDetailContainer.css";

export default function ProductDetailContainer() {
    const [prod, setProd] = useState([]);

    const { idProdu } = useParams();

    /*Cada vez que venga por parámetro un id difernte, vamos a realizar una nueva petición que nos devuelva el producto que necesitamos para luego poder llamar al componente y ver su detalle
     */

    useEffect(() => {
        const getDetail = new Promise((resolve) => {
            resolve(Products.productos);
        });
        getDetail.then((productFound) => {
            const dataProd = productFound.find(
                (data) => data.idProducto === Number(idProdu)
            );
            setProd(dataProd);
        });
        getDetail.catch((error) => {
            alert(error);
        });
    }, [idProdu]);

    return (
        <div>
            <h1>Detalle</h1>
            <div className="ProductDetailContainer">
                <ProductDetail key={prod.idProducto} {...prod} />
            </div>
        </div>
    );
}
