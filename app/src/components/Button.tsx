import { twMerge } from "tailwind-merge";
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
	width?: "full" | "1/2";
	className?: string;
};

const Button = ({
	type,
	onClick,
	text,
	loading,
	variant = "filled",
	color = "primary",
	size = "medium",
	width = "full",
	className,
}: SubmitButtonProps) => {
	const outline = "border border-transparent hover:border-slate-400 hover:bg-slate-100 active:bg-slate-400 active:text-slate-100";

	const variants = {
		filled: {
			primary: "bg-primary text-slate-100 ring-4 ring-transparent hover:ring-primary-200 active:bg-primary-500",
			success: "bg-green text-slate-100 ring-4 ring-transparent hover:ring-green-light active:bg-green-accent",
			warning: "bg-orange text-slate-800 ring-4 ring-transparent hover:ring-orange-light active:bg-orange-accent",
			error: "bg-red text-slate-100 ring-4 ring-transparent hover:ring-red-light active:bg-red-accent",
		},
		outline: {
			primary: outline,
			success: outline,
			warning: outline,
			error: outline,
		},
		text: {
			primary: "bg-transparent text-primary hover:bg-primary-100 active:bg-primary-200",
			success: "bg-transparent text-green hover:bg-green-white active:bg-green-light",
			warning: "bg-transparent text-orange hover:bg-orange-white active:bg-orange-light",
			error: "bg-transparent text-red hover:bg-red-white active:bg-red-light",
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
	};

	return (
		<button
			type={type}
			className={twMerge(
				`${sizes[size]} ${variants[variant][color]} ${widths[width]} rounded-full font-bold transition disabled:cursor-default disabled:opacity-70`,
				className
			)}
			onClick={onClick}
			disabled={loading}
		>
			{loading ? <Spinner size={size} /> : <span>{text}</span>}
		</button>
	);
};

export default Button;
