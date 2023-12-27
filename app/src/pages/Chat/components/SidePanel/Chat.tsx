import Avatar from "../../../../components/Avatar";

type ChatProps = {
	id: string;
	image: string;
	name: string;
	lastMessage?: string;
};

const truncate = (str: string, maxLength: number) => {
	return str.length <= maxLength ? str : str.substring(0, maxLength) + "...";
};

const Chat = ({ id, image, name, lastMessage }: ChatProps) => {
	const handleClick = () => {
		console.log(id);
	};
	return (
		<div className="flex w-full p-4 transition duration-200 cursor-pointer rounded-2xl hover:bg-slate-50 group" onClick={handleClick}>
			<Avatar image={image} size="md" />
			<div className="flex flex-col ml-4">
				<p className="font-semibold transition duration-200 group-hover:text-primary">{name}</p>
				{lastMessage !== undefined && <p className="text-sm text-gray-500">{truncate(lastMessage, 50)}</p>}
			</div>
		</div>
	);
};

export default Chat;
