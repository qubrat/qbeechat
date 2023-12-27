import { Skeleton } from "./Parts";

const ChatSkeleton = () => {
	return (
		<Skeleton>
			<Skeleton.Avatar />
			<div className="flex flex-col w-full gap-4">
				<Skeleton.Text />
				<Skeleton.Small />
			</div>
		</Skeleton>
	);
};

export default ChatSkeleton;
