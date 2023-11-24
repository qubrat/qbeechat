type AvatarProps = {
	image?: string;
};

const Avatar = ({ image }: AvatarProps) => {
	return image ? (
		<img className="w-12 h-12 rounded-full ring-2 ring-offset-2 ring-primary" src={image} alt="avatar" />
	) : (
		<div className="w-12 h-12 rounded-full bg-slate-100 ring-2 ring-offset-2 ring-slate-200"></div>
	);
};

export default Avatar;
