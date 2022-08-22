import ItemListContainer from "../components/List/ItemListContainer";

export default function PremierLeague(props) {
    return (
        <div>
            <h1>{props.greeting}</h1>
            <ItemListContainer
                category={"Premier League"}
                greeting={"Premier League"}
            />
        </div>
    );
}
