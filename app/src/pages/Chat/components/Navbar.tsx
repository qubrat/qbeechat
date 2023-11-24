import React from "react";
import Logo from "../../../components/Logo";
import Profile from "./Profile";
import Search from "./Search";

const Colors = () => {
	return (
		<div className="absolute w-full h-[6px] top-0 left-0 translate-x-1/2 flex">
			<div className="w-8 h-full rounded-l-full bg-primary"></div>
			<div className="w-8 h-full bg-darkText"></div>
			<div className="w-8 h-full bg-primary"></div>
			<div className="w-8 h-full bg-darkText"></div>
			<div className="w-8 h-full rounded-r-full bg-primary"></div>
		</div>
	);
};

const Navbar = () => {
	return (
		<div className="fixed top-0 right-0 z-10 flex items-center justify-between w-full px-4 py-6 lg:p-8">
			<Logo />
			<Search />
			<Profile />
			{/* <Colors /> */}
		</div>
	);
};

export default Navbar;
