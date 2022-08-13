import { useNavigate } from "react-router-dom";
import "./ProductDetail.css";
import ItemCount from "../ItemCount";

function ProductDetail(props) {
    const navigateFn = useNavigate();
    function comeBackProducts() {
        //Se llama a la navegación que nos llevará a ver los productos
        navigateFn(`/Products`);
    }

    function addCartProducts() {
        /*Acá se van a ir agregando los productos */
    }

    function otherViewOver() {
        //Pasaje de la vista Anverso a Reverso
        const img = document.getElementById("img-detail");

        img.getAttribute("src") === props.imagenAnverso
            ? img.setAttribute("src", props.imagenReverso)
            : img.setAttribute("src", props.imagenAnverso);
    }

    function otherViewOut() {
        //Pasaje de la vista Reverso a Anverso
        const img = document.getElementById("img-detail");

        img.getAttribute("src") === props.imagenReverso
            ? img.setAttribute("src", props.imagenAnverso)
            : img.setAttribute("src", props.imagenReverso);
    }

    return (
        <div className="ProductDetail">
            <div className="Detail-info-Container">
                <div className="Detail-info">
                    <h3>Nombre:</h3>
                    <h4>{props.nombre}</h4>
                </div>

                <div className="Detail-info">
                    <h3>Categoría:</h3>
                    <h4>{props.categoria}</h4>
                </div>

                <div className="Detail-info">
                    <h3>Equipo:</h3>
                    <h4>{props.equipo}</h4>
                </div>

                <div className="Detail-info">
                    <h3>Stock:</h3>
                    <h4>{props.stock}</h4>
                </div>

                <div className="Detail-info">
                    <h3>Precio:</h3>
                    <h4>{` $${props.precio}`}</h4>
                </div>

                <div className="buttons-detail">
                    <button
                        className="button-ComeBack"
                        onClick={comeBackProducts}
                    >
                        Volver
                    </button>

                    <button
                        className="button-AddCart"
                        onClick={addCartProducts}
                    >
                        Agregar al carrito
                    </button>
                </div>

                <div className="itemCountDetailContainer">
                    <ItemCount cantInitial={1} />
                </div>
            </div>
            <div className="Detail-photo-Container">
                <img
                    id="img-detail"
                    onMouseOver={otherViewOver}
                    onMouseOut={otherViewOut}
                    className="Detail-img"
                    src={props.imagenAnverso}
                    alt={props.nombre}
                ></img>
            </div>
        </div>
    );
}

export default ProductDetail;
