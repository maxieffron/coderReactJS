import ItemListContainer from "../components/List/ItemListContainer";

export default function Products(props) {
    return (
        <div>
            <ItemListContainer
                showPopUp={true}
                category={""}
                greeting={"Productos"}
            />
        </div>
    );
}
