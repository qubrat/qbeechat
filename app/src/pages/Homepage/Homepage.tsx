import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";

export type HomepageModeProps = {
	setMode: React.Dispatch<React.SetStateAction<HomepageMode>>;
};

export type HomepageMode = "login" | "register";

const Homepage = () => {
	const [mode, setMode] = React.useState<HomepageMode>("login");

	return mode === "login" ? <Login setMode={setMode} /> : <Register setMode={setMode} />;
};

export default Homepage;
