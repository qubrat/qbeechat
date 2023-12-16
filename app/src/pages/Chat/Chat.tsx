import { useChatContext } from "../../context/chatContext";
import SidePanel from "./components/SidePanel";
import Sidebar from "./components/Sidebar";

const Chat = () => {
	const { user } = useChatContext();
	return (
		<div>
			<Sidebar />
			<SidePanel />
		</div>
	);
};

export default Chat;
