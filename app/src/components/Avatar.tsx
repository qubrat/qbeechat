type AvatarProps = {
	image?: string;
	size?: "sm" | "md" | "lg";
	status?: "online" | "offline";
};

const Avatar = ({ image, size = "md", status }: AvatarProps) => {
	const sizes = {
		sm: "w-8 h-8",
		md: "w-10 h-10",
		lg: "w-14 h-14",
	};

	const statusColors = {
		online: "bg-success-500",
		offline: "bg-error-300",
	};

	return image ? (
		<div className="relative ">
			{status !== undefined && (
				<div className={`absolute bottom-0 right-0 w-3 h-3 border-2 rounded-full border-slate-100 ${statusColors[status]}`}></div>
			)}
			<img className={`${sizes[size]} rounded-full border-2 border-slate-200`} src={image} alt="avatar" />
		</div>
	) : (
		<div className={`${sizes[size]} rounded-full bg-slate-100 ring-2 ring-offset-2 ring-slate-200`}></div>
	);
};

export default Avatar;
