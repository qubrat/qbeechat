import { motion } from "framer-motion";
import { useDropdown } from "./Dropdown";
import { DropdownItem } from "./Item";
import { menu } from "../../animation/menu";

type DropdownItemListProps = {
	children: React.ReactNode;
	position: "left-up" | "left-down" | "right-up" | "right-down" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

const DropdownItemList = ({ children, position }: DropdownItemListProps) => {
	const { visible } = useDropdown();

	const positions = {
		"left-up": "right-[130%] bottom-0",
		"left-down": "right-[130%] top-0",
		"right-up": "left-[130%] bottom-0",
		"right-down": "left-[130%] top-0",
		"top-left": "bottom-[130%] right-0",
		"top-right": "bottom-[130%] left-0",
		"bottom-left": "top-[130%] right-0",
		"bottom-right": "top-[130%] left-0",
	};

	return (
		<motion.ul
			variants={menu[position]}
			initial="hidden"
			animate={visible ? "visible" : "hidden"}
			className={`absolute ${positions[position]} py-4 bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl w-36 z-0 ${
				visible ? "" : "hidden"
			}`}
		>
			{children}
		</motion.ul>
	);
};

DropdownItemList.Item = DropdownItem;

export { DropdownItemList };
