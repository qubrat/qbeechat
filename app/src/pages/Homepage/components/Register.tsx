import { useState, FormEvent } from "react";
import Input from "../../../components/Input";
import PasswordInput from "../../../components/PasswordInput";
import Button from "../../../components/Button";
import customToast from "../../../components/customToast";
import HomepageForm from "./HomepageForm";
import { HomepageMode } from "../Homepage";
import useInput from "../../../hooks/useInput";

import register from "../../../assets/register.jpg";

import { motion, AnimatePresence } from "framer-motion";
import { slideVariants } from "../../../animation/slideVariants";

import axios from "axios";
import { BASE_URL } from "../../../config/settings";
import { useNavigate } from "react-router-dom";

type RegisterProps = {
	setMode: React.Dispatch<React.SetStateAction<HomepageMode>>;
};

const Register = ({ setMode }: RegisterProps) => {
	const name = useInput("");
	const email = useInput("");
	const password = useInput("");
	const confirmPassword = useInput("");
	const [loading, setLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		if (!email.value?.trim() || !password.value?.trim() || !confirmPassword.value?.trim() || !name.value?.trim()) {
			customToast({ message: "Please provide all the details", type: "warning" });
			setLoading(false);
			return;
		}
		if (!email.value?.includes("@") && email.value?.trim()) {
			customToast({ message: "Please provide a valid email", type: "warning" });
			setLoading(false);
			return;
		}
		if (password.value?.trim() !== confirmPassword.value?.trim()) {
			customToast({ message: "Passwords do not match", type: "error" });
			setLoading(false);
			return;
		}
		try {
			const payload = {
				name: name.value,
				email: email.value,
				password: password.value,
			};
			const { data } = await axios.post(`${BASE_URL}/user`, payload);
			localStorage.setItem("user", JSON.stringify(data));
			customToast({ message: "Registered successfully", type: "success" });
			setLoading(false);
			navigate("/chat");
		} catch (error: any) {
			console.error(error);
			if (error.response.data.code === "USER_EXISTS") {
				customToast({ message: "User with provided email already exists", type: "error" });
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
				key="register"
			>
				<HomepageForm
					textTop="Start for free"
					header="Create new account"
					setMode={setMode}
					subtitleText="Already have an account?"
					subtitleLink="Log in"
					buttonText="Register"
					modeLink="login"
				>
					<form onSubmit={handleSubmit} className="flex flex-col max-w-md gap-6 w-[448px]">
						<Input icon="solar:user-hand-up-bold" type="text" label="Enter your name" name="name" placeholder="Name" {...name} />
						<Input icon="solar:letter-bold" type="text" label="Email" name="email" placeholder="Enter your email" {...email} />
						<div className="flex gap-4">
							<PasswordInput label="Password" name="password" placeholder="Enter password" {...password} />
							<PasswordInput label="Confirm password" name="confirmPassword" placeholder="Confirm password" {...confirmPassword} />
						</div>
						<Button type="submit" text="Register" loading={loading} />
					</form>
				</HomepageForm>
				<img src={register} alt="" className="max-w-lg rounded-r-3xl" />
			</motion.div>
		</AnimatePresence>
	);
};

export default Register;
