/*** 
Componente que funciona como contenedor del sitio en donde se van a mostrar los detalles de cada producto seleccionado.
 ***/
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../ProductDetail";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//Estas importaciones nos van a permitir conectarnos a la BD y cargar todos los documentos
//de una tabla.
//Estas importaciones nos van a permitir conectarnos a la BD y cargar todos los documentos
//de una tabla.
import { getFirestore, doc, getDoc } from "firebase/firestore";
//Importamos el archivo ConfigFirebase.js, que contiene toda la configuración de la BD.
import firebaseConfig from "../../../config/ConfigFirebase";
import "./ProductDetailContainer.css";
import Swal from "sweetalert2";

export default function ProductDetailContainer() {
    const [prod, setProd] = useState([]);

    //Este parámetro es el id del producto sobre el que quiero
    //saber los detalles
    const { idProdu } = useParams();

    /*Cada vez que venga por parámetro un id difernte, vamos a realizar una nueva petición que nos devuelva el producto que necesitamos para luego poder llamar al componente y ver su detalle
     */

    useEffect(() => {
        /* 1) Initializamos Firebase creando una instancia de la app, a partir de la 
        configuración que nos da Firebase y que la pusimos en el archivo ConfigFirebase.js*/
        const app = initializeApp(firebaseConfig);

        // 2) Vamos a conectar la app con la Base de Datos
        const db = getFirestore(app);

        // 3) Con esto nos traemos el producto cuyo ID AUTOINCREMENTAL sea igual a idProdu
        const itemRef = doc(db, "products", idProdu);

        /*4) Acá es donde vamos a hacer la llamada, que a su vez nos va a devolver una promesa con el producto que deseamos ver en detalle.*/
        getDoc(itemRef).then(
            (snapshot) => {
                /*Este producto, viene a través de Firestore docs.
                Pero al devolver un único producto, no es necesario hacer ningún mapeo.
                */
                console.log({ id: snapshot.id, ...snapshot.data() });

                if (snapshot.exists) {
                    const getProducto = () => {
                        return { id: snapshot.id, ...snapshot.data() };
                    };
                    setProd(getProducto);
                } else {
                    Swal.fire({
                        title: "El producto seleccionado no existe.",
                        icon: "error",
                        showConfirmButton: true,
                    });
                }
            },
            (error) => {
                Swal.fire({
                    title: `Error ${error} al obtener los datos de Firebase.`,
                    icon: "error",
                    showConfirmButton: true,
                });
            }
        );
    }, [idProdu]);

    return (
        <div>
            <h1>Detalle</h1>
            <div className="ProductDetailContainer">
                <ProductDetail key={prod.id} {...prod} />
            </div>
        </div>
    );
}
