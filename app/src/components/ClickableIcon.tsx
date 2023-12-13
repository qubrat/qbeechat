import { Icon } from "@iconify/react";

type ClickableIconProps = {
	icon: string;
	action: () => void;
	color?: string;
	size?: number;
};

const ClickableIcon = ({ icon, action, size = 28, color }: ClickableIconProps) => {
	return (
		<button type="button" onClick={action} className="transition text-slate-400 hover:text-slate-600">
			<Icon icon={icon} width={size} height={size} />
		</button>
	);
};

export default ClickableIcon;
