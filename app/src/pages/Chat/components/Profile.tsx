import React, { useState } from "react";
import { useChatContext } from "../../../context/chatContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

const Dropdown = () => {
	const { setUser } = useChatContext();
	const onLogout = () => {
		setUser(null);
		localStorage.removeItem("user");
		window.location.reload();
	};

	return (
		<motion.ul
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className="absolute right-0 py-4 bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl w-36 top-16 z-0"
		>
			<li className="flex items-center w-full p-2 transition-all duration-200 hover:bg-slate-50" onClick={onLogout}>
				<Icon className="mr-2 text-slate-900" icon="solar:login-2-outline" width="20" height="20"></Icon>Log out
			</li>
		</motion.ul>
	);
};

const Profile = () => {
	const { user } = useChatContext();

	const toggleDropdown = () => {
		setDropdownVisible((visible) => !visible);
	};

	const [dropdownVisible, setDropdownVisible] = useState(false);
	return (
		<div className="relative z-10 cursor-pointer" onClick={() => toggleDropdown()}>
			<img src={user?.profilePicture} alt="" className="w-12 h-12 rounded-full" />
			{dropdownVisible && <Dropdown />}
		</div>
	);
};

export default Profile;
