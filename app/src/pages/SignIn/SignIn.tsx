import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";

export type LoginModeProps = {
	setMode: React.Dispatch<React.SetStateAction<LoginMode>>;
};

export type LoginMode = "login" | "register";

const SignIn = () => {
	const [mode, setMode] = React.useState<LoginMode>("login");

	return mode === "login" ? <Login setMode={setMode} /> : <Register setMode={setMode} />;
};

export default SignIn;
