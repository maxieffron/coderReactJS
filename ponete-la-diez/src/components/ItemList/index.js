/*** 
Componente que contiene la lista de productos. El mismo se compone de:
- Componente Item
- Componente ItemCount
 ***/

import "./ItemList.css";
/*import "../../index.css";*/
import ItemCount from "../ItemCount";
import Item from "../Item";

export default function ItemList(props) {
    return (
        <div className="ItemListContainer">
            {
                /*Se recorren todos los productos que se obtuvieron de leer el JSON, y
            que se encuentran en el array product.
            */
                props.product.map((data) => {
                    return (
                        <div className="dataProduct-container">
                            <Item key={data.idProducto} dataProduct={data} />
                            <ItemCount
                                key={data.idProducto}
                                id={data.idProducto}
                                cantInitial={1}
                                stock={data.stock}
                            />
                        </div>
                    );
                })
            }
        </div>
    );
}
