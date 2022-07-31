/*** 
Componente que funciona como "contenedor principal" para todo lo que va a estar dentro
de una página del sitio.
 ***/
import "../../index.css";
import "./ItemListContainer.css";
import ItemCount from "../ItemCount";

function ItemListContainer(props) {
    return (
        <div className="ItemListContainer">
            <h1>{props.greeting}</h1>
            <ItemCount />
        </div>
    );
}

export default ItemListContainer;
