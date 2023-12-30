import { Icon } from "@iconify/react";

type DropdownItemProps = {
	text: string;
	onClick: () => void;
	icon?: string;
};

export const DropdownItem = ({ icon, text, onClick }: DropdownItemProps) => {
	return (
		<li
			className="flex items-center w-full p-2 transition-all duration-200 cursor-pointer hover:bg-slate-50 hover:text-primary"
			onClick={onClick}
		>
			{icon && <Icon className="mr-2 text-current" icon={icon} width="20" height="20"></Icon>}
			<span>{text}</span>
		</li>
	);
};
