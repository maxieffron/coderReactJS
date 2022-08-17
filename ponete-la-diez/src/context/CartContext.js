import { useState, createContext } from "react";

//Exportamos el CartContext para definir DENTRO DEL COMPONENTE QUE QUIERO UTILIZAR EL CONTEXTO.
export const CartContext = createContext();

const CartCustomContext = ({ children }) => {
    /*Hook para manejar el estado del carrito de compras.
    Lo inicializamos como un array vacío.*/
    const [cart, setCart] = useState([]);

    /*** AQUÍ VAMOS A DESARROLLAR TODOS LOS MÉTODOS PARA MANEJAR EL CARRITO DE COMPRAS ***/

    //*** Agregar al Carrito ***
    const addToCart = (product) => {
        /*Primero verificamos si el producto que queremos agregar al carrito ya existe */
        if (isInCart(product.id)) {
            //EL PRODUCTO EXISTE
            //Acá habría que hacer algo así:
            //setCart([newProduct]);
        } else {
            //EL PRODUCTO NO EXISTE
            //Entonces, agregamos el nuevo producto al array de productos, modificando el estado del carrito.
            setCart([...cart, product]);
        }

        console.log(cart);
    };

    //*** Verificar si el producto ya fue agregado al carrito ***
    const isInCart = (id) => {
        const productAdded = cart.find(
            (productAdded) => productAdded.id === id
        );

        //Si el producto existe, devuelve true. Sino, false.
        if (productAdded) return true;
        return false;
    };

    /*** Quitamos un producto del carrito  ***/
    const removeFromCart = (id) => {
        setCart(cart.filter((product) => product.id !== id));
    };

    /*** Vaciamos el carrito  ***/
    const removeAll = () => {
        setCart([]);
    };

    return (
        /*Al poner "cart", "addToCart" en el value, estoy haciendo accesible ese objeto para el componente que utilice este contexto.
         */
        <CartContext.Provider
            value={{ cart, addToCart, isInCart, removeFromCart, removeAll }}
        >
            {children}
        </CartContext.Provider>
    );
};

/*Exportamos el CartCustomContext, para envolver a aquellos componentes con los que quiero compartir la data de este contexto.
Para envolverlos, debemos hacer un 'import' de esto.
*/
export default CartCustomContext;
