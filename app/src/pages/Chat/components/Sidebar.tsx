import { twMerge } from "tailwind-merge";
import { Logotype } from "../../../components/Logo";
import Profile from "./Sidebar/Profile";

type SidebarProps = {
	className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
	return (
		<nav className={twMerge("flex flex-col justify-between flex-none h-screen p-8 grow-0", className)}>
			<Logotype />
			<Profile />
		</nav>
	);
};

export default Sidebar;
