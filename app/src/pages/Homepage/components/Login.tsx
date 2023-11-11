import { useState, FormEvent } from "react";
import Input from "../../../components/Input";
import PasswordInput from "../../../components/PasswordInput";
import Button from "../../../components/Button";
import useInput from "../../../hooks/useInput";
import HomepageForm from "./HomepageForm";
import { HomepageMode } from "../Homepage";
import login from "../../../assets/login.jpg";

import { motion, AnimatePresence } from "framer-motion";
import { slideVariants } from "../../../animation/slideVariants";

type LoginProps = {
	setMode: React.Dispatch<React.SetStateAction<HomepageMode>>;
};

const Login = ({ setMode }: LoginProps) => {
	const email = useInput("");
	const password = useInput("");
	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		validateInput(email);
		validateInput(password);
		try {
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const validateInput = (input: { value: string | null; setError: (value: boolean) => void }) => {
		if (!input.value?.trim()) {
			input.setError(true);
		} else {
			input.setError(false);
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
						<Input icon="solar:letter-bold" type="text" label="Email" name="email" placeholder="Enter your email" {...email} />
						<PasswordInput label="Password" name="password" placeholder="Enter your password" {...password} />
						<Button type="submit" text="Log in" loading={loading} />
					</form>
				</HomepageForm>
				<img src={login} alt="" className="max-w-lg rounded-r-3xl" />
			</motion.div>
		</AnimatePresence>
	);
};

export default Login;
