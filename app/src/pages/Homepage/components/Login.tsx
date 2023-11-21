import { useState, FormEvent } from "react";
import Input from "../../../components/Input";
import PasswordInput from "../../../components/PasswordInput";
import Button from "../../../components/Button";
import customToast from "../../../components/customToast";
import HomepageForm from "./HomepageForm";
import { HomepageMode } from "../Homepage";
import useInput from "../../../hooks/useInput";

import login from "../../../assets/login.jpg";

import { motion, AnimatePresence } from "framer-motion";
import { slideVariants } from "../../../animation/slideVariants";

import axios from "axios";
import { BASE_URL } from "../../../config/settings";
import { useNavigate } from "react-router-dom";

type LoginProps = {
	setMode: React.Dispatch<React.SetStateAction<HomepageMode>>;
};

const Login = ({ setMode }: LoginProps) => {
	const email = useInput("");
	const password = useInput("");
	const [loading, setLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		if (!email.value?.trim() && !password.value?.trim()) {
			customToast({ message: "Please provide email and password", type: "warning" });
			setLoading(false);
			return;
		}
		if (!email.value?.includes("@") && email.value?.trim()) {
			customToast({ message: "Please provide a valid email", type: "warning" });
			setLoading(false);
			return;
		}
		try {
			const payload = {
				email: email.value,
				password: password.value,
			};
			const { data } = await axios.post(`${BASE_URL}/user/login`, payload);
			localStorage.setItem("user", JSON.stringify(data));
			customToast({ message: "Logged in successfully", type: "success" });
			setLoading(false);
			navigate("/chat");
		} catch (error: any) {
			console.error(error);
			if (error.response.data.code === "INVALID_CREDENTIALS") {
				customToast({ message: "Wrong email or password", type: "error" });
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<AnimatePresence>
			<motion.div
				className="flex items-center max-w-5xl text-left rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
				variants={slideVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
				key="login"
			>
				<HomepageForm
					textTop="log in to start chatting"
					header="Welcome back"
					setMode={setMode}
					subtitleText="Don't have an account?"
					subtitleLink="Create it"
					buttonText="Log in"
					modeLink="register"
				>
					<form onSubmit={handleSubmit} className="flex flex-col max-w-md gap-4 w-[448px]">
						<Input icon="solar:letter-bold" type="text" label="Email" name="email" placeholder="Enter your email" {...email} required />
						<PasswordInput label="Password" name="password" placeholder="Enter your password" {...password} required />
						<Button type="submit" text="Log in" loading={loading} />
					</form>
				</HomepageForm>
				<img src={login} alt="" className="max-w-lg rounded-r-3xl" />
			</motion.div>
		</AnimatePresence>
	);
};

export default Login;
