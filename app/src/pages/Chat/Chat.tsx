import React from "react";
import { useChatContext } from "../../context/chatContext";

const Chat = () => {
	const { user } = useChatContext();
	return <div>Chat</div>;
};

export default Chat;
