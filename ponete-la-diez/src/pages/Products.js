import ItemListContainer from "../components/List/ItemListContainer";

export default function Products(props) {
    return (
        <div>
            <h1>{props.greeting}</h1>
            <ItemListContainer greeting={"Productos"} />
        </div>
    );
}
