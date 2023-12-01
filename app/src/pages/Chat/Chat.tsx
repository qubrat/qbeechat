import { useChatContext } from "../../context/chatContext";
import Navbar from "./components/Navbar";

const Chat = () => {
	const { user } = useChatContext();
	return (
		<div>
			<Navbar />
		</div>
	);
};

export default Chat;
