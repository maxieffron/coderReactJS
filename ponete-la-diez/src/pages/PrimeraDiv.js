import ItemListContainer from "../components/List/ItemListContainer";

export default function PrimeraDiv(props) {
    return (
        <div>
            <h1>{props.greeting}</h1>
            <ItemListContainer
                showPopUp={false}
                category={"Primera División"}
                greeting={"Primera División"}
            />
        </div>
    );
}
