import { twMerge } from "tailwind-merge";
import Header from "./SidePanel/Header";
import { useChatAPI } from "../../../apis/chatAPI";
import { useQuery } from "@tanstack/react-query";
import Chat from "./SidePanel/Chat";
import ChatSkeleton from "../../../components/Skeletons/ChatSkeleton";
import ChatList from "./SidePanel/ChatList";

export type Chat = {
	chatName: string;
	isGroupChat: boolean;
	users: string[];
	lastMessage?: string;
	groupAdmin?: string;
};

type SidePanelProps = {
	className?: string;
};

const SidePanel = ({ className }: SidePanelProps) => {
	const { getAllUserChats } = useChatAPI();

	const {
		data: chatsData,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryFn: () => getAllUserChats(),
		queryKey: ["allChats"],
	});

	if (error) {
		console.log(error);
	}

	const renderContent = () => {
		if (isLoading) {
			return (
				<ChatList>
					{[...Array(15).keys()].map((item, index) => {
						return <ChatSkeleton key={index} />;
					})}
				</ChatList>
			);
		} else if (isError) {
			return <span className="w-full px-4 py-8 text-center text-slate-500">There was an error fetching data.</span>;
		} else if (chatsData?.length === 0) {
			return <span className="w-full px-4 py-8 text-center text-slate-500">Wow, such empty.</span>;
		} else {
			return (
				<ChatList>
					{chatsData?.map((chat, index) => {
						return <Chat key={index} id={chat._id} name={chat.chatName} image={chat.picture} lastMessage={chat.lastMessage} />;
					})}
				</ChatList>
			);
		}
	};

	return (
		<aside className={twMerge("flex flex-col items-start h-screen p-8 w-full relative", className)}>
			<Header />
			{renderContent()}
			<div className="absolute left-0 w-full h-32 bottom-8 bg-gradient-to-b from-transparent to-white"></div>
		</aside>
	);
};

export default SidePanel;
