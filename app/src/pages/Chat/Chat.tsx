import Messages from "./components/Messages";
import SidePanel from "./components/SidePanel";
import Sidebar from "./components/Sidebar";

const Chat = () => {
	// @todo Use flexbox to properly position the components
	return (
		<div className="flex">
			<Sidebar />
			<SidePanel className="w-[330px]" />
			<Messages className="w-[1470px]" />
		</div>
	);
};

export default Chat;
