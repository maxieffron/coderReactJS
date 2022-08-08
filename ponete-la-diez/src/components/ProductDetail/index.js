import "./ProductDetail.css";

function ProductDetail(props) {
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
            </div>
            <div className="Detail-photo-Container">
                <img
                    className="Detail-img"
                    src={props.imagenAnverso}
                    alt={props.nombre}
                ></img>
            </div>
        </div>
    );
}

export default ProductDetail;
