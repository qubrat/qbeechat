import { twMerge } from "tailwind-merge";

type MessagesProps = {
	className?: string;
};

const Messages = ({ className }: MessagesProps) => {
	return <div className={twMerge("bg-slate-100", className)}>Messages</div>;
};

export default Messages;
