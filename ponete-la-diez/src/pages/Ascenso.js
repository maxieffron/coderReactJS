import ItemListContainer from "../components/List/ItemListContainer";

export default function Ascenso(props) {
    return (
        <div>
            <h1>{props.greeting}</h1>
            <ItemListContainer category={"Ascenso"} greeting={"Ascenso"} />
        </div>
    );
}
