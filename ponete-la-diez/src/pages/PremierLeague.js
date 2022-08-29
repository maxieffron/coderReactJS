import ItemListContainer from "../components/List/ItemListContainer";

export default function PremierLeague(props) {
    return (
        <div>
            <h1>{props.greeting}</h1>
            <ItemListContainer
                showPopUp={false}
                category={"Premier League"}
                greeting={"Premier League"}
            />
        </div>
    );
}
