/*** 
Componente que contiene el producto. El mismo se compone de:
- Imágen del producto, descripción, precio y stock
- Componente ItemCount
- Botón para añadir el producto al carrito de compras
 ***/

import "./ItemProduct.css";
import "../../index.css";
import ItemCount from "../ItemCount";

export default function ItemProduct(props) {
    const Product = () => {
        return <div className="ProductContainer"></div>;
    };

    return (
        <div className="ItemProductContainer">
            <Product id={`prod${props.id}`} />
            <ItemCount id={`cantProd${props.id}`} cantInitial={1} />
        </div>
    );
}
