/*** 
Componente que funciona como "contenedor principal" para todo lo que va a estar dentro
de una página del sitio.
 ***/
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
/*import "../../index.css";*/
import "./ItemListContainer.css";
import ItemList from "../ItemList";
//import Products from "../../../config/products_Definition.json";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//Estas importaciones nos van a permitir conectarnos a la BD y cargar todos los documentos
//de una tabla.
import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy,
} from "firebase/firestore";
//Importamos el archivo ConfigFirebase.js, que contiene toda la configuración de la BD.
import firebaseConfig from "../../../config/ConfigFirebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//-----------------------------------------------------------------------------------------
function ItemListContainer(props) {
    const [prod, setProduct] = useState([]);
    //const [loadingProd, setLoadingProd] = useState(true);

    useEffect(() => {
        // 1) Initializamos Firebase creando una instancia de la app, a partir de la configuración
        // que nos da Firebase y que la pusimos en el archivo ConfigFirebase.js
        const app = initializeApp(firebaseConfig);
        // 2) Vamos a conectar la con la Base de Datos
        const db = getFirestore(app);
        // 3) Nos traernos TODOS los documentos de la colección "products" (O sea, de la tabla).
        //Esto sería como una Query.
        const colRef = query(
            collection(db, "products"),
            orderBy("idMostrar", "asc")
        );

        /* 
        4) Acá es donde vamos a hacer la llamada, que a su vez nos va a devolver una promesa
        con un array de productos.*/
        getDocs(colRef).then(
            (snapshot) => {
                /*Esos productos del array, vienen a través de Firestore docs.
                El formato de Firestore docs es "raw format".
                Entonces, vamos a hacer un mapeo y obtener los datos de la colección en nuestro formato.*/
                const getProductos = snapshot.docs.map((rawDoc) => {
                    return {
                        //Este es el id random que genera Firebase
                        id: rawDoc.id,
                        ...rawDoc.data(), //El resto de los datos
                    };
                });

                if (props.showPopUp) {
                    Swal.fire(
                        {
                            title: "Bienvenido/a!!",
                            text: "Ingresando al shopping...",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000,
                        },
                        setTimeout(() => {
                            setProduct(getProductos);
                        }, 2000)
                    );
                } else {
                    setProduct(getProductos);
                }
            },
            (error) => {
                console.log(`Error ${error} al obtener los datos de Firebase.`);
            }
        );
    }, []);

    return (
        <div className="ItemListContainer">
            <h1>{props.greeting}</h1>

            {/*Pasamos el array de productos que traje del JSON*/}
            <ItemList category={props.category} product={prod} />
        </div>
    );
}

export default ItemListContainer;
