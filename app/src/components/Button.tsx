import Spinner from "./Spinner";

type SubmitButtonProps = {
	type: "submit" | "button";
	text: string;
	loading?: boolean;
	onClick?: () => void;
	variant?: "filled" | "outline" | "text";
	color?: "primary" | "success" | "warning" | "error";
	icon?: string;
	size?: "small" | "medium" | "large";
	width?: "full" | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4";
};

const Button = ({ type, onClick, text, loading, variant = "filled", color = "primary", size = "medium", width = "full" }: SubmitButtonProps) => {
	const outline = "border border-transparent hover:border-slate-400 hover:bg-slate-100 active:bg-slate-400 active:text-slate-100";

	const variants = {
		filled: {
			primary: "bg-primary-500 text-slate-100 ring-4 ring-transparent hover:ring-primary-200 active:bg-primary-700",
			success: "bg-success-500 text-slate-100 ring-4 ring-transparent hover:ring-success-200 active:bg-success-700",
			warning: "bg-warning-500 text-slate-800 ring-4 ring-transparent hover:ring-warning-200 active:bg-warning-700",
			error: "bg-error-500 text-slate-100 ring-4 ring-transparent hover:ring-error-200 active:bg-error-700",
		},
		outline: {
			primary: outline,
			success: outline,
			warning: outline,
			error: outline,
		},
		text: {
			primary: "bg-transparent text-primary-500 hover:bg-primary-100 active:bg-primary-200",
			success: "bg-transparent text-success-500 hover:bg-success-100 active:bg-success-200",
			warning: "bg-transparent text-warning-500 hover:bg-warning-100 active:bg-warning-200",
			error: "bg-transparent text-error-500 hover:bg-error-100 active:bg-error-200",
		},
	};

	const sizes = {
		small: "text-sm px-4 py-2 leading-4",
		medium: "text-base px-8 py-4 leading-5",
		large: "text-xl px-10 py-5 leading-[38px]",
	};

	const widths = {
		full: "w-full",
		"1/2": "w-1/2",
		"1/3": "w-1/3",
		"2/3": "w-2/3",
		"1/4": "w-1/4",
		"2/4": "w-2/4",
		"3/4": "w-3/4",
	};

	return (
		<button
			type={type}
			className={`${sizes[size]} ${variants[variant][color]} ${widths[width]} rounded-full font-bold transition disabled:cursor-default disabled:opacity-70`}
			onClick={onClick}
			disabled={loading}
		>
			{loading ? <Spinner size={size} /> : <span>{text}</span>}
		</button>
	);
};

export default Button;
