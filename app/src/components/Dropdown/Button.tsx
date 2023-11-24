import { useDropdown } from "./Dropdown";

type DropdownButtonProps = {
	children: React.ReactNode;
};

export const DropdownButton = ({ children }: DropdownButtonProps) => {
	const { toggleDropdown } = useDropdown();

	return (
		<button onClick={toggleDropdown} className="relative z-10 cursor-pointer">
			{children}
		</button>
	);
};
