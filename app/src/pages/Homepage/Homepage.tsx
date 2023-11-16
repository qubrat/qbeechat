import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";

export type HomepageModeProps = {
	setMode: React.Dispatch<React.SetStateAction<HomepageMode>>;
};

export type HomepageMode = "login" | "register";

const Homepage = () => {
	const [mode, setMode] = React.useState<HomepageMode>("login");

	return (
		<>
			{mode === "login" ? <Login setMode={setMode} /> : <Register setMode={setMode} />}
			<Toaster position="bottom-center" />
		</>
	);
};

export default Homepage;
