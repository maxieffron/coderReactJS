/*** 
Componente que contiene la lista de productos. El mismo se compone de:
- Componente Item
- Componente ItemCount
 ***/

//import { useState, useEffect } from "react";
import "./ItemList.css";
import { useEffect, useState } from "react";
/*import "../../index.css";*/
//import ItemCount from "../../ItemCount";
import Item from "../Item";

export default function ItemList(props) {
    const [Prodcategory, setProdCategory] = useState(props.product);

    useEffect(() => {
        debugger;

        if (props.category === "") {
            setProdCategory(props.product);
        } else {
            setProdCategory(
                //props.product.filter((prod) => prod.categoria === "Premier League")
                props.product.filter(
                    (prod) => prod.categoria === props.category
                )
            );
        }

        //console.log(category);
    }, [props.product]);

    return (
        <div className="ItemList-Container">
            {
                /*Se recorren todos los productos que se obtuvieron de leer el JSON, y
                que se encuentran en el array product.
                */

                //props.product.map((data) => {
                Prodcategory.map((data) => {
                    return (
                        <div className="dataProduct-container">
                            <Item key={data.idProducto} dataProduct={data} />
                        </div>
                    );
                })
            }
        </div>
    );
}
