import React, { useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { useNavigate } from "react-router-dom";

export type HomepageModeProps = {
	setMode: React.Dispatch<React.SetStateAction<HomepageMode>>;
};

export type HomepageMode = "login" | "register";

const Homepage = () => {
	const [mode, setMode] = React.useState<HomepageMode>("login");

	const navigate = useNavigate();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user") || "{}");

		if (user._id) {
			navigate("/chat");
		}
	}, [navigate]);

	return mode === "login" ? <Login setMode={setMode} /> : <Register setMode={setMode} />;
};

export default Homepage;
