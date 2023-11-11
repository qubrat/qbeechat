import { useState, FormEvent } from "react";
import Input from "../../../components/Input";
import PasswordInput from "../../../components/PasswordInput";
import Button from "../../../components/Button";
import useInput from "../../../hooks/useInput";
import HomepageForm from "./HomepageForm";
import { HomepageMode } from "../Homepage";

import register from "../../../assets/register.jpg";

import { motion, AnimatePresence } from "framer-motion";
import { slideVariants } from "../../../animation/slideVariants";

type RegisterProps = {
	setMode: React.Dispatch<React.SetStateAction<HomepageMode>>;
};

const Register = ({ setMode }: RegisterProps) => {
	const name = useInput("");
	const email = useInput("");
	const password = useInput("");
	const confirmPassword = useInput("");
	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		validateInput(name);
		validateInput(email);
		validateInput(password);
		validateInput(confirmPassword);
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
