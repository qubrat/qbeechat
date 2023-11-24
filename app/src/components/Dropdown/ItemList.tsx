import { motion } from "framer-motion";
import { useDropdown } from "./Dropdown";
import { DropdownItem } from "./Item";
import { menu } from "../../animation/menu";

type DropdownItemListProps = {
	children: React.ReactNode;
	position?: "left" | "right";
};

const DropdownItemList = ({ children, position }: DropdownItemListProps) => {
	const { visible } = useDropdown();

	const selectedPosition = position === "right" ? "left-0" : "right-0";

	return (
		<motion.ul
			variants={menu}
			initial="hidden"
			animate={visible ? "visible" : "hidden"}
			className={`absolute ${selectedPosition} py-4 bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl w-36 top-16 z-0 ${
				visible ? "" : "hidden"
			}`}
		>
			{children}
		</motion.ul>
	);
};

DropdownItemList.Item = DropdownItem;

export { DropdownItemList };
