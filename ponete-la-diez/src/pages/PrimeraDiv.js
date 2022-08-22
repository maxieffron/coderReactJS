import ItemListContainer from "../components/List/ItemListContainer";

export default function PrimeraDiv(props) {
    return (
        <div>
            <h1>{props.greeting}</h1>
            <ItemListContainer
                category={"Primera División"}
                greeting={"Primera División"}
            />
        </div>
    );
}
