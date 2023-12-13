import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useChatContext } from "./chatContext";
import axios from "axios";
import { BASE_URL } from "../config/settings";

type SidePanelContextProviderProps = {
	children: ReactNode;
};

type Chat = {
	chatName: string;
	isGroupChat: boolean;
	image: string;
	users: string[];
	lastMessage?: string;
	groupAdmin?: string;
};

type SidePanelContext = {
	chats: Chat[] | null;
	setChats: React.Dispatch<React.SetStateAction<Chat[] | null>>;
	loadingChats: boolean;
	setLoadingChats: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidePanelContext = createContext<SidePanelContext | null>(null);

export const SidePanelContextProvider = ({ children }: SidePanelContextProviderProps) => {
	const { user } = useChatContext();

	const [chats, setChats] = useState<Chat[] | null>(null);
	const [loadingChats, setLoadingChats] = useState<boolean>(false);

	useEffect(() => {
		const getChats = async () => {
			setLoadingChats(true);
			try {
				const res = await axios.get(`${BASE_URL}/chat`, {
					headers: {
						Authorization: `Bearer ${user?.token}`,
					},
				});
				setChats(res.data);
			} catch (err) {
				console.log(err);
			} finally {
				setLoadingChats(false);
			}
		};
		if (user?.token) {
			getChats();
		}
	}, [user]);

	return <SidePanelContext.Provider value={{ chats, setChats, loadingChats, setLoadingChats }}>{children}</SidePanelContext.Provider>;
};

export const useSidePanelContext = () => {
	const context = useContext(SidePanelContext);
	if (!context) {
		throw new Error("useSidePanelContext must be used within a SidePanelContextProvider");
	}
	return context;
};
