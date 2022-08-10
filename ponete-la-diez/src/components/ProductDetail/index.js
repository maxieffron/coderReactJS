import { useNavigate } from "react-router-dom";
import "./ProductDetail.css";

function ProductDetail(props) {
    const navigateFn = useNavigate();
    function comeBackProducts() {
        //Se llama a la navegación que nos llevará a ver el detalle
        navigateFn(`/Products`);
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

                <button className="button-ComeBack" onClick={comeBackProducts}>
                    Volver
                </button>
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
