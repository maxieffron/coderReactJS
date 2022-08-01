/*** 
Componente que funciona como "contenedor principal" para todo lo que va a estar dentro
de una página del sitio.
 ***/
import "../../index.css";
import "./ItemListContainer.css";
//import { useState, useEffect } from "react";
import ItemProduct from "../ItemProduct";

/*
class Producto {
    constructor(obj) {
        this.idProducto = obj.idProducto;
        this.nombre = obj.nombre;
        this.equipo = obj.equipo;
        this.categoria = obj.categoria;
        this.pais = obj.pais;
        this.talles = obj.talles;
        this.stock = obj.stock;
        this.precio = obj.precio;
        this.descuento = obj.descuento;
        this.imagenAnverso = obj.imagenAnverso;
        this.imagenReverso = obj.imagenReverso;
    }
}
*/

function ItemListContainer(props) {
    return (
        <div className="ItemListContainer">
            <h1>{props.greeting}</h1>
            <ItemProduct itemProds={1} stock={6} id={1} />
        </div>
    );
}

export default ItemListContainer;
