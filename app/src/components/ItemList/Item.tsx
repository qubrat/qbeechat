import Avatar from "../Avatar";

type ItemProps = {
	image: string;
	title: string;
	subtitle?: string;
	onClick?: () => void;
};

const Item = ({ image, title, subtitle, onClick }: ItemProps) => {
	return (
		<div className="flex px-8 py-4 transition bg-white cursor-pointer rounded-2xl hover:bg-slate-100" onClick={onClick}>
			<Avatar image={image} />
			<div className="flex flex-col items-start justify-center ml-4">
				<span className="text-slate-900">{title}</span>
				<span className="text-slate-400">{subtitle}</span>
			</div>
		</div>
	);
};

export default Item;
