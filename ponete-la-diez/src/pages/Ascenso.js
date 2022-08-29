import ItemListContainer from "../components/List/ItemListContainer";

export default function Ascenso(props) {
    return (
        <div>
            <h1>{props.greeting}</h1>
            <ItemListContainer
                showPopUp={false}
                category={"Ascenso"}
                greeting={"Ascenso"}
            />
        </div>
    );
}
