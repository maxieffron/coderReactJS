import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import "./ProductDetail.css";
import ItemCount from "../../ItemCount";
import { CartContext } from "../../../context/CartContext";

function ProductDetail(props) {
    const [cantProducts, setCantProducts] = useState(1);

    const { addToCart } = useContext(CartContext);

    const navigateFn = useNavigate();

    function comeBackProducts() {
        //Se llama a la navegación que nos llevará a ver los productos
        navigateFn(`/Products`);
    }

    function addCartProducts() {
        /*** Acá se van a ir agregando los productos ***/
        const prodAdded = { ...props, cantidad: cantProducts };
        console.log("PRODUCTO: ", prodAdded);
        addToCart(prodAdded);

        /** Preguntar si se finaliza la compra o si continúa  **/
        qstContinueBuy();
    }

    function qstContinueBuy() {
        swal.fire({
            title: `Producto "${props.nombre}"  añadido`,
            text: "¿Seguimos comprando o cerramos acá?",

            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#4c98df",
            cancelButtonColor: "#5bb669",
            confirmButtonText: "Seguimos comprando",
            cancelButtonText: "Finalizar la compra",
        }).then((result) => {
            if (!result.isConfirmed) {
                swal.fire(
                    {
                        icon: "info",
                        title: "Finalizando la compra...",
                        showConfirmButton: false,
                        timer: 2000,
                    },
                    setTimeout(() => {
                        /*Se llama a la navegación que nos llevará a ver todos los
                        productos comprados*/
                        navigateFn(`/Cart`);
                    }, 2000)
                );
            }
        });
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
                <div className="Detail-Fields">
                    <div className="Detail-info">
                        <h4>Nombre:</h4>
                        <p>{props.nombre}</p>
                    </div>

                    <div className="Detail-info">
                        <h4>Categoría:</h4>
                        <p>{props.categoria}</p>
                    </div>

                    <div className="Detail-info">
                        <h4>Equipo:</h4>
                        <p>{props.equipo}</p>
                    </div>

                    <div className="Detail-info">
                        <h4>Stock:</h4>
                        <p>{props.stock}</p>
                    </div>

                    <div className="Detail-info">
                        <h4>Precio:</h4>
                        <p>{` $${props.precio}`}</p>
                    </div>

                    <div className="Detail-info">
                        <h4>Descripción:</h4>
                        <p>{` ${props.descripcion}`}</p>
                    </div>
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
                        id={`id-Count-${props.id}`}
                        onClick={addCartProducts}
                    >
                        Agregar al carrito
                    </button>
                </div>

                <div className="itemCountDetailContainer">
                    <ItemCount
                        onUpdateCount={setCantProducts}
                        cantInitial={1}
                    />
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
