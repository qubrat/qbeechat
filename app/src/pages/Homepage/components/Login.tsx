import { useState, FormEvent } from "react";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button";
import customToast from "../../../components/customToast";
import HomepageForm from "./HomepageForm";
import { HomepageMode } from "../Homepage";
import useInput from "../../../hooks/useInput";

import RegexService from "../../../services/regexService";

import { motion, AnimatePresence } from "framer-motion";
import { slideVariants } from "../../../animation/slideVariants";

import axios from "axios";
import { BASE_URL } from "../../../config/settings";
import { useNavigate } from "react-router-dom";

type LoginProps = {
	setMode: React.Dispatch<React.SetStateAction<HomepageMode>>;
};

const Login = ({ setMode }: LoginProps) => {
	const email = useInput("", true);
	const password = useInput("", true);
	const [loading, setLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		const emailValid = email.validate();
		const passwordValid = password.validate();

		if (!emailValid || !passwordValid) {
			setLoading(false);
			return;
		}

		if (!RegexService.isEmail(email.value)) {
			email.setError("Please provide a valid email");
			customToast({ message: "Please provide a valid email", variant: "warning" });
			setLoading(false);
			return;
		}

		try {
			const payload = {
				email: email.value,
				password: password.value,
			};
			const { data } = await axios.post(`${BASE_URL}/auth`, payload);
			localStorage.setItem("user", JSON.stringify(data));
			customToast({ message: "Logged in successfully", variant: "success" });
			setLoading(false);
			navigate("/chat");
		} catch (error: any) {
			console.error(error);
			if (error.response.data.code === "INVALID_CREDENTIALS") {
				customToast({ message: "Wrong email or password", variant: "error" });
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<AnimatePresence>
			<motion.div variants={slideVariants} initial="hidden" animate="visible" exit="exit" key="login">
				<HomepageForm
					textTop="log in to start chatting"
					header="Welcome back"
					setMode={setMode}
					subtitleText="Don't have an account?"
					subtitleLink="Create it"
					buttonText="Log in"
					modeLink="register"
					action={handleSubmit}
				>
					<Input
						type="text"
						icon="solar:letter-bold-duotone"
						label="Email"
						name="email"
						placeholder="Enter your email"
						value={email.value}
						onChange={email.onChange}
						error={email.error}
						required
					/>
					<Input
						type="password"
						label="Password"
						name="password"
						placeholder="Enter your password"
						value={password.value}
						onChange={password.onChange}
						error={password.error}
						required
					/>
					<Button type="submit" size="medium" text="Log in" loading={loading} width="1/2" />
				</HomepageForm>
			</motion.div>
		</AnimatePresence>
	);
};

export default Login;
