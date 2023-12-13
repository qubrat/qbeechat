import Header from "./SidePanel/Header";

export type Chat = {
	chatName: string;
	isGroupChat: boolean;
	users: string[];
	lastMessage?: string;
	groupAdmin?: string;
};

const SidePanel = () => {
	return (
		<aside className="flex flex-col items-start h-screen p-4 w-96">
			<Header />
		</aside>
	);
};

export default SidePanel;
