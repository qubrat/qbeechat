import ExpandableSearch from "../../../components/ExpandableSearch";
import ClickableIcon from "../../../components/ClickableIcon";
export type Chat = {
	chatName: string;
	isGroupChat: boolean;
	users: string[];
	lastMessage?: string;
	groupAdmin?: string;
};

const SidePanel = () => {
	const add = () => {
		console.log("ADD");
	};

	return (
		<aside className="flex flex-col p-4 w-96">
			<div className="flex items-center justify-between gap-4">
				<span className="text-4xl font-bold text-text">Chats</span>
				<div className="flex items-center gap-4">
					<ClickableIcon icon="solar:add-square-bold-duotone" action={add} size={28} />
					<ExpandableSearch />
				</div>
			</div>
		</aside>
	);
};

export default SidePanel;
