import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ChatContextProviderProps = {
	children: ReactNode;
};

type User = {
	_id: string;
	name: string;
	email: string;
	token: string;
};

type ChatContext = {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const ChatContext = createContext<ChatContext | null>(null);

export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
	const [user, setUser] = useState<User | null>(null);

	const navigate = useNavigate();

	useEffect(() => {
		const user: User = JSON.parse(localStorage.getItem("user") || "{}");
		console.log(user._id);
		setUser(user);

		if (!user._id) {
			navigate("/");
		}
	}, [navigate]);

	return <ChatContext.Provider value={{ user, setUser }}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
	const context = useContext(ChatContext);
	if (!context) {
		throw new Error("useChatContext must be used within a ChatContextProvider");
	}
	return context;
};
