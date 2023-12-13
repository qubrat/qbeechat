import Spinner from "../Spinner";

type ItemListProps = {
	loading?: boolean;
	children?: React.ReactNode;
};

const ItemList = ({ children, loading }: ItemListProps) => {
	return <div className="flex flex-col gap-2 rounded-2xl">{loading ? <Spinner size="large" color="grey" /> : children}</div>;
};

export default ItemList;
