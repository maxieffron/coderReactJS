/***
Componente para poner los datos de cada producto. Contiene:
- Imágen del producto, descripción, precio y stock
- Botón "Ver Detalle"
***/

import { useNavigate } from "react-router-dom";
import "./Item.css";

function Item(props) {
    const navigateFn = useNavigate();

    const loadDetails = () => {
        //Se llama a la navegación que nos llevará a ver el detalle
        navigateFn(`/details/${props.dataProduct.idProducto}`);
    };

    return (
        //Aquí recorremos el array con la imágen y la info del producto

        <div
            key={props.dataProduct.idProducto}
            id={`prod${props.dataProduct.idProducto}`}
            className="ProductContainer"
        >
            <div className="product-Cont-img">
                <img
                    className="product-img"
                    src={props.dataProduct.imagenAnverso}
                    alt={props.dataProduct.nombre}
                ></img>

                {/*Esta imágen en un futuro utilizará para añair el producto al carrito*/}
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
                <div className="product-detail">
                    {/*<Link to={`/details/${props.dataProduct.idProducto}`}>
                        <button onClick={loadDetails}>
                            <span>Ver Detalle</span>
                        </button>
                    </Link>
                    */}
                    <button onClick={loadDetails}>
                        <span>Ver Detalle</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Item;
