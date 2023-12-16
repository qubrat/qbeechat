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

type RegisterProps = {
	setMode: React.Dispatch<React.SetStateAction<HomepageMode>>;
};

const Register = ({ setMode }: RegisterProps) => {
	const name = useInput("", true);
	const email = useInput("", true);
	const password = useInput("", true);
	const confirmPassword = useInput("", true);

	const [loading, setLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		const nameValid = name.validate();
		const emailValid = email.validate();
		const passwordValid = password.validate();
		const confirmPasswordValid = confirmPassword.validate();

		if (!nameValid || !emailValid || !passwordValid || !confirmPasswordValid) {
			setLoading(false);
			return;
		}

		if (!RegexService.isEmail(email.value)) {
			email.setError("Please provide a valid email");
			customToast({ message: "Please provide a valid email", variant: "warning" });
			setLoading(false);
			return;
		}

		if (password.value !== confirmPassword.value) {
			confirmPassword.setError("Passwords do not match");
			customToast({ message: "Passwords do not match", variant: "warning" });
			setLoading(false);
			return;
		}

		try {
			const payload = {
				name: name.value,
				email: email.value,
				password: password.value,
			};
			const { data } = await axios.post(`${BASE_URL}/auth/register`, payload);
			localStorage.setItem("user", JSON.stringify(data));
			customToast({ message: "Registered successfully", variant: "success" });
			setLoading(false);
			navigate("/chat");
		} catch (error: any) {
			console.error(error);
			if (error.response.data.code === "USER_EXISTS") {
				customToast({ message: "User with provided email already exists", variant: "error" });
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<AnimatePresence>
			<motion.div variants={slideVariants} initial="hidden" animate="visible" exit="exit" key="register">
				<HomepageForm
					textTop="Start for free"
					header="Create new account"
					setMode={setMode}
					subtitleText="Already have an account?"
					subtitleLink="Log in"
					buttonText="Register"
					modeLink="login"
					action={handleSubmit}
				>
					<Input
						type="text"
						icon="solar:user-hand-up-bold-duotone"
						label="Name"
						name="name"
						placeholder="Enter your name"
						value={name.value}
						onChange={name.onChange}
						error={name.error}
						required
					/>
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
						className="flex-1"
						type="password"
						label="Password"
						name="password"
						placeholder="Enter password"
						value={password.value}
						onChange={password.onChange}
						error={password.error}
						required
					/>
					<Input
						className="flex-1"
						type="password"
						label="Confirm password"
						name="confirmPassword"
						placeholder="Confirm password"
						value={confirmPassword.value}
						onChange={confirmPassword.onChange}
						error={confirmPassword.error}
						required
					/>
					<Button type="submit" size="medium" text="Register" loading={loading} width="1/2" />
				</HomepageForm>
			</motion.div>
		</AnimatePresence>
	);
};

export default Register;
