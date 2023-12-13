import { Logotype } from "../../../components/Logo";
import Profile from "./Sidebar/Profile";

const Sidebar = () => {
	return (
		<nav className="fixed top-0 left-0 flex flex-col justify-between h-screen p-8 bg-slate-100">
			<Logotype />
			<Profile />
		</nav>
	);
};

export default Sidebar;
