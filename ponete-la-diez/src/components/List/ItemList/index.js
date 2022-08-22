/*** 
Componente que contiene la lista de productos. El mismo se compone de:
- Componente Item
- Componente ItemCount
 ***/

import { useState, useEffect } from "react";
import "./ItemList.css";
/*import "../../index.css";*/
//import ItemCount from "../../ItemCount";
import Item from "../Item";

export default function ItemList(props) {
    const [optCategory, setOptCategory] = useState();

    /*
    const changeCategory = () => {
        //setOptCategory("Todas");
        const category = document.getElementById("idCategory");

        //debugger;
        //const catSelected = category.options[category.selectedIndex].value;
        //setOptCategory(catSelected);
        //alert(catSelected);
        
    };
    */

    useEffect(() => {
        setOptCategory(optCategory);
    }, [optCategory]);

    return (
        <div className="ItemList-Container">
            {
                /*
            <div className="ItemList-Cat-Container">
                <h3>Categorías</h3>
                <select id="idCategory" onChange={changeCategory()}>
                    <option value="Todas" selected>
                        Todas
                    </option>
                    <option value="Primera División">Primera División</option>
                    <option value="Ascenso">Ascenso</option>
                    <option value="Premier League">Premier League</option>
                </select>
            </div>
            *}
            {
                /*Se recorren todos los productos que se obtuvieron de leer el JSON, y
            que se encuentran en el array product.
            */

                props.product.map((data) => {
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
