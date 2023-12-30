import { Icon } from "@iconify/react";
import { twMerge } from "tailwind-merge";

type ClickableIconProps = {
	icon: string;
	action: () => void;
	size?: number;
	title?: string;
	className?: string;
};

const ClickableIcon = ({ icon, action, size = 28, title, className }: ClickableIconProps) => {
	return (
		<button
			title={title}
			type="button"
			onClick={action}
			className={twMerge("transition text-slate-400 hover:text-slate-600 active:text-slate-800", className)}
		>
			<Icon icon={icon} width={size} height={size} />
		</button>
	);
};

export default ClickableIcon;
