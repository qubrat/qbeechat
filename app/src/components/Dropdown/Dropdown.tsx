import { createContext, useState, useContext } from "react";
import { DropdownButton } from "./Button";
import { DropdownItemList } from "./ItemList";
import useOutsideClick from "../../hooks/useOutsideClick";

interface IDropdownContext {
	visible: boolean;
	toggleDropdown: () => void;
}

const DropdownContext = createContext<IDropdownContext | null>(null);

type DropdownProps = {
	children: React.ReactNode;
};

const Dropdown = ({ children }: DropdownProps) => {
	const [visible, setVisible] = useState(false);

	const handleClickOutside = () => {
		setVisible(false);
	};

	const ref = useOutsideClick<HTMLDivElement>(handleClickOutside);

	const toggleDropdown = () => {
		setVisible((visible) => !visible);
	};

	return (
		<DropdownContext.Provider value={{ visible, toggleDropdown }}>
			<div ref={ref} className="relative">
				{children}
			</div>
		</DropdownContext.Provider>
	);
};

export const useDropdown = () => {
	const context = useContext(DropdownContext);
	if (!context) {
		throw new Error("useDropdown must be used within a Dropdown");
	}
	return context;
};

Dropdown.Button = DropdownButton;
Dropdown.ItemList = DropdownItemList;

export { Dropdown };
