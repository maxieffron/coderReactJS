/***
Componente para poner los datos de cada producto. Contiene:
- Imágen del producto, descripción, precio y stock
***/

import "./Product.css";
import "../../index.css";

function Product(props) {
    return (
        //Aquí recorremos el array con la imágen y la info del producto

        <div
            id={`prod${props.dataProduct.idProducto}`}
            className="ProductContainer"
        >
            <div className="product-Cont-img">
                <img
                    className="product-img"
                    src={props.dataProduct.imagenAnverso}
                    alt={props.dataProduct.nombre}
                ></img>
                <div className="img-Prod-BuyButton"></div>
            </div>

            <div className="product-description">
                <div className="product-name">
                    <h3>{props.dataProduct.nombre}</h3>
                </div>
                <div className="product-info">
                    <p>Precio:{props.dataProduct.precio}</p>
                    <p>Stock:{props.dataProduct.stock}</p>
                </div>
            </div>
        </div>
    );
}

export default Product;
