import React, { useState } from "react";
import { useChatContext } from "../../../context/chatContext";

const Dropdown = () => {
	const { setUser } = useChatContext();
	const onLogout = () => {
		setUser(null);
		localStorage.removeItem("user");
		window.location.reload();
	};

	return (
		<div className="absolute right-0 w-36 top-16">
			<button type="button" className="w-full py-2 transition-all duration-200 bg-slate-100 hover:bg-slate-50 rounded-2xl" onClick={onLogout}>
				Log out
			</button>
		</div>
	);
};

const Profile = () => {
	const { user } = useChatContext();

	const [dropdownVisible, setDropdownVisible] = useState(false);
	return (
		<div className="relative cursor-pointer" onClick={() => setDropdownVisible(true)}>
			<img src={user?.profilePicture} alt="" className="w-12 h-12 rounded-full" />
			{dropdownVisible && <Dropdown />}
		</div>
	);
};

export default Profile;
