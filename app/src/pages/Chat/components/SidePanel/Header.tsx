import ExpandableSearch from "../../../../components/Input/ExpandableSearch";
import ClickableIcon from "../../../../components/ClickableIcon";

const Header = () => {
	const add = () => {
		console.log("ADD");
	};

	return (
		<div className="flex items-center justify-between w-full gap-4 mt-1 mb-4">
			<span className="text-4xl font-bold text-text">Chats</span>
			<div className="flex items-center gap-4">
				<ClickableIcon icon="solar:add-square-bold-duotone" action={add} size={28} />
				<ExpandableSearch />
			</div>
		</div>
	);
};

export default Header;
