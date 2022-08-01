/*** 
Componente que funciona como "contenedor principal" para todo lo que va a estar dentro
de una página del sitio.
 ***/
import "../../index.css";
import "./ItemListContainer.css";
import ItemProduct from "../ItemProduct";

function ItemListContainer(props) {
    return (
        <div className="ItemListContainer">
            <h1>{props.greeting}</h1>
            {/*
                Aquí debo recorrer el array de productos y pasarle las propiedades
                al componente, para crear dinámicamente un producto.
            */}
            <ItemProduct id={1} />
        </div>
    );
}

export default ItemListContainer;
