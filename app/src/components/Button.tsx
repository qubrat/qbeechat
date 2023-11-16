import Spinner from "./Spinner";

type SubmitButtonProps = {
	type: "submit" | "button";
	text: string;
	loading?: boolean;
	onClick?: () => void;
	variant?: "primary" | "warning" | "success";
};

const Button = ({ type, onClick, text, loading, variant }: SubmitButtonProps) => {
	const getVariant = () => {
		switch (variant) {
			case "primary":
				return "bg-blue-600";
			case "warning":
				return "bg-amber-600 ";
			case "success":
				return "bg-green-600";
			default:
				return "bg-secondary";
		}
	};
	return (
		<button
			type={type}
			className={`w-1/2 px-4 py-4 rounded-2xl text-lg text-slate-100 font-bold ${getVariant()} hover:opacity-95 transition duration-300 hover:shadow-2xl hover:shadow-sky-700/30 ${
				loading ? "cursor-default opacity-75" : ""
			}`}
			onClick={onClick}
			disabled={loading}
		>
			{loading ? <Spinner size="small" /> : text}
		</button>
	);
};

export default Button;
