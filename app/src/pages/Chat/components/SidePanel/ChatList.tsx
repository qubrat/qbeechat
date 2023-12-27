import React from "react";
import { twMerge } from "tailwind-merge";

type ChatListProps = {
	children: React.ReactNode;
	className?: string;
};

const ChatList = ({ children, className }: ChatListProps) => {
	return <div className={twMerge("overflow-y-scroll flex flex-col gap-4 w-full no-scrollbar", className)}>{children}</div>;
};

export default ChatList;
