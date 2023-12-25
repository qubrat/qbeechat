import Spinner from "./Spinner";

type AvatarProps = {
	image?: string;
	size?: "sm" | "md" | "lg";
	status?: "online" | "offline";
	loading?: boolean;
};

const Avatar = ({ image, size = "md", status, loading }: AvatarProps) => {
	const sizes = {
		sm: "w-8 h-8",
		md: "w-10 h-10",
		lg: "w-14 h-14",
	};

	const statusColors = {
		online: "bg-green",
		offline: "bg-red",
	};

	const renderStatus = () => {
		if (status) {
			return <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 rounded-full border-slate-100 ${statusColors[status]}`}></div>;
		} else {
			return null;
		}
	};

	return (
		<div className="relative ">
			{renderStatus()}
			{loading ? (
				<div className={`${sizes[size]} rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center`}>
					<Spinner size="medium" color="grey" />
				</div>
			) : image ? (
				<img className={`${sizes[size]} rounded-full border-2 border-slate-200`} src={image} alt="avatar" />
			) : (
				<div className={`${sizes[size]} rounded-full bg-slate-100 border-2 border-slate-200`}></div>
			)}
		</div>
	);
};

export default Avatar;
