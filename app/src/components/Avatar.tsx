type AvatarProps = {
	image?: string;
	size?: "sm" | "md" | "lg";
};

const Avatar = ({ image, size = "md" }: AvatarProps) => {
	const sizeClass = size === "sm" ? "w-8 h-8" : size === "md" ? "w-12 h-12" : "w-24 h-24";

	return image ? (
		<img className={`${sizeClass} rounded-full ring-2 ring-offset-2 ring-primary`} src={image} alt="avatar" />
	) : (
		<div className={`${sizeClass} rounded-full bg-slate-100 ring-2 ring-offset-2 ring-slate-200`}></div>
	);
};

export default Avatar;
