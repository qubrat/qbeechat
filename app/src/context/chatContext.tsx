import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ChatContextProviderProps = {
	children: ReactNode;
};

type User = {
	_id: string;
	name: string;
	email: string;
	profilePicture: string;
	token: string;
};

type Chat = {
	chatName: string;
	isGroupChat: boolean;
	users: string[];
	lastMessage?: string;
	groupAdmin?: string;
};

type ChatContext = {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	selectedChat: Chat | null;
	setSelectedChat: React.Dispatch<React.SetStateAction<Chat | null>>;
	chats: Chat[] | null;
	setChats: React.Dispatch<React.SetStateAction<Chat[] | null>>;
};

const ChatContext = createContext<ChatContext | null>(null);

export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
	const [chats, setChats] = useState<Chat[] | null>(null);

	const navigate = useNavigate();

	useEffect(() => {
		const user: User = JSON.parse(localStorage.getItem("user") || "{}");
		setUser(user);

		if (!user._id) {
			navigate("/");
		}
	}, [navigate]);

	return <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
	const context = useContext(ChatContext);
	if (!context) {
		throw new Error("useChatContext must be used within a ChatContextProvider");
	}
	return context;
};
