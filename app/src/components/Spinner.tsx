type SpinnerProps = {
	size: "medium" | "small" | "large";
	color?: "light" | "dark" | "grey" | "primary";
};

export default function Spinner({ size, color = "light" }: SpinnerProps) {
	const colors = {
		light: "border-white",
		dark: "border-slate-800",
		grey: "border-slate-400",
		primary: "border-primary",
	};

	const sizes = {
		small: "h-3 w-3 border-2 m-0",
		medium: "h-4 w-4 border-2 m-0",
		large: "h-8 w-8 w-12 border-[3px] m-0",
	};

	return (
		<div
			className={`inline-block ${sizes[size]} ${colors[color]} animate-spin rounded-full border-r-transparent border-l-transparent motion-reduce:animate-[spin_2s_linear_infinite]`}
			role="status"
		>
			<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
		</div>
	);
}
