/*** 
Componente que contiene el producto. El mismo se compone de:
- Imágen del producto, descripción, precio y stock
- Componente ItemCount
- Botón para añadir el producto al carrito de compras
 ***/

import "./ItemProduct.css";
import "../../index.css";
import ItemCount from "../ItemCount";
import image from "./Atlanta - Frente.png";

export default function ItemProduct(props) {
    const Product = () => {
        return (
            //Aquí recorremos el array con la imágen y la info del producto

            <div id={`prod${props.id}`} className="ProductContainer">
                <div className="product-Cont-img">
                    <img
                        className="product-img"
                        src={image}
                        alt="Atlanta"
                    ></img>
                    <div class="img-Prod-BuyButton"></div>
                </div>

                <div className="product-description">
                    <div className="product-name">
                        <h3>Atlanta Suplente</h3>
                    </div>
                    <div className="product-info">
                        <p>Precio:$3000</p>
                        <p>Stock:{props.stock}</p>
                    </div>
                </div>
            </div>

            /*
            <div id={`prod${props.itemProds.id}`} className="ProductContainer">
                <img
                    className="product-img"
                    src={props.itemProds.imagenAnverso}
                    alt={props.itemProds.nombre}
                ></img>
                <div className="product-description">
                    <div className="product-name">
                        <h3>{props.itemProds.nombre}</h3>
                    </div>
                    <div className="product-info">
                        <p>{`$${props.itemProds.precio}`}</p>
                        <p>{`Stock:${props.itemProds.stock}`}</p>
                    </div>
                </div>
            </div>
            */
        );
    };

    return (
        <div className="ItemProductContainer">
            <Product id={props.itemProds.id} />
            <ItemCount
                id={props.itemProds.id}
                cantInitial={1}
                stock={props.stock}
            />
        </div>
    );
}
