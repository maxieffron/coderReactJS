/*** 
Componente que funciona como contenedor del sitio en donde se van a mostrar los detalles de cada producto seleccionado.
 ***/
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../ProductDetail";
import Products from "../../../products_Definition.json";
import "./ProductDetailContainer.css";

/*
Estructura del carrito (Es un objeto con un antributo de id, y el objeto que contiene todos los datos del producto)
{
    key(Id del producto):{
        IdProducto
        nombre
        equipo
        .....
        cant
    }

}
*/

export default function ProductDetailContainer() {
    const [prod, setProd] = useState([]);

    const { idProdu } = useParams();

    /*
    //Para manejar el carrito
    const [shoppingCart, setShoppingCart] = useState({});

   
    function onUpdateCount(cant) {
        const productToAdd = shoppingCart[prod.idProducto];
        if (!productToAdd) {
            //No existe producto
            setShoppingCart({
                ...shoppingCart,
                [prod.idProducto]: { ...prod, cant },
            });
        } else {
            //Existe producto
            setShoppingCart({
                ...shoppingCart,
                [idProdu]: { ...productToAdd, cant },
            });
        }

        console.log("Cantidad onUpdateCount", cant);
    }
    */

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
                <ProductDetail
                    //onUpdateCount={onUpdateCount()}
                    key={prod.idProducto}
                    {...prod}
                />
            </div>
        </div>
    );
}
