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

            const newCart = cart.map((productExist) => {
                if (product.id === productExist.id) {
                    //Encontramos el producto --> Actualizamos la cantidad
                    return {
                        ...productExist,
                        cantidad: productExist.cantidad + product.cantidad,
                    };
                } else {
                    //Si no es el producto encontrado, lo mapeamos en este nuevo array.
                    return productExist;
                }
            });

            //Ahora sí, agregamos el carrito con todo actualizado
            setCart(newCart);
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
        //Aquí me quedo con todos los productos, excepto con el
        //producto que le pasé el id.
        setCart(cart.filter((product) => product.id !== id));
    };

    /*** Vaciamos el carrito  ***/
    const removeAll = () => {
        setCart([]);
    };

    /*** Cantidad de productos ***/
    const totalProduct = () => {
        return cart.length;
    };

    /*** Importe total ***/
    const totalPrice = () => {
        let price = 0;

        for (const item of cart) {
            price = price + item.cantidad * item.precio;
        }

        return price;
    };

    return (
        /*Al poner "cart", "addToCart" en el value, estoy haciendo accesible ese objeto para el componente que utilice este contexto.
         */
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                isInCart,
                removeFromCart,
                removeAll,
                totalProduct,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

/*Exportamos el CartCustomContext, para envolver a aquellos componentes con los que quiero compartir la data de este contexto.
Para envolverlos, debemos hacer un 'import' de esto.
*/
export default CartCustomContext;
